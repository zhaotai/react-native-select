## Introduction

This is a select component simulating the select input in safari and show as a default way in android.

It will automatically show the current option and if you tap it, there will be a picker.

In IOS, the picker will show from the bottom of the screen, and cover all other views. I used Modal inside to simulate this.

In android, the picker just shows as the android`s default.

**If you have some suggestions to me. I`m glad to receive your message.**

## How to use

	npm install react-native-default-select

and import it to your code

	import Select from 'react-native-default-select'
And then you can use it.

## Props

* **options:** Required

``` javascript
var options = {
	key1: {
		label: 'label1',
		xx: {},
		xxx: {}
	},
	key2: {
		label: 'label2',
		xx: {},
		xxx: {}
	}
}

```

> options is the structrue to pass to the PickerIOS and Picker. So the structure is kind of similar to PickerIOS. You need to pass an object with sorts of keys to identify the options. And in each of the key object, one field is nessarrary, it is 'label'. The 'label' is the word of the option you want to show and the others are content of this option.

* **selectedKey:** Optional

> **selectedKey** is the one of the key in options representing the default option.If you don\`t use this prop, the default option is nothing.

* **onChange:<Function>** Required

> **onChange(key)** is a callback function with parameter 'key'. It will expose the selected key of the option to you so that you can do more things.

* **style:** Optional

> **style** will be passed to View as its style, you can customize style of the View

* **doneLabel** Optional 

> **doneLabel** will replace the default Chinese label '完成'.

* **labelStyle:** Optional

> **labelStyle** will be passed to the control label of the input, you can customize the font, color etc..

* *others:* Optional

> You can also pass other props included in View, it will be automatically append the View props.
	For example: accessibilityLabel, accessible

## Example

``` js
var CAR_MAKES_AND_MODELS = {
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

class AwesomeProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      carMake: 'alfa'
    };
  }

  render() {
    return (
      <View style={{height: 600, paddingTop: 20}}>
        <ScrollView>
          <Select models={CAR_MAKES_AND_MODELS}
                  selectedKey={'alfa'}
                  onChange={(key) => this.setState({carMake: key})}
          />
          <View><Text>12345678</Text></View>
          <View><Text>12345678</Text></View>
          <View><Text>12345678</Text></View>
        </ScrollView>
      </View>
    )
  }
}

```
