import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  LoginButton,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
} from 'react-native-fbsdk-next';

export default class LoginFbScreen extends Component {
  render() {
    let accessToken;
    return (
      <View style={styles.sectionContainer}>
        <LoginButton
          onLoginFinished={(error, result) => {
            if (error) {
              alert('login has error: ' + result.error);
            } else if (result.isCancelled) {
              alert('login is cancelled.');
            } else {
              alert('You are logged in.');
              this.props.navigation.reset({
                index: 0,
                routes: [{name: 'Dashboard'}],
              });
              AccessToken.getCurrentAccessToken().then(data => {
                console.log(data.accessToken.toString());
              });
              AccessToken.getCurrentAccessToken().then(data => {
                accessToken = data.accessToken;
                alert(accessToken.toString());
                const responseInfoCallback = (error, result) => {
                  if (error) {
                    console.log(error);
                    // alert('Error fetching data: ' + error.toString());
                  } else {
                    console.log(result);
                    // alert('Success fetching data: ' + result.toString());
                  }
                };

                const infoRequest = new GraphRequest(
                  '/me',
                  {
                    accessToken: accessToken,
                    parameters: {
                      fields: {
                        string: 'email,name,first_name,middle_name,last_name',
                      },
                    },
                  },
                  responseInfoCallback,
                );

                // Start the graph request.
                new GraphRequestManager().addRequest(infoRequest).start();
              });
            }
          }}
          onLogoutFinished={accessToken => {
            let logout = new GraphRequest(
              'me/permissions/',
              {
                accessToken: accessToken,
                httpMethod: 'DELETE',
              },
              (error, result) => {
                if (error) {
                  console.log('Error fetching data: ' + error.toString());
                } else {
                  LoginManager.logOut();
                  this.props.navigation.reset({
                    index: 0,
                    routes: [{name: 'LoginScreen'}],
                  });
                }
              },
            );
            new GraphRequestManager().addRequest(logout).start();
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
