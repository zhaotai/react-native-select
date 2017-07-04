'use strict';
import React from 'react';
import {
  StyleSheet,
  Modal,
  Text,
  Dimensions,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Platform,
  Picker,
  View
} from 'react-native';

export default class Select extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      selectedKey: props.selectedKey
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      selectedKey: props.selectedKey
    });
  }

  _setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  _onChange(key) {
    this.setState({selectedKey: key});
    this.props.onChange(key);
  }

  _close() {
    this.setState({modalVisible: false});
  }

  _renderLabel() {
    const {models: options, labelStyle, placeholderStyle, placeholderKey, placeholder} = this.props;
    const onPress = Platform.OS === 'ios' ? this._setModalVisible.bind(this, true) : undefined;

    if(options[this.state.selectedKey] === undefined || this.state.selectedKey === placeholderKey){
      return <Text style={[styles.placeholderStyle, placeholderStyle]} onPress={onPress}>{placeholder}</Text>
    }

    return <Text style={labelStyle} onPress={onPress}>{options[this.state.selectedKey].label}</Text>
  }

  _renderAndroid() {
    const {models: options, style, placeholder, onChange, ...other} = this.props;
    return (
      <View style={[styles.selectContainer, style]} {...other}>
        {this._renderLabel()}
        <Picker
          selectedValue={this.state.selectedKey ? this.state.selectedKey : placeholder}
          onValueChange={this._onChange.bind(this)}
          style={[styles.androidPicker]}
        >
          {Object.keys(options).map((key) => (
            <Picker.Item
              key={key}
              value={key}
              label={options[key].label}
            />
          ))}
        </Picker>
      </View>

    );
  }

  _renderIOS() {
    const { models: options, style, doneLabel, doneLabelColor, onChange, ...other } = this.props;
    var modalBackgroundStyle = {
      backgroundColor: 'transparent',
    };
    var innerContainerTransparentStyle = null;
    return (
      <View style={[styles.selectContainer, style]} {...other}>
        {this._renderLabel()}
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
        >
          <TouchableWithoutFeedback onPress={this._setModalVisible.bind(this, false)}>
            <View style={[styles.container, modalBackgroundStyle]}>
              <View style={styles.pickerBar}>
                <Text
                  style={{color: doneLabelColor}}
                  onPress={this._close.bind(this)}>
                  {doneLabel || "完成"}
                </Text>
              </View>
              <View onStartShouldSetResponder={ (evt) => true }
                  onResponderReject={ (evt) => {} }
                  style={[styles.innerContainer, innerContainerTransparentStyle]}>
                <Picker selectedValue={this.state.selectedKey}
                    onValueChange={this._onChange.bind(this)}
                    style={styles.pickerIOS}
                >
                  {Object.keys(options).map((key) => (
                    <Picker.Item
                      key={key}
                      value={key}
                      label={options[key].label}
                    />
                  ))}
                </Picker>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    );
  }

  render() {
    return Platform.OS === 'ios' ? this._renderIOS() : this._renderAndroid();
  }

}

Select.propTypes = {
  options: React.PropTypes.object,
  selectedKey: React.PropTypes.string,
  labelStyle: Text.propTypes.style,
  onChange: React.PropTypes.func,
  placeholder: React.PropTypes.string,
  placeholderKey: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
  placeholderStyle: Text.propTypes.style,
};

Select.defaultProps = {
  placeholder: "",
};

var styles = StyleSheet.create({
  selectContainer: {
    flex: 1,
    alignItems: 'flex-end',
    padding: 0
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  innerContainer: {
    width: Dimensions.get('window').width,
    alignItems: 'center',
    paddingVertical: 0,
    backgroundColor: '#ccc'
  },
  pickerBar: {
    width: Dimensions.get('window').width,
    justifyContent: 'flex-end',
    flexDirection: 'row',
    padding: 7,
    backgroundColor: '#ececec'
  },
  pickerIOS: {
    marginTop: 0,
    width: Dimensions.get('window').width,
  },
  androidLabel: {
    alignSelf: 'center',
    justifyContent: 'center'
  },
  androidPicker: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0
  }
});
