import React, {useEffect, useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Text} from 'react-native-paper';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import {theme} from '../../assets/css/theme';
import {emailValidator} from '../../controllers/validators/emailValidator';
import {passwordValidator} from '../../controllers/validators/passwordValidator';
import {nameValidator} from '../../controllers/validators/nameValidator';
import {selectLanguage} from '../../controllers/redux/selector';
import {useSelector} from 'react-redux';
import Language_En from '../../controllers/mock/Language_En';
import Language_Vn from '../../controllers/mock/Language_Vn';

export default function RegisterScreen({navigation}) {
  const activeLanguage = useSelector(selectLanguage);
  const [textValue, setTextValue] = useState(Language_En[0]);

  useEffect(() => {
    console.log(activeLanguage);
    if (activeLanguage === 'en') {
      setTextValue(Language_En[0]);
    } else {
      setTextValue(Language_Vn[0]);
    }
  }, [activeLanguage]);

  const [name, setName] = useState({value: '', error: ''});
  const [email, setEmail] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});

  const onSignUpPressed = () => {
    const nameError = nameValidator(name.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError || nameError) {
      setName({...name, error: nameError});
      setEmail({...email, error: emailError});
      setPassword({...password, error: passwordError});
      return;
    }
    navigation.reset({
      index: 0,
      routes: [{name: 'Dashboard'}],
    });
  };

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>{textValue.createacc}</Header>
      <TextInput
        label={textValue.name}
        returnKeyType="next"
        value={name.value}
        onChangeText={text => setName({value: text, error: ''})}
        error={!!name.error}
        errorText={name.error}
      />
      <TextInput
        label={textValue.user}
        returnKeyType="next"
        value={email.value}
        onChangeText={text => setEmail({value: text, error: ''})}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
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
      <Button
        mode="contained"
        onPress={onSignUpPressed}
        style={{marginTop: 24}}>
        {textValue.signup}
      </Button>
      <View style={styles.row}>
        <Text>{textValue.avaiacc}</Text>
        <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
          <Text style={styles.link}> {textValue.login}</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});
