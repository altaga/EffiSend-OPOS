// Basic Imports
'use client'; // NextJS 13
import { Connection } from '@solana/web3.js';
import React from 'react';
import reactAutobind from 'react-autobind';

const ContextModule = React.createContext();

// Context Provider Component

class ContextProvider extends React.Component {
  // define all the values you want to use in the context
  constructor(props) {
    super(props);
    this.state = {
      value: {
        // Fiat
        fiatWallet: "cus_MDE4hONYFwAsCe",
        fiatBearer: 'Bearer sk_test_51LQKYyC0pqIl3uB5Dz8Stuu1r6LxF4YlC6r4wXmBgfbpiUcM54dxY52i4cxoP6yg8EysE3cdXVx6hfURPqY1irGp00SMCK00FJ',
        fiatBalance: 0,
        fiatTransactions: [],
        // Crypto
        connection: new Connection(
          'https://attentive-lingering-putty.solana-mainnet.discover.quiknode.pro/b1d2663c7bd9a4e5de5ce2deae05003d08cce50f/'
        ),
        publicKey: '',
        cryptoBalances: {
          sol: 0,
          usdc: 0,
          usdt: 0,
        },
        cryptoAccounts: {
          sol: 0,
          usdc: 0,
          usdt: 0,
        },
        lastBlockTime: 0,
        transactionData: {
          amount:0,
          token:"",
          memo:"",
          signature:""
        },
      },
    };
    reactAutobind(this);
  }

  // Method to update manually the context state, this method isn't used in this example

  setValue = (value, then = () => {}) => {
    this.setState(
      {
        value: {
          ...this.state.value,
          ...value,
        },
      },
      () => then(),
    );
  };

  render() {
    const {children} = this.props;
    const {value} = this.state;
    // Fill this object with the methods you want to pass down to the context
    const {setValue} = this;

    return (
      <ContextModule.Provider
        // Provide all the methods and values defined above
        value={{
          value,
          setValue,
        }}>
        {children}
      </ContextModule.Provider>
    );
  }
}

// Dont Change anything below this line

export {ContextProvider};
export const ContextConsumer = ContextModule.Consumer;
export default ContextModule;
