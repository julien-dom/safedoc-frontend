import { TouchableOpacity, StyleSheet, Text, View, KeyboardAvoidingView, SafeAreaView, ImageBackground } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextInput, useTheme } from 'react-native-paper';
import { login } from '../reducers/user';
import PressableButton from '../components/PressableButton';

export default function SignUpScreen({ navigation }) {
// Dispatch pour reducer login
const dispatch = useDispatch();

// Local States pour les valeurs des 3 Input de SignUp
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [email, setEmail] = useState('');

// Local States pour oeil du password
const [secureTextEntry, setSecureTextEntry] = useState(true);

// Etat pour changer couleur du bouton Touchable Opacity quand on clique dessus
const [isPressed, setIsPressed] = useState(false);

// Etat pour error email
const [emailError, setEmailError] = useState(false);
const [alreadyUsed, setAlreadyUsed] = useState(false);

// Regex email
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const handlePress = () => {
    console.log('click detected')
    if (EMAIL_REGEX.test(email)){
      fetch('https://safedoc-backend.vercel.app/users/signup/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, email }),
      }).then(response => response.json())
        .then(data => {
          console.log('data log up is', data)
          if (data.result) {
            setEmailError(false);
            setAlreadyUsed(false)
            dispatch(login(({ username, password, email })))
            setUsername('');
            setPassword('');
            setEmail(''); 
            navigation.navigate('QuizHome')
          } else {
            // alert(`L'email ou le pseudo est déjà utilisé`)
            setEmailError(false);
            setAlreadyUsed(true)
          }
        });
    } else {
      // alert(`L'email n'a pas le bon format`)
      setEmailError(true);
    }
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

      <Text style={styles.h1}>Inscription</Text>

      <View style={styles.inputContainer}>

        <TextInput
        theme={{
        fonts: { bodyLarge: { ...theme.fonts.bodyLarge, fontFamily: "Greycliff-Regular" } },
          }}
        style={styles.TextInput}
        mode="outlined"
        label="Pseudo de l'utilisateur.ice"
        placeholder="Entrez votre pseudo"
        onChangeText={(value) => setUsername(value)}
          value={username}
        //test css
        textColor= 'black'
        activeOutlineColor= '#652CB3'
        selectionColor= '#652CB3'
        />

        <TextInput
        theme={{
        fonts: { bodyLarge: { ...theme.fonts.bodyLarge, fontFamily: "Greycliff-Regular" } },
        }}
        style={styles.TextInput}
        mode="outlined"
        label="E-mail"
        placeholder="Entrez votre E-mail"
        onChangeText={(value) => setEmail(value)}
        value={email}
        textColor= 'black'
        activeOutlineColor= '#652CB3'
        selectionColor= '#652CB3'
        keyboardType="email-address"
        />

        {emailError && 
        <View style={styles.errorBackground}>
        <Text style={styles.error}>Le format de l'E-mail est invalide</Text></View>}


        <TextInput
        theme={{
        fonts: { bodyLarge: { ...theme.fonts.bodyLarge, fontFamily: "Greycliff-Regular" } },
        }}
        style={styles.TextInput}
        mode="outlined"
        label="Mot de passe"
        placeholder="Entrez votre mot de passe"
        onChangeText={(value) => setPassword(value)}
        value={password}
        secureTextEntry={secureTextEntry}
        //test css
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
        keyboardType="email-address"
        />

        {alreadyUsed && 
        <View style={styles.errorBackground}>
        <Text style={styles.error}>L'email ou le pseudo est déjà utilisé</Text></View>}        

        </View>

      {/* <TouchableOpacity
      title="Go to Quiz"
      style={[
      styles.mediumbtn,
      isPressed && { marginBottom: 0 }
      ]}
      onPress={handlePress}
      >
        <Text style={styles.h3white}>Continuer</Text>
      </TouchableOpacity> */}
      <PressableButton 
      title='Continuer'
      onPress={handlePress}
      marginBottom="40px"
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

