'use strict';

let DDPClient = require('ddp-client');
import React, {
  AppRegistry,
  Component,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import Camera from 'react-native-camera';
let ddpClient = new DDPClient();

export default React.createClass({
  getInitialState() {
    return {
      connected: false,
    }
  },

  componentWillMount() {
    this.connectDDP();
  },

  connectDDP() { // Needs tests?
    ddpClient.connect((err, wasReconnect) => {
      let connected = true;
      if (err) connected = false;
      this.setState({ connected: connected });
    });
  },

  // makeSubscriptions() {
  //   ddpClient.subscribe("chomps", [], () => {
  //     this.setState({chomps: ddpClient.collections.chomps});
  //   });
  // },

  // observeChomps() {
  //   let observer = ddpClient.observe("chomps");
    
  //   observer.added = (id) => {
  //     this.setState({chomps: ddpClient.collections.chomps})
  //   }

  //   observer.changed = (id, oldFields, clearedFields, newFields) => {
  //     this.setState({chomps: ddpClient.collections.chomps})
  //   }

  //   observer.removed = (id, oldValue) => {
  //     this.setState({chomps: ddpClient.collections.chomps})
  //   }
  // },

  render() {
    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}>
          <Text style={styles.capture} onPress={this.takePicture}>[CAPTURE]</Text>
        </Camera>
      </View>
    );
  },

  handleFileUpload(filepath) {
    console.warn(filepath);
    let _params = {
      blurb: 'A new chomp',
      localFile: filepath,
      imgBinary: '',
    };
    ddpClient.call('createChomp', _params, this.handleFileUploadRes);
  },

  handleFileUploadRes(err, res) {
    if (err) {
      console.error(err)
    } else {
      console.warn('Chomp uploaded successfully!');
    }
  },

  takePicture() {
    this.camera.capture()
      .then(this.handleFileUpload)
      .catch(err => console.error(err));
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
});