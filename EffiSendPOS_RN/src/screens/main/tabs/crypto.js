import {Connection, LAMPORTS_PER_SOL, PublicKey} from '@solana/web3.js';
import {AccountLayout} from '@solana/spl-token';
import React, {Component} from 'react';
import {
  Dimensions,
  Linking,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import reactAutobind from 'react-autobind';
import ContextModule from '../../../utils/contextModule';
import {splTokens} from '../../../const/constValues';

function espilonRound(num) {
  return Math.round((parseFloat(num) + Number.EPSILON) * 10000) / 10000;
}

function high2low(a, b) {
  if (a.blockTime > b.blockTime) {
    return 1;
  }
  if (a.blockTime < b.blockTime) {
    return -1;
  }
  // a must be equal to b
  return 0;
}

class Crypto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: null,
      syncFlag: true,
    };
    reactAutobind(this);
    this.syncTimer = null;
    this.mounted = true;
    this.connection = new Connection(
      'https://attentive-lingering-putty.solana-mainnet.discover.quiknode.pro/b1d2663c7bd9a4e5de5ce2deae05003d08cce50f/',
      'confirmed',
    );
  }
  static contextType = ContextModule;

  async componentDidMount() {
    this.syncCrypto();
    this.syncTimer = setInterval(async () => {
      try {
        let last = await this.checkLastTransaction();
        if (this.state.syncFlag && last > this.context.value.lastBlockTime) {
          this.mounted &&
            this.setState(
              {
                syncFlag: false,
              },
              () => this.syncCrypto(),
            );
        }
      } catch (error) {
        console.log(error);
      }
    }, 10000);
  }

  async checkLastTransaction() {
    let historyBlock = 0;
    let historyUSDCBlock = 0;
    let historyUSDTBlock = 0;
    try {
      const history = await this.connection.getConfirmedSignaturesForAddress2(
        this.context.value.cryptoAccounts.sol,
        {limit: 1},
      );
      historyBlock = history[0].blockTime;
    } catch (error) {
      historyBlock = 0;
    }
    try {
      const historyUSDC =
        await this.connection.getConfirmedSignaturesForAddress2(
          this.context.value.cryptoAccounts.usdc,
          {limit: 1},
        );
      historyUSDCBlock = historyUSDC[0].blockTime;
    } catch (error) {
      historyUSDCBlock = 0;
    }
    try {
      const historyUSDT =
        await this.connection.getConfirmedSignaturesForAddress2(
          this.context.value.cryptoAccounts.usdt,
          {limit: 1},
        );
      historyUSDTBlock = historyUSDT[0].blockTime;
    } catch (error) {
      historyUSDTBlock = 0;
    }
    return Math.max(historyBlock, historyUSDCBlock, historyUSDTBlock);
  }

  async syncCrypto() {
    const pubkey = new PublicKey(this.context.value.publicKey);
    let [balance, tokenUSDC, tokenUSDT] = await Promise.all([
      this.connection.getBalance(pubkey),
      this.connection.getTokenAccountsByOwner(
        pubkey,
        {mint: splTokens[1].value},
        'finalized',
      ),
      this.connection.getTokenAccountsByOwner(
        pubkey,
        {mint: splTokens[2].value},
        'finalized',
      ),
    ]);
    let cryptoBalances = {
      sol: balance / LAMPORTS_PER_SOL,
      usdc: 0,
      usdt: 0,
    };
    try {
      cryptoBalances.usdc =
      parseFloat(AccountLayout.decode(tokenUSDC.value[0].account.data).amount) / 1000000;
    } catch (error) {
      cryptoBalances.usdc = 0;
    }
    try {
      cryptoBalances.usdt =
      parseFloat(AccountLayout.decode(tokenUSDT.value[0].account.data).amount) / 1000000;
    } catch (error) {
      cryptoBalances.usdt = 0;
    }
    this.mounted &&
      this.context.setValue({
        cryptoBalances,
      });
    let [history, historyUSDC, historyUSDT] = await Promise.all([
      this.context.value.connection.getConfirmedSignaturesForAddress2(pubkey),
      tokenUSDC.value[0]?.pubkey
        ? this.context.value.connection.getConfirmedSignaturesForAddress2(
            tokenUSDC.value[0]?.pubkey,
          )
        : [],
      tokenUSDT.value[0]?.pubkey
        ? this.context.value.connection.getConfirmedSignaturesForAddress2(
            tokenUSDT.value[0]?.pubkey,
          )
        : [],
    ]);
    history = history.map(item => {
      return {
        ...item,
        token: 'SOL',
      };
    });
    historyUSDC = historyUSDC.map(item => {
      return {
        ...item,
        token: 'USDC',
      };
    });
    historyUSDT = historyUSDT.map(item => {
      return {
        ...item,
        token: 'USDT',
      };
    });
    let cryptoAccounts = {
      sol: pubkey,
      usdc: '',
      usdt: '',
    };
    try {
      cryptoAccounts.usdc = tokenUSDC.value[0];
    } catch (error) {
      cryptoAccounts.usdc = '';
    }
    try {
      cryptoAccounts.usdt = tokenUSDT.value[0];
    } catch (error) {
      cryptoAccounts.usdt = '';
    }
    this.mounted &&
      this.context.setValue({
        cryptoAccounts,
      });
    let subHistory = history
      .concat(historyUSDC, historyUSDT)
      .sort((a, b) => high2low(a, b));
    if (subHistory.length > 10) {
      subHistory = subHistory
        .slice(subHistory.length - 10, subHistory.length)
        .reverse();
    } else {
      subHistory = subHistory.reverse();
    }
    let [res] = await Promise.all([
      this.context.value.connection.getTransactions(
        subHistory.map(item => item.signature),
      ),
    ]);
    res = res.map((item, index) => {
      return {...item, token: subHistory[index].token};
    });
    let temp = [];
    res.forEach((element, index) => {
      let token = element.token;
      let amount = 0;
      if (element.meta.postTokenBalances.length > 0) {
        if (
          element.transaction.message.accountKeys[0].toBase58() ===
          pubkey.toBase58()
        ) {
          amount = Math.abs(
            element.meta.postTokenBalances[0].uiTokenAmount.uiAmount -
              element.meta.preTokenBalances[0].uiTokenAmount.uiAmount,
          );
        } else {
          if (element.meta.preTokenBalances[1] ? false : true) {
            for (
              let index = 0;
              index < element.meta.postTokenBalances.length;
              index++
            ) {
              if (
                element.meta.postTokenBalances[index].owner ===
                pubkey.toBase58()
              ) {
                amount =
                  element.meta.postTokenBalances[index].uiTokenAmount.uiAmount;
              }
            }
          } else {
            amount = Math.abs(
              element.meta.postTokenBalances[1].uiTokenAmount.uiAmount -
                element.meta.preTokenBalances[1].uiTokenAmount.uiAmount,
            );
          }
        }
      } else {
        amount =
          Math.abs(element.meta.postBalances[0] - element.meta.preBalances[0]) /
          1000000000;
      }
      let mult =
        element.transaction.message.accountKeys[0] === pubkey.toBase58()
          ? -1
          : 1;
      temp.push({
        from: element.transaction.message.accountKeys[0].toBase58(),
        to: element.transaction.message.accountKeys[1].toBase58(),
        pay: history.concat(historyUSDC, historyUSDT)[index].memo,
        token,
        amount: amount * mult,
        blockTime: element.blockTime,
        signature: element.transaction.signatures[0],
        icon:
          token === 'SOL'
            ? splTokens[0].icon
            : token === 'USDC'
            ? splTokens[1].icon
            : splTokens[2].icon,
      });
    });
    this.mounted &&
      this.context.setValue({
        lastBlockTime: temp.length > 0 ? temp[0].blockTime : 0,
      });
    this.mounted &&
      this.setState({
        transactions: temp,
        syncFlag: true,
      });
  }

  componentWillUnmount() {
    if (this.source) {
      this.source.cancel('Component got unmounted');
    }
    clearInterval(this.syncTimer);
    this.mounted = false;
  }

  render() {
    const hr = function () {
      return (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 10,
          }}>
          <View style={{flex: 1, height: 1, backgroundColor: '#d820f9'}} />
          <View>
            <Text style={{width: 50, textAlign: 'center', color: '#d820f9'}}>
              •
            </Text>
          </View>
          <View style={{flex: 1, height: 1, backgroundColor: '#d820f9'}} />
        </View>
      );
    };
    return (
      <View>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: 'white', fontSize: 20, paddingTop: 10}}>
            Address
          </Text>
          <Text
            style={{
              color: 'blue',
              textDecorationLine: 'underline',
              fontSize: 20,
              textAlign: 'center',
            }}
            onPress={() =>
              Linking.openURL(
                `https://solscan.io/account/${this.context.value.publicKey}`,
              )
            }>
            {this.context.value.publicKey.substring(0, 21) +
              '\n' +
              this.context.value.publicKey.substring(21)}
          </Text>
          <Text style={{color: 'white', fontSize: 20, paddingTop: 10}}>
            Assets
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              flexWrap: 'wrap',
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 20,
                textAlign: 'center',
                marginTop: 2,
              }}>
              {' '}
              {splTokens[0].icon}{' '}
              {espilonRound(this.context.value.cryptoBalances.sol)} SOL{' '}
            </Text>
            {this.context.value.cryptoBalances.usdc > 0 && (
              <Text
                style={{
                  color: 'white',
                  fontSize: 20,
                  textAlign: 'center',
                  marginTop: 2,
                }}>
                {' '}
                {splTokens[1].icon} {this.context.value.cryptoBalances.usdc}{' '}
                USDC{' '}
              </Text>
            )}
            {this.context.value.cryptoBalances.usdt > 0 && (
              <Text
                style={{
                  color: 'white',
                  fontSize: 20,
                  textAlign: 'center',
                  marginTop: 2,
                }}>
                {' '}
                {splTokens[2].icon} {this.context.value.cryptoBalances.usdt}{' '}
                USDT{' '}
              </Text>
            )}
          </View>
          {hr()}
          <Text style={{color: 'white', fontSize: 20}}>Transactions</Text>
          <ScrollView>
            {this.state.transactions &&
              this.state.transactions.map((item, index) => (
                <Pressable
                  key={index}
                  style={{
                    flexDirection: 'row',
                    alignContent: 'space-between',
                    alignItems: 'center',
                    paddingTop: 10,
                  }}
                  onPress={async () => {
                    this.context.setValue(
                      {
                        transactionData: item,
                      },
                      () => this.props.navigation.navigate('PrintTicket'),
                    );
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 20,
                      textAlign: 'center',
                      width: Dimensions.get('window').width * 0.333,
                    }}>
                    {item.pay ? 'Solana Pay' : 'Transfer'}
                  </Text>
                  <Text
                    style={{
                      color: item.amount >= 0 ? 'green' : 'red',
                      fontSize: 20,
                      textAlign: 'center',
                      width: Dimensions.get('window').width * 0.333,
                    }}>
                    {item.icon}{' '}
                    {Math.abs(espilonRound(parseFloat(item.amount)))}
                  </Text>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 20,
                      textAlign: 'center',
                      width: Dimensions.get('window').width * 0.333,
                    }}>
                    <Text>{'Date\n'}</Text>
                    {new Date(item.blockTime * 1000).toLocaleDateString()}
                  </Text>
                </Pressable>
              ))}
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default Crypto;
