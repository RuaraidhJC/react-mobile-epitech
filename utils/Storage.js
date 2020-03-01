import { AsyncStorage } from "react-native";

class Storage {
  static async getJwt() {
    return this.getData("jwt");
  }

  static async setJwt(value) {
    return this.storeData("jwt", value);
  }

  static async getNotificationToken() {
    return this.getData("notification");
  }

  static async setEmail(value) {
    return this.storeData("email", value);
  }

  static async getEmail() {
    return this.getData("email");
  }

  static async setNotificationToken(value) {
    await this.storeData("notification", value);
  }

  static async clear() {
    await AsyncStorage.clear();
  }

  static async logout(navigation = null, clearToken = true) {
    if (clearToken) await this.clear();

    if (navigation) navigation.navigate("loginScreen");
  }

  static getData = async key => {
    try {
      return await AsyncStorage.getItem(key);
    } catch (e) {
      // error reading value
    }
    return null;
  };

  static storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      // lol
    }
  };
}

export default Storage;
