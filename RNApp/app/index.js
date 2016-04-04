let _ = require('underscore');
import React, {  
  View,
  Text,
  StyleSheet
} from 'react-native';

import Button from './button';
import CameraScreen from './camera-screen';
import DDPClient from 'ddp-client';
let ddpClient = new DDPClient();

export default React.createClass({  
  getInitialState() {
    return {
      connected: false,
      chomps: {},
    }
  },

  componentDidMount() {
    ddpClient.connect((err, wasReconnect) => {
      let connected = true;
      if (err) connected = false;
      this.setState({ connected: connected });
      this.makeSubscriptions();
      this.observeChomps();
    });
  },

  makeSubscriptions() {
    ddpClient.subscribe("chomps", [], () => {
      this.setState({chomps: ddpClient.collections.chomps});
    });
  },

  observeChomps() {
    let observer = ddpClient.observe("chomps");
    
    observer.added = (id) => {
      this.setState({chomps: ddpClient.collections.chomps})
    }

    observer.changed = (id, oldFields, clearedFields, newFields) => {
      this.setState({chomps: ddpClient.collections.chomps})
    }

    observer.removed = (id, oldValue) => {
      this.setState({chomps: ddpClient.collections.chomps})
    }

  },

  handleIncrement() {
    ddpClient.call('createChomp');
  },

  render() {
    let count = Object.keys(this.state.chomps).length;
    // return (<View><Text>hello</Text></View>);
    return (
      <CameraScreen></CameraScreen>
      // <View style={styles.container}>
      //   <View style={styles.center}>
      //     <Text>Chomps: {count}</Text>
      //     <Button text="Increment" onPress={this.handleIncrement}/>
      //   </View>
      // </View>
    );
  }
});

const styles = StyleSheet.create({  
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  center: {
    alignItems: 'center'
  }
});