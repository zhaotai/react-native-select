'use strict';
import React, {
  Component,
  StyleSheet,
  Modal,
  Text,
  Dimensions,
  TouchableHighlight,
  PickerIOS,
  PickerItemIOS,
  TouchableWithoutFeedback,
  Platform,
  Picker,
  View
} from 'react-native';

export default class Select extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      selectedKey: props.selectedKey
    };
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
        <Picker
          selectedValue={this.state.selectedKey ? this.state.selectedKey : ""}
          onValueChange={this._onChange.bind(this)}
          style={[styles.androidPicker, labelStyle]}
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
          animated={true}
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
                    <PickerIOS selectedValue={this.state.selectedKey}
                               onValueChange={this._onChange.bind(this)}
                               style={styles.pickerIOS}
                    >
                      {Object.keys(models).map((key) => (
                        <PickerItemIOS
                          key={key}
                          value={key}
                          label={models[key].label}
                        />
                      ))}
                    </PickerIOS>
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
    flex: 1
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
  androidPicker: {
    backgroundColor: '#fff'
  }
});
