import React, {useEffect, useState} from 'react';
import Background from '../components/Background';
import BackButton from '../components/BackButton';
import Logo from '../components/Logo';
import Header from '../components/Header';
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import {emailValidator} from '../../controllers/validators/emailValidator';
import {useSelector} from 'react-redux';
import {selectLanguage} from '../../controllers/redux/selector';
import Language_En from '../../controllers/mock/Language_En';
import Language_Vn from '../../controllers/mock/Language_Vn';

export default function ResetPasswordScreen({navigation}) {
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
  const [email, setEmail] = useState({value: '', error: ''});

  const sendResetPasswordEmail = () => {
    const emailError = emailValidator(email.value);
    if (emailError) {
      setEmail({...email, error: emailError});
      return;
    }
    navigation.navigate('LoginScreen');
  };

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>{textValue.restorepass}</Header>
      <TextInput
        label={textValue.email}
        returnKeyType="done"
        value={email.value}
        onChangeText={text => setEmail({value: text, error: ''})}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
        description={textValue.desrestore}
      />
      <Button
        mode="contained"
        onPress={sendResetPasswordEmail}
        style={{marginTop: 16}}>
        {textValue.sendrestore}
      </Button>
    </Background>
  );
}
