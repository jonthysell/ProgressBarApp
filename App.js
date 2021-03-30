'use strict';
import React from 'react';
import { StyleSheet, View, } from 'react-native';

class App extends React.Component {
  state = {
  };

  styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
    }
  });

  render() {
    return (
      <View style={this.styles.container}>
      </View>
    );
  }
}

export default App;