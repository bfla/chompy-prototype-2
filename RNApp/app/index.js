import React, {  
  View,
  Text,
  StyleSheet
} from 'react-native';

import Button from './button';

export default React.createClass({  
  getInitialState() {
    return {
      connected: false,
      posts: {}
    }
  },

  handleIncrement() {
    console.log('inc');
  },

  handleDecrement() {
    console.log('dec');
  },

  render() {
    let count = 10;
    return (
      <View style={styles.container}>
        <View style={styles.center}>
          <Text>Posts: {count}</Text>
          <Button text="Increment" onPress={this.handleIncrement}/>
          <Button text="Decrement" onPress={this.handleDecrement}/>
        </View>
      </View>
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