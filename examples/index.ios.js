'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  Alert,
  Image,
  View
} from 'react-native';
import Button from 'react-native-button';
import Select from './components/select';

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
                onChange={(key) => this.setState({carMake: key})}
        />
        <Button containerStyle={{width: 200, justifyContent: 'center', alignItems: 'center', height: 50, backgroundColor: '#ccc'}} onPress={this._testYourCode.bind(this)}>
          <Text>Example with placeholder</Text>
        </Button>
        <Select models={CAR_MAKES_AND_MODELS}
                placeholder={'Car Makes and Models'}
                onChange={(key) => this.setState({carMake: key})}
        />
      </View>
    )
  }
}

var styles = StyleSheet.create({

});

AppRegistry.registerComponent('SelectExample', () => SelectExample);
