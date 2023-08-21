import React, { Component } from "react";
import reactAutobind from "react-autobind";
import { Camera } from "react-native-camera-kit";

class Cam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scanning: true,
    };
    reactAutobind(this);
  }

  render() {
    return (
      <Camera
        style={{ height: "100%", width: "100%" }}
        scanBarcode={this.state.scanning}
        onReadCode={(event) => {
          let temp = event.nativeEvent.codeStringValue;
          if (temp.length === 44 || temp.indexOf("solana:") > -1) {
            this.setState(
              {
                scanning: false,
              },
              () => {
                if (temp.length === 44) this.props.callbackAddress(temp);
                if (temp.indexOf("solana:") > -1) {
                  this.props.callbackAddress(
                    temp.substring(7)
                  );
                }
              }
            );
          } else if (temp.length === 42 || temp.indexOf("ethereum:") > -1) {
            this.setState(
              {
                scanning: false,
              },
              () => {
                if (temp.length === 42) this.props.callbackAddressETH(temp);
                if (temp.indexOf("ethereum:") > -1) {
                  if (temp.indexOf("@") > -1) {
                    this.props.callbackAddressETH(
                      temp.substring(9, temp.indexOf("@"))
                    );
                  } else {
                    this.props.callbackAddressETH(temp.substring(9));
                  }
                }
              }
            );
          }
        }}
        showFrame={false}
      />
    );
  }
}

export default Cam;
