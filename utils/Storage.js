import {AsyncStorage} from 'react-native';

class Storage {
  static async getJwt() {
    return await this.getData('jwt');
  }

  static async setJwt(value) {
    await this.storeData('jwt', value);
  }

  static async getNotificationToken() {
    return await this.getData('notification');
  }

  static async setEmail(value) {
    await this.storeData('email', value);
  }

  static async getEmail() {
    return await this.getData('email');
  }

  static async setNotificationToken(value) {
    await this.storeData('notification', value);
  }

  static async clear() {
    await AsyncStorage.clear();
  }

  static async logout(navigation = null, clear_token = true)
  {
    if (clear_token)
      await this.clear();

    if (navigation)
      navigation.navigate("loginScreen")
  }

  static getData = async (key) => {
    try {
      return await AsyncStorage.getItem(key);
    } catch(e) {
      // error reading value
    }
  };

  static storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value)
    } catch (e) {
      console.log('Error: Key: '+key+' value: '+value + ' Reason:'+e)
    }
  };
}


export default Storage;
