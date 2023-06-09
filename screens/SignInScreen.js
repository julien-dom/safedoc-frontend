import { TouchableOpacity, StyleSheet, Text, View, KeyboardAvoidingView, SafeAreaView, ImageBackground } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import React, { useState } from 'react';
import { TextInput, useTheme } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/user';
import PressableButton from '../components/PressableButton';

export default function SignInScreen({ navigation }) {
// Dispatch pour reducer login
const dispatch = useDispatch();

// Local States pour les valeurs des 3 Input de SignUp
const [usernameOrEmail, setUsernameOrEmail] = useState('');
const [password, setPassword] = useState('');

// Local States pour wrong email or username
const [wrongEmailorUser, setWrongEmailOrUser] = useState(false);

// Local States pour oeil du password
const [secureTextEntry, setSecureTextEntry] = useState(true);

// Fonction lors du clic sur bouton
const handlePress = () => {
  console.log('click detected')
  fetch('https://safedoc-backend.vercel.app/users/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usernameOrEmail, password }),
      }).then(response => response.json())
        .then(data => {
          console.log('data is', data)
          if (data.result) {
            setWrongEmailOrUser(false)
            dispatch(login(({ token: data.token, username: data.username, email: data.email, orientation: data.orientation, gender: data.gender })))
            setUsernameOrEmail('');
            setPassword('');
            navigation.navigate('Home')
          } else {
            setWrongEmailOrUser(true)
            // alert(`Identifiant ou mot de passe incorrect`)
          }
  });
};

// Pour customiser theme des inputs react native paper (fonfamily)
const theme = useTheme();	

return (
  <SafeAreaView style={styles.container}>
    <ImageBackground 
    source={require('../assets/background-pinkgradient.jpeg')} 
    style={styles.gradientContainer}
    >

    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyContainer}>
          <TouchableOpacity style={styles.angleLeft} onPress={() => navigation.goBack()}>
            <FontAwesome name={'angle-left'} size={40} color={'#652CB3'} title="Go back" />
          </TouchableOpacity>

            <Text style={styles.h1}>Connexion</Text>

            <View style={styles.inputContainer}>

              {/* INPUT Username or Email */}
              <TextInput
                   theme={{
                    fonts: { bodyLarge: { ...theme.fonts.bodyLarge, fontFamily: "Greycliff-Regular" } },
                     }}
                style={styles.TextInput}
                mode="outlined"
                label="Username or Email"
                placeholder="Type your username or email"
                onChangeText={(value) => setUsernameOrEmail(value)}
                value={usernameOrEmail}
                //test css
                textColor= 'black'
                activeOutlineColor= '#652CB3'
                selectionColor= '#652CB3'
                keyboardType="email-address"
              />

              {/* INPUT Password */}
              <TextInput
                theme={{
                 fonts: { bodyLarge: { ...theme.fonts.bodyLarge, fontFamily: "Greycliff-Regular" } },
                  }}
                style={styles.TextInput}
                mode="outlined"
                label="Password"
                placeholder="Type your password"
                secureTextEntry={secureTextEntry}
                onChangeText={(value) => setPassword(value)}
                value={password}
                //test css
                fontFamily= 'Greycliff-Regular'
                textColor= 'black'
                activeOutlineColor= '#652CB3'
                selectionColor= '#652CB3'
                right={<TextInput.Icon 
                  icon="eye" 
                  onPress={() => {
                    setSecureTextEntry(!secureTextEntry);
                    return false;
                  }}
                  />}
              />

            {wrongEmailorUser && 
            <View style={styles.errorBackground}>
            <Text style={styles.error}>Identifiant ou mot de passe incorrect</Text></View>
            }

            </View>

        

            <PressableButton 
              title='Continuer'
              onPress={handlePress}
            />

        </KeyboardAvoidingView>
        </ImageBackground>
      </SafeAreaView>
      );
}

const styles = StyleSheet.create({
  container: {
      backgroundColor: '#2D0861',
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
  },
  gradientContainer: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  keyContainer: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  angleLeft: {
    position: 'absolute',
    left: 30
  },

h1: {
    color: '#2D0861',
    marginTop: 50,
    fontFamily: 'Greycliff-Bold', 
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: 34,
    lineHeight: 41,
},

inputContainer: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '90%',
    paddingTop: '5%',
    paddingBottom: '5%',
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
},
TextInput: {
  marginBottom: 10,
},

h3:{
  fontFamily: 'Greycliff-Regular',
  fontWeight: 600,
  fontSize: 20,
},

h3white: {
    color: 'white',
    fontFamily: 'Greycliff-Regular',
    fontWeight: 600,
    fontSize: 20,
    lineHeight: 24,
},

error: {
  fontFamily: 'Greycliff-Light', 
  color: '#a4001d',
  fontSize: 16
},

errorBackground: {
  borderColor: '#a4001d',
  backgroundColor: '#ffe6e9',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderWidth: 1,
  borderRadius: 10,
  height: 40,
  marginBottom: 10,
}
});