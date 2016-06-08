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

  _renderAndroid() {
    const { models, selectedKey, onChange, style, labelStyle, ...other } = this.props;

    return (
      <View style={[styles.selectContainer, style]} {...other}>
        <Text style={labelStyle} >
          {models[this.state.selectedKey] ? models[this.state.selectedKey].label : ""}
        </Text>
        <Picker
          selectedValue={this.state.selectedKey ? this.state.selectedKey : ""}
          onValueChange={this._onChange.bind(this)}
          style={[styles.androidPicker]}
        >
          {Object.keys(models).map((key) => (
            <Picker.Item
              key={key}
              value={key}
              label={models[key].label}
            />
          ))}
        </Picker>
      </View>

    );
  }

  _renderIOS() {
    const { models, selectedKey, onChange, style, labelStyle, ...other } = this.props;
    var modalBackgroundStyle = {
      backgroundColor: 'transparent',
    };
    var innerContainerTransparentStyle = null;
    return (
      <View style={[styles.selectContainer, style]} {...other}>
        <Text style={labelStyle} onPress={this._setModalVisible.bind(this, true)}>
          {models[this.state.selectedKey] ? models[this.state.selectedKey].label : ""}
        </Text>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
        >
          <TouchableWithoutFeedback onPress={this._setModalVisible.bind(this, false)}>
            <View style={[styles.container, modalBackgroundStyle]}>
              <View style={styles.pickerBar}>
                <Text onPress={this._close.bind(this)}>完成</Text>
              </View>
              <View onStartShouldSetResponder={ (evt) => true }
                    onResponderReject={ (evt) => {} }
                    style={[styles.innerContainer, innerContainerTransparentStyle]}>
                    <Picker selectedValue={this.state.selectedKey}
                               onValueChange={this._onChange.bind(this)}
                               style={styles.pickerIOS}
                    >
                      {Object.keys(models).map((key) => (
                        <Picker.Item
                          key={key}
                          value={key}
                          label={models[key].label}
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
  models: React.PropTypes.object,
  selectedKey: React.PropTypes.string,
  style: React.PropTypes.object,
  labelStyle: React.PropTypes.object,
  onChange: React.PropTypes.func
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
