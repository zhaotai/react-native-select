'use strict';
import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Alert,
  View
} from 'react-native';
import Button from 'react-native-button';
import Select from '../index';

class SelectExample extends Component {
  constructor(props) {
    super(props);
  }

  _testYourCode() {
    // the place where you can test your code
    //eg.
    Alert.alert('This is a test example');
  }

  render() {
    const CAR_MAKES_AND_MODELS = {
      '': {label: 'Car Makes and Models'},
      amc: {
        label: 'AMC',
        models: ['AMX', 'Concord', 'Eagle', 'Gremlin', 'Matador', 'Pacer'],
      },
      alfa: {
        label: 'Alfa-Romeo',
        models: ['159', '4C', 'Alfasud', 'Brera', 'GTV6', 'Giulia', 'MiTo', 'Spider'],
      },
      aston: {
        label: 'Aston Martin',
        models: ['DB5', 'DB9', 'DBS', 'Rapide', 'Vanquish', 'Vantage'],
      }
    };
    return (
      <View style={{flex: 1,alignItems: 'center', justifyContent: 'center'}}>
        <Button containerStyle={{width: 200, justifyContent: 'center', alignItems: 'center', height: 50, backgroundColor: '#ccc'}} onPress={this._testYourCode.bind(this)}>
          <Text>点击这里来测试你的code</Text>
        </Button>
        <Select models={CAR_MAKES_AND_MODELS}
            selectedKey={'alfa'}
            placeholder={'Car Makes and Models'}
            placeholderStyle={{color: '#CCC'}}
            placeholderKey={''}
            onChange={ () => {} }
        />
        <Button containerStyle={{width: 200, justifyContent: 'center', alignItems: 'center', height: 50, backgroundColor: '#ccc'}} onPress={this._testYourCode.bind(this)}>
          <Text>Example with placeholder</Text>
        </Button>
        <Select models={CAR_MAKES_AND_MODELS}
            placeholder={'Car Makes and Models'}
            placeholderStyle={{color: '#CCC'}}
            placeholderKey={''}
            onChange={ () => {} }
        />
      </View>
    )
  }
}

var styles = StyleSheet.create({

});

AppRegistry.registerComponent('SelectExample', () => SelectExample);
