import React, {useState, useEffect} from 'react';
import {SelectList} from 'react-native-dropdown-select-list';
// import {LoginButton, AccessToken} from 'react-native-fbsdk-next';
import {TouchableOpacity, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import {theme} from '../../assets/css/theme';
import {passwordValidator} from '../../controllers/validators/passwordValidator';
import {useSelector} from 'react-redux';
import {selectLanguage} from '../../controllers/redux/selector';
import SelectLanguage from '../components/SelectLanguage/SelectLanguage';
import Language_En from '../../controllers/mock/Language_En';
import Language_Vn from '../../controllers/mock/Language_Vn';

export default function LoginScreen({navigation}) {
  const activeLanguage = useSelector(selectLanguage);
  const [textValue, setTextValue] = useState(Language_En[0]);

  useEffect(() => {
    if (activeLanguage === 'en') {
      setTextValue(Language_En[0]);
    } else {
      setTextValue(Language_Vn[0]);
    }
  }, [activeLanguage]);

  const [username, setUsername] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});

  const passwordError = passwordValidator(password.value);

  const onLoginPressed = () => {
    const formdata = new FormData();

    formdata.append('username', username.value);
    formdata.append('password', password.value);
    fetch('https://khongcotien.top/restlogin', {
      method: 'POST',
      body: formdata,
    })
      .then(response => {
        response.json();
        console.log(response);
        if (!passwordError && response.status === 200) {
          alert(textValue.loginsuccess);
          navigation.reset({
            index: 0,
            routes: [{name: 'Dashboard'}],
          });
        } else if (passwordError) {
          setPassword({...password, error: passwordError});
        } else {
          alert(response.status);
        }
      })
      .catch(error => {
        console.error(error);
        alert(textValue.loginunsuccess);
      });
  };

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>BACKOFFICE</Header>
      <TextInput
        label={textValue.user}
        returnKeyType="next"
        value={username.value}
        onChangeText={text => setUsername({value: text, error: ''})}
        error={!!username.error}
        errorText={username.error}
        autoCapitalize="none"
        autoCompleteType="username"
        textContentType="usernameAddress"
        keyboardType="username-address"
      />
      <TextInput
        label={textValue.pass}
        returnKeyType="done"
        value={password.value}
        onChangeText={text => setPassword({value: text, error: ''})}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <View style={styles.dropdown}>
        <SelectLanguage />
      </View>
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ResetPasswordScreen')}>
          <Text style={styles.forgot}>{textValue.forgotpass}</Text>
        </TouchableOpacity>
      </View>
      <Button mode="contained" onPress={onLoginPressed}>
        {textValue.login}
      </Button>
      <View style={styles.row}>
        <Text>{textValue.notaccount} </Text>
        <TouchableOpacity onPress={() => navigation.replace('RegisterScreen')}>
          <Text style={styles.link}> {textValue.signup}</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  view_fb_button: {
    width: 300, // whatever you want
    height: 50, // whatever you want
    justifyContent: 'center', // center the button
    backgroundColor: '#1A77F2', // the same as the actual button
    paddingHorizontal: 10, // optionally add some horizontal padding for better looking
    borderRadius: 15,
  },
  fb_button: {
    flex: 1, // fill the container
    maxHeight: 30, // the default height
  },
  dropdown: {
    width: 300,
  },
  description: {
    fontSize: 13,
    color: theme.colors.secondary,
    paddingTop: 8,
  },

  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
    marginTop: 10,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});
