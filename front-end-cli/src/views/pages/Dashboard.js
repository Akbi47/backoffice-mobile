import React, {useEffect, useState} from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import {useSelector} from 'react-redux';
import {selectLanguage} from '../../controllers/redux/selector';
import SelectLanguage from '../components/SelectLanguage/SelectLanguage';
import Language_En from '../../controllers/mock/Language_En';
import Language_Vn from '../../controllers/mock/Language_Vn';
import auth from '@react-native-firebase/auth';

export default function Dashboard({navigation}) {
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

  const googleSigout = async () => {
    auth()
      .signOut()
      .try(() => {
        alert('You are logout.');
      })
      .catch(e => alert(e.message));
  };

  return (
    <Background>
      <SelectLanguage />
      <Logo />
      <Header>{textValue.helloword}</Header>
      <Button
        mode="outlined"
        onPress={() => {
          googleSigout();
          navigation.reset({
            index: 0,
            routes: [{name: 'StartScreen'}],
          });
        }}>
        {textValue.logout}
      </Button>
    </Background>
  );
}
