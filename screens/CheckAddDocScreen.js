import { TouchableOpacity, StyleSheet, Text, View, KeyboardAvoidingView, SafeAreaView, ImageBackground } from 'react-native';
import React, { useState } from 'react';
import { TextInput, useTheme } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import Header from '../components/Header';
import { addDocToReducer } from '../reducers/doctor';
import PressableButton from '../components/PressableButton';

export default function CheckAddDocScreen({ navigation }) {

// Etat pour changer couleur du bouton Touchable Opacity quand on clique dessus
const [isPressed, setIsPressed] = useState(false);

// Regex email
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// Etat pour error email
const [emailError, setEmailError] = useState(false);

// Dispatch pour reducer login
  const dispatch = useDispatch();

// Local States pour les valeurs des docs a vérifier
  const [docLastName, setDocLastName] = useState('');
  const [docFirstName, setDocFirstName] = useState('');
  const [docEmail, setDocEmail] = useState('');
  
// Fonction lors du clic sur bouton Pour check si doc existant.e
const handlePress = () => {
  console.log('click detected')
  if (EMAIL_REGEX.test(docEmail)){
    fetch('https://safedoc-backend.vercel.app/doctors/add/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstname: docFirstName, lastname : docLastName, email: docEmail }),
    }).then(response => response.json())
      .then(data => {
        console.log('data log up is', data)
        if (data.result) {
          setEmailError(false);
          dispatch(addDocToReducer(({ firstname: docFirstName, lastname: docLastName, email: docEmail })))
          setDocFirstName('');
          setDocLastName('');
          setDocEmail(''); 
          navigation.navigate('AddDoc')
        } else {
          alert(`Ce médecin est déjà en base de donnée et nous attendons sa réponse.`)
        }
      });
  } else {
    setEmailError(true);
  }
}

// Pour customiser theme des inputs react native paper (fonfamily)
const theme = useTheme();	

return (
  <SafeAreaView style={styles.safeAreaView}>
    <ImageBackground 
    source={require('../assets/background-pinkgradient.jpeg')} 
    style={styles.gradientContainer}
    >   
    <Header navigation={navigation}/>

        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyContainer}>

          <Text style={styles.h1}>Enregistrer un.e doc</Text>

          <View style={styles.scrollContain}>
            {/* INPUT PRENOM */}
            <TextInput
            theme={{
            fonts: { bodyLarge: { ...theme.fonts.bodyLarge, fontFamily: "Greycliff-Regular" } },
            }}
            style={styles.TextInput}
            mode="outlined"
            label="Prénom"
            placeholder="Prénom"
            onChangeText={(value) => setDocFirstName(value)}
            value={docFirstName}
            //test css
            textColor= 'black'
            activeOutlineColor= '#652CB3'
            selectionColor= '#652CB3'
            />

            {/* INPUT NOM */}
            <TextInput
            theme={{
            fonts: { bodyLarge: { ...theme.fonts.bodyLarge, fontFamily: "Greycliff-Regular" } },
            }}
            style={styles.TextInput}
            mode="outlined"
            label="Nom de famille"
            placeholder="Nom de famille"
            onChangeText={(value) => setDocLastName(value)}
            value={docLastName}
            //test css
            textColor= 'black'
            activeOutlineColor= '#652CB3'
            selectionColor= '#652CB3'
            />

            {/* INPUT EMAIL */}
            <TextInput
            theme={{
            fonts: { bodyLarge: { ...theme.fonts.bodyLarge, fontFamily: "Greycliff-Regular" } },
            }}
            style={styles.TextInput}
            mode="outlined"
            label="E-mail"
            placeholder="E-mail"
            onChangeText={(value) => setDocEmail(value)}
            value={docEmail}
            //test css
            textColor= 'black'
            activeOutlineColor= '#652CB3'
            selectionColor= '#652CB3'
            keyboardType="email-address"
            /> 
            {emailError && <View style={styles.errorBackground}><Text style={styles.error}>Le format de l'E-mail est invalide</Text></View>}
          
          </View>

          <PressableButton 
            title='Vérifier'
            onPress={handlePress}
            marginBottom="100px"
          />

        </KeyboardAvoidingView>
    </ImageBackground>
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
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

  h1: {
    color: '#2D0861',
    marginTop: 50,
    fontFamily: 'Greycliff-Bold', 
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: 34,
    lineHeight: 41,
},
scrollContain: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: 320,
    paddingTop: '5%',
    paddingBottom: '5%',
    marginTop: '5%',
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

dropdownContainer: {
  marginTop: 9,
  marginBottom: 9,
},
//DROPDOWN STYLE
dropdown: {
  height: 50,
  borderColor: 'black',
  borderWidth: 0.8,
  borderRadius: 4,  
  paddingHorizontal: 14,
  backgroundColor: '#fdfbfc',
},
label: {
  position: 'absolute',
  backgroundColor: 'white',
  left: 5,
  top: -7,
  zIndex: 999,
  paddingHorizontal: 8,
  fontSize: 14,
  fontFamily: 'Greycliff-Regular',
},
placeholderStyle: {
  fontSize: 16,
},
selectedTextStyle: {
  fontFamily: 'Greycliff-Regular',
  fontSize: 16,
},
inputSearchStyle: {
  height: 40,
  fontSize: 16,
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
  padding: 10,
  flexWrap: 'wrap',
  width: '100%'
}
});