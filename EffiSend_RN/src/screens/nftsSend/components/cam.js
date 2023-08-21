import React, { Component } from "react";
import reactAutobind from "react-autobind";
import { Camera } from "react-native-camera-kit";

class Cam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scanning: true,
    };
    this.check = true;
    reactAutobind(this);
  }

  componentDidUpdate(prevState, prevProps) {
    if (
      this.props.reset === true &&
      this.props.reset !== prevProps.reset &&
      this.state.scanning === false
    ) {
      this.setState({
        scanning: true,
      });
      this.check = true;
    }
  }

  render() {
    return (
      <Camera
        style={{ height: "100%", width: "100%" }}
        scanBarcode={this.state.scanning}
        onReadCode={(event) => {
          const temp = event.nativeEvent.codeStringValue;
          if (this.check) {
            this.check = false;
            if (temp.length === 44 || temp.indexOf("solana:") > -1) {
              this.setState(
                {
                  scanning: false,
                },
                () => {
                  if (temp.length === 44) this.props.callback(temp);
                  if (temp.indexOf("solana:") > -1) {
                    this.props.callback(temp.substring(7));
                  }
                }
              );
            } else {
              this.check = true;
            }
          } else {
            this.check = true;
          }
        }}
        showFrame={false}
      />
    );
  }
}

export default Cam;
