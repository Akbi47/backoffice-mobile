import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

GoogleSignin.configure({
  webClientId:
    '576065901925-hqrkmfq8v7e308bug2kpskrqemarafc7.apps.googleusercontent.com',
});

const LoginGoogle = ({navigation}) => {
  const [activeLogin, setActiveLogin] = React.useState(true);

  const googleSigIn = async () => {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });

      await (activeLogin && GoogleSignin.revokeAccess());
      // const userInfo = await GoogleSignin.signIn();
      const {idToken} = await GoogleSignin.signIn();
      // // // // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      // // // Sign-in the user with the credential
      const res = await auth().signInWithCredential(googleCredential);
      const assetToken = await (await GoogleSignin.getTokens()).accessToken;

      console.log(res);
      console.log(assetToken);
      setActiveLogin(true);
      alert('You are logged in.');
      navigation.reset({
        index: 0,
        routes: [{name: 'Dashboard'}],
      });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // GoogleSignin.configure();
        setActiveLogin(false);
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        alert('2');
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        alert('3');
        // play services not available or outdated
      } else {
        // some other error happened
        alert(error);
        GoogleSignin.signOut();
      }
    }
  };

  return (
    <GoogleSigninButton
      style={{width: 192, height: 48}}
      size={GoogleSigninButton.Size.Wide}
      color={GoogleSigninButton.Color.Dark}
      onPress={googleSigIn}
      //   disabled={this.state.isSigninInProgress}
    />
  );
};

export default LoginGoogle;

const styles = StyleSheet.create({});
