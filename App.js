import React, {Component} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Switch,
  ActivityIndicator,
} from 'react-native';
import database from '@react-native-firebase/database';

const lightRef = database().ref('/ESP32_OLED_PROJECT/power_outlet_1/');
const fanRef = database().ref('/ESP32_OLED_PROJECT/power_outlet_2/');
const deviceRef = database().ref('/ESP32_OLED_PROJECT/device/');

class App extends Component {
  state = {
    lightState: false,
    deviceState: false,
    fanState: false,
    isDatabaseConnected: false,
  };

  onLightPress = () => {
    lightRef
      .update({
        App: !this.state.lightState,
      })
      .then(() => {
        this.setState({
          lightState: !this.state.lightState,
        });

        console.log('Data upload');
      });
  };

  onDevicePress = () => {
    deviceRef
      .update({
        App: !this.state.deviceState,
      })
      .then(() => {
        this.setState({
          deviceState: !this.state.deviceState,
        });
        console.log('Data upload');
      });
  };

  onFanPressed = () => {
    fanRef
      .update({
        App: !this.state.fanState,
      })
      .then(() => {
        this.setState({
          fanState: !this.state.fanState,
        });
        console.log('Data upload');
      });
  };

  componentDidMount() {
    lightRef.once('value').then(snapshot => {
      console.log('User data: ', snapshot.val().App);
      this.setState({
        lightState: snapshot.val().App,
        isDatabaseConnected: true,
      });
    });

    deviceRef.once('value').then(snapshot => {
      console.log('User data: ', snapshot.val().App);
      this.setState({
        deviceState: snapshot.val().App,
      });
    });

    fanRef.once('value').then(snapshot => {
      console.log('User data: ', snapshot.val().App);
      this.setState({
        fanState: snapshot.val().App,
      });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator
          size="large"
          color="#00ff00"
          animating={!this.state.isDatabaseConnected}
        />

        <TouchableOpacity
          style={
            this.state.lightState ? styles.button_dark : styles.button_light
          }
          onPress={this.onLightPress}>
          <Text>Set light</Text>
        </TouchableOpacity>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={!this.state.lightState ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          value={!this.state.lightState}
        />

        <TouchableOpacity
          style={
            this.state.deviceState ? styles.button_light : styles.button_dark
          }
          onPress={this.onDevicePress}>
          <Text>Set device</Text>
        </TouchableOpacity>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={this.state.deviceState ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          value={this.state.deviceState}
        />

        <TouchableOpacity
          style={this.state.fanState ? styles.button_dark : styles.button_light}
          onPress={this.onFanPressed}>
          <Text>Set Fan</Text>
        </TouchableOpacity>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={!this.state.fanState ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          value={!this.state.fanState}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D4E5F6',
  },
  button_dark: {
    alignItems: 'center',
    backgroundColor: '#99BB00',
    padding: 10,
    marginBottom: 10,
  },
  button_light: {
    alignItems: 'center',
    backgroundColor: '#FFA550',
    padding: 10,
    marginBottom: 10,
  },
});

export default App;
