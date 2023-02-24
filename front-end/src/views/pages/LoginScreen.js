import React, { useState } from 'react'
import { SelectList } from 'react-native-dropdown-select-list'
import { TouchableOpacity, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../../assets/css/theme'
import { emailValidator } from '../../controllers/validators/emailValidator'
import { passwordValidator } from '../../controllers/validators/passwordValidator'

// Setting the facebook app id using setAppID
// Remember to set CFBundleURLSchemes in Info.plist on iOS if needed

export default function LoginScreen({ navigation }) {
  // Settings.setAppID('APP ID')
  const [username, setUsername] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [selected, setSelected] = useState('')
  const lang = [
    { key: '1', value: 'English' },
    { key: '2', value: 'Vietnamese' },
  ]
  const passwordError = passwordValidator(password.value)

  const onLoginPressed = () => {
    const formdata = new FormData()

    formdata.append('username', username.value)
    formdata.append('password', password.value)
    fetch('https://khongcotien.top/restlogin', {
      method: 'POST',
      // headers: {
      //   'Content-Type': 'multipart/form-data',
      // },
      body: formdata,
    })
      .then((response) => {
        response.json()
        console.log(response)
        if (!passwordError && response.status === 200) {
          alert('You are logged in.')
          navigation.reset({
            index: 0,
            routes: [{ name: 'Dashboard' }],
          })
        } else if (passwordError) {
          setPassword({ ...password, error: passwordError })
        } else {
          alert(response.status)
        }
      })
      .catch((error) => {
        console.error(error)
        alert('Please check your login information.')
      })
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <LoginButton
        onLoginFinished={(error, result) => {
          if (error) {
            console.log('login has error: ' + result.error)
          } else if (result.isCancelled) {
            console.log('login is cancelled.')
          } else {
            AccessToken.getCurrentAccessToken().then((data) => {
              console.log(data.accessToken.toString())
            })
          }
        }}
        onLogoutFinished={() => console.log('logout.')}
      />
      <Logo />
      <Header>BACKOFFICE</Header>
      <TextInput
        label="Username"
        returnKeyType="next"
        value={username.value}
        onChangeText={(text) => setUsername({ value: text, error: '' })}
        error={!!username.error}
        errorText={username.error}
        autoCapitalize="none"
        autoCompleteType="username"
        textContentType="usernameAddress"
        keyboardType="username-address"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <View style={styles.dropdown}>
        <SelectList
          data={lang}
          setSelected={(val) => setSelected(val)}
          placeholder="Select Language"
          boxStyles={{ backgroundColor: '#E8F0FE' }}
          dropdownStyles={{ backgroundColor: '#9cb0d3' }}
          dropdownItemStyles={{ marginHorizontal: 10 }}
          dropdownTextStyles={{ color: 'black' }}
          maxHeight={100}
        />
      </View>
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ResetPasswordScreen')}
        >
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
      <Button mode="contained" onPress={onLoginPressed}>
        Login
      </Button>
      <View style={styles.row}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('RegisterScreen')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
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
})
