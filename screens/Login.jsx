import React, { useState } from 'react';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import { StyleSheet, Keyboard, ImageBackground } from 'react-native';
import { Formik } from 'formik';
import {
  Block, Button, Input, Toast, Text,
} from 'galio-framework';

import Network from '../utils/Network';
import useGlobalState from '../context/global';

export default function Login(props) {
  const [isShow, setShow] = useState(false);
  const globalState = useGlobalState();
  const { notificationToken } = globalState.user;
  const { setUser } = globalState;
  const schema = yup.object({
    email: yup
      .string()
      .required('Required')
      .email('Valid e-mail address required'),
    password: yup
      .string()
      .required('Required')
      .min(6, 'Password must be at least 6 characters')
      .max(15, 'Password must be less than 15 characters'),
  });

  const submitLogin = async (values) => {
    const response = await Network.post('/login', {
      email: values.email,
      password: values.password,
      notificationToken,
    });
    if (response.data.success) {
      const me = await Network.get('/me');
      setUser(me.data.data);
      return props.navigation.navigate('homeScreen');
    }
    setShow(true);
    return true;
  };

  const submitRegister = async (values) => {
    const { navigation } = props;
    const response = await Network.post('/signup', {
      email: values.email,
      password: values.password,
      notificationToken,
    });
    if (response.data.success) {
      const me = await Network.get('/me');
      setUser(me.data.data);
      return navigation.navigate('homeScreen');
    }
    setShow(true);
    return true;
  };

  return (
    <ImageBackground
      source={{
        uri: 'https://images.unsplash.com/photo-1516528387618-afa90b13e000',
      }}
      style={{ width: '100%', height: '100%' }}
    >
      <Toast round isShow={isShow} positionIndicator="bottom" color="warning">
        <Block row>
          <Block flex left center>
            <Button
              onlyIcon
              icon="close"
              iconSize={24}
              iconColor="white"
              style={{ width: 'auto', paddingHorizontal: 20 }}
              iconFamily="fontawesome"
              color="transparent"
              onPress={() => setShow(false)}
            />
          </Block>
          <Block flex={4} right center>
            <Text
              color="white"
              style={{ width: 'auto', paddingHorizontal: 20 }}
            >
              Bad email/password combination.
            </Text>
          </Block>
        </Block>
      </Toast>
      <Block flex center>
        <Block flex style={{ width: '90%', justifyContent: 'center' }}>
          <Text color="white" h3>
            LOGIN
          </Text>
          <Formik
            validationSchema={schema}
            initialValues={{ email: '', password: '' }}
            onSubmit={() => undefined}
          >
            {({
              handleChange,
              validateForm,
              setFieldTouched,
              errors,
              touched,
              values,
            }) => (
              <Block center>
                <Input
                  onChangeText={handleChange('email')}
                  onBlur={() => setFieldTouched('email')}
                  value={values.email}
                  style={
                    touched.email && errors.email
                      ? { borderColor: 'red' }
                      : undefined
                  }
                  help={
                    touched.email && errors.email ? (
                      <Text style={{ color: 'red' }}>{errors.email}</Text>
                    ) : (
                      undefined
                    )
                  }
                  placeholder="E-mail"
                />
                <Input
                  password
                  viewPass
                  onChangeText={handleChange('password')}
                  onBlur={() => setFieldTouched('password')}
                  value={values.password}
                  style={
                    touched.password && errors.password
                      ? { borderColor: 'red' }
                      : undefined
                  }
                  help={
                    touched.password && errors.password ? (
                      <Text style={{ color: 'red' }}>{errors.password}</Text>
                    ) : (
                      undefined
                    )
                  }
                  placeholder="Password"
                />
                <Block row space="evenly" style={{ width: '90%' }}>
                  <Block flex left>
                    <Button
                      center
                      round
                      style={{ width: 'auto', paddingHorizontal: 20 }}
                      color="rgb(0, 177, 238)"
                      onPress={() => setFieldTouched('email')
                        && setFieldTouched('password')
                        && validateForm().then(() => {
                          console.log(touched);
                          console.log(errors);
                          if (
                            errors.password === undefined
                            && errors.email === undefined
                          ) {
                            Keyboard.dismiss();
                            submitLogin(values);
                          }
                        })}
                      icon="unlock"
                      iconFamily="antdesign"
                      title="Login"
                    >
                      Login
                    </Button>
                  </Block>
                  <Block flex={2.25} right>
                    <Button
                      center
                      round
                      style={{ width: 'auto', paddingHorizontal: 20 }}
                      color="transparent"
                      onPress={() => setFieldTouched('email')
                        && setFieldTouched('password')
                        && validateForm().then(() => {
                          if (
                            touched.email
                            && touched.password
                            && errors.password === undefined
                            && errors.email === undefined
                          ) {
                            Keyboard.dismiss();
                            submitRegister(values);
                          }
                        })}
                      title="Register"
                    >
                      <Text style={{ color: 'rgb(0, 177, 238)' }}>
                        Dont already have an account? Tap to register.
                      </Text>
                    </Button>
                  </Block>
                </Block>
              </Block>
            )}
          </Formik>
        </Block>
      </Block>
    </ImageBackground>
  );
}

Login.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func.isRequired })
    .isRequired,
};

StyleSheet.create({
  buttonRow: {
    marginTop: 10,
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  form: {
    flex: 1,
    width: '80%',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
