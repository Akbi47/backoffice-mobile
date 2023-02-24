import React, {useEffect, useState} from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import Paragraph from '../components/Paragraph';
import {useSelector} from 'react-redux';
import {selectLanguage} from '../../controllers/redux/selector';
import Language_En from '../../controllers/mock/Language_En';
import Language_Vn from '../../controllers/mock/Language_Vn';
import LoginGoogle from './auth/LoginGoogle';

export default function StartScreen({navigation}) {
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
  return (
    <Background>
      <Logo />
      <Header>{textValue.logintemplate}</Header>
      <Paragraph>BACK OFFICE</Paragraph>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('LoginScreen')}>
        {textValue.login}
      </Button>
      <Button
        mode="elevated"
        onPress={() => navigation.navigate('LoginFbScreen')}>
        Login with Facebook
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('RegisterScreen')}>
        {textValue.signup}
      </Button>
      <LoginGoogle navigation={navigation} />
    </Background>
  );
}
