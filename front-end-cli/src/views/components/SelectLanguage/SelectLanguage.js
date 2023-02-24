import {StyleSheet, View} from 'react-native';
import React from 'react';
import {SelectList} from 'react-native-dropdown-select-list';
import {useDispatch, useSelector} from 'react-redux';
import {selectLanguage} from '../../../controllers/redux/selector';
import selectLanguageSlice from './selectLanguageSlice';

export default function SelectLanguage() {
  const dispath = useDispatch();
  const valueText = useSelector(selectLanguage);

  const lang = [
    {key: 'en', value: 'English'},
    {key: 'vn', value: 'Vietnamese'},
  ];

  const handelSelectLanguage = val => {
    dispath(selectLanguageSlice.actions.changeSelectLanguage(val));
  };

  return (
    <View style={styles.dropdown}>
      <SelectList
        data={lang}
        setSelected={val => handelSelectLanguage(val)}
        placeholder={valueText.selectlanguage}
        boxStyles={{backgroundColor: '#E8F0FE'}}
        dropdownStyles={{backgroundColor: '#9cb0d3'}}
        dropdownItemStyles={{marginHorizontal: 10}}
        dropdownTextStyles={{color: 'black'}}
        maxHeight={100}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    width: 300,
  },
});
