import { TouchableOpacity, StyleSheet, Text, View, KeyboardAvoidingView, SafeAreaView, ScrollView, ImageBackground } from 'react-native';
import React, { useEffect, useState } from 'react';
import { TextInput, useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import MultiSelectComponent from '../components/MultiselectComponent';
import Header from '../components/Header';
import { Dropdown } from 'react-native-element-dropdown';
import { addDocToReducer } from '../reducers/doctor';
import PressableButton from '../components/PressableButton';

export default function AddDocScreen({ navigation }) {

//FONCTIONS LIEES AU BOUTON ////////////////////////////////////////////////////////////////////////
// Etat pour changer couleur du bouton Touchable Opacity quand on clique dessus
const [isPressed, setIsPressed] = useState(false);

// Regex email
const PHONE_REGEX = /^(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/;

// Dispatch pour reducer login
const dispatch = useDispatch();

//récupération des infos doctor depuis le Reducer pour les compléter
const doctor = useSelector((state) => state.doctor.value);

// Local States pour les valeurs des docs a ajouter
  const [docLastName, setDocLastName] = useState(doctor.lastname);
  const [docFirstName, setDocFirstName] = useState(doctor.firstname);
  const [docEmail, setDocEmail] = useState(doctor.email);
  const [docPhoneNbr, setDocPhoneNbr] = useState('');
  const [docAddress, setDocAddress] = useState('');
  const [addressToDisplay,setAddressToDisplay] = useState(null)
  const [suggestions, setSuggestions]= useState([{label:'', value:0, lat:0, lon:0}]);
  const [docLat, setDocLat] = useState (null);
  const [docLon, setDocLon] = useState (null)
  const [docSector, setDocSector] = useState({label: '',value: null});

  const [newDoc, setNewDoc]=useState({});



const handleCreation = (key, value) => {
      setNewDoc({...newDoc, [key]: value})
  };

//Variable vérifiant si il y a des inputs manquantes
let missingInputs = true;
if (docFirstName==='' || docLastName === '' || docEmail === '' || docPhoneNbr === '' || docAddress === '' || docLat === '' || docLon === '' || docSector === '' || newDoc === {}){
  missingInputs = true 
} else { missingInputs = false } 

// Fonction lors du clic sur bouton ajouter les infos supplémentaires au réducer
const handlePress = () => {
  console.log('click detected')
  console.log('MISSING INPUTS STATUS = ', missingInputs)
  if (missingInputs === false){
    if (PHONE_REGEX.test(docPhoneNbr)){
      dispatch(addDocToReducer(({
        firstname: docFirstName,
        lastname: docLastName,
        email: docEmail,
        phone: docPhoneNbr, 
        address: docAddress,
        latitude: docLat,
        longitude: docLon, 
        sector: docSector,
        specialties: newDoc.specialties,
        languages: newDoc.languages,
       })))
            setDocFirstName('');
            setDocLastName('');
            setDocEmail('');
            setDocPhoneNbr('');
            setDocAddress('');
            setAddressToDisplay('');
            setDocLon(''),
            setDocLat('');
            setDocSector('');
            setNewDoc({}); 
            navigation.navigate('QuizTags')
    } else {
      alert(`Le numéro de téléphone n'a pas le bon format`)
    }
  } else {alert(`Merci de remplir tous les champs`)}
}

// États pour GET les tables de références et mapper 
const [sectorsList, setSectorsList] = useState([]);
const [specialtiesList, setSpecialtiesList] = useState([]);
const [languagesList, setLanguagesList] = useState([]);

//USEEFFECT
useEffect(() => {
  //GET la table de référence SECTORS au chargement de la page
  fetch(`https://safedoc-backend.vercel.app/sectors`)
    .then((response) => response.json())
    .then((data) => {
      setSectorsList([...data.sectors]);
      });
  //GET la table de référence SPECIALTIES au chargement de la page
  fetch(`https://safedoc-backend.vercel.app/specialties`)
    .then((response) => response.json())
    .then((data) => {
      setSpecialtiesList([...data.specialties]);
      });
  //GET la table de référence LANGUAGES au chargement de la page
  fetch(`https://safedoc-backend.vercel.app/languages`)
    .then((response) => response.json())
    .then((data) => {
      setLanguagesList([...data.languages]);
      });
}, []);


//Map des SECTORS permet de mettre au format attendu par les composants (label et value sont obligatoires)
const sectors = sectorsList.map((data, i) => {
  return (
    {label: data.description, value: data.value}
  );
});

//Map des SPECIALTIES permet de mettre au format attendu par les composants (label et value sont obligatoires)
const specialties = specialtiesList.map((data, i) => {
  return (
    { label: data.value, value: i }
  );
});
// console.log('Specialties are',specialties)

//Map des LANGUAGES permet de mettre au format attendu par les composants (label et value sont obligatoires)
const languages = languagesList.map((data, i) => {
  return (
    { label: data.value, value: i }
  );
});
// console.log('languages are',languages)

//DROPDOWN////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const [addressIsFocus, setAddressIsFocus] = useState(false);
const [sectorIsFocus, setSectorIsFocus] = useState(false);

//Fonction style des Dropdown (nom bordure)
const renderLabelSector = () => {
  if (sectorIsFocus) {
    return (
      <Text style={[styles.label, sectorIsFocus && { color: '#652CB3' }]}>
        Conventionnement :
      </Text>
    );
  }
  return null;
};

const renderLabelAddress = () => {
  if (docAddress || addressIsFocus) {
    return (
      <Text style={[styles.label, addressIsFocus && { color: '#652CB3' }]}>
        Adresse :
      </Text>
    );
  }
  return null;
};

// Pour customiser theme des inputs react native paper (fonfamily)
const theme = useTheme();	


return (
  <SafeAreaView style={styles.container}>
    <ImageBackground 
    source={require('../assets/background-pinkgradient.jpeg')} 
    style={styles.gradientContainer}
    >
      <Header navigation={navigation}/>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyContainer}>
        
        <Text style={styles.h1}>Enregistrer un.e doc</Text>
        <View style={styles.scrollContain}>
          <ScrollView>

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

            {/* INPUT PHONE */}
            <TextInput
            theme={{
            fonts: { bodyLarge: { ...theme.fonts.bodyLarge, fontFamily: "Greycliff-Regular" } },
            }}
            style={styles.TextInput}
            mode="outlined"
            label="Téléphone"
            placeholder="Téléphone"
            onChangeText={(value) => setDocPhoneNbr(value)}
            value={docPhoneNbr}
            //test css
            textColor= 'black'
            activeOutlineColor= '#652CB3'
            selectionColor= '#652CB3'
            keyboardType="phone-pad"
            />

            {/* DROPDOWN ADRESS */}
            <View style={styles.dropdownContainer}>
            {renderLabelAddress()}
            <Dropdown
            style={[styles.dropdown, addressIsFocus && { fontFamily: "Greycliff-Regular" , borderColor: '#2D0861' }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            itemTextStyle={styles.inputTextStyle}
            activeColor= '#E9D3F1'
            data={suggestions}
            search
            maxHeight={300}
            value = {addressToDisplay}
            labelField="label"
            valueField="value"
            placeholder={!addressIsFocus ? 'Adresse' : '...'}
            searchPlaceholder="Entrez l'adresse :"
            onFocus={() => setAddressIsFocus(true)}
            onBlur={() => setAddressIsFocus(false)}
            onChangeText={(item) => {
            setAddressIsFocus(false);
            fetch(`https://safedoc-backend.vercel.app/doctors/search/address`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ address : item }),
            }).then(response => response.json())
            .then(data => {
              if (data.result){let formattedData = data.results.map((place,i)=>{
                return {label : place.address, value: i, 
                  lat: place.latitude, 
                  lon: place.longitude
                }
              })
              setSuggestions([...formattedData])}
            } )
            }}
            onChange = {(item) => {
              setAddressToDisplay(item.value);
              setDocAddress(item.label);
              setDocLat(item.lat);
              setDocLon(item.lon)
              setAddressIsFocus(false);
            }
            }
            /> 
            </View>

            {/* DROPDOWN SECTOR */}
            <View style={styles.dropdownContainer}>
            {renderLabelSector()}
            <Dropdown
            style={[styles.dropdown, sectorIsFocus && { fontFamily: "Greycliff-Regular" , borderColor: '#2D0861' }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            itemTextStyle={styles.inputTextStyle}
            activeColor= '#E9D3F1'
            data={sectors}
            maxHeight={300}
            value = {docSector.value}
            labelField="label"
            valueField="value"
            placeholder={!sectorIsFocus ? 'Conventionnement' : '...'}
            searchPlaceholder="Niveau de conventionnement :"
            onFocus={() => setSectorIsFocus(true)}
            onBlur={() => setSectorIsFocus(false)}
            onChange={item => {
            setDocSector({label: item.label , value: item.value});
            setSectorIsFocus(false);
            } }
            /> 
            </View>

            {/* MULTISELECT COMPONENT : SPECIALTIES*/}
            <MultiSelectComponent 
            data = {specialties} 
            placeholder = {"Spécialité(s)"} 
            labelField ={"label"}
            valueField ={"value"}
            searchPlaceholder= {"Spécialité(s)"}
            handleCreation = {handleCreation}
            dataKey = {'specialties'}
            />

            {/* MULTISELECT COMPONENT : LANGUAGES*/}
            <MultiSelectComponent 
            data = {languages} 
            placeholder = {"Langue(s)"} 
            labelField ={"label"}
            valueField ={"value"}
            searchPlaceholder= {"Langue(s)"}
            handleCreation = {handleCreation}
            dataKey = {'languages'}
            />

            <TouchableOpacity
            title="Go to Quiz"
            style={[
            styles.mediumbtn,
            isPressed && { marginBottom: 0 }
            ]}
            onPress={handlePress}
            >
            <Text style={styles.h3white}>Continuer</Text>
            </TouchableOpacity> 

          </ScrollView>   
        </View>

      </KeyboardAvoidingView>
    </ImageBackground>
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2D0861',
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
    flex: 1,
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
scrollContain: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: 320,
    paddingTop: '5%',
    paddingBottom: 40,
    height: '80%',
    marginTop: '5%',
    marginBottom: '10%',
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

mediumbtn: {
    marginTop: '30%',
    alignItems: 'center',
    alignSelf : 'center',
    justifyContent: 'center',
    bottom: 40,
/* Purple */
    backgroundColor: '#652CB3',
    width: 182,
    height: 68,
    borderRadius: 20,
/* Shadow Boutons */
    shadowColor: "#000000",
    shadowOffset: {
    width: 6,
    height: 6,
},
    shadowOpacity:  0.25,
    shadowRadius: 12,
    elevation: 12
},

h3white: {
    color: 'white',
    fontFamily: 'Greycliff-Regular',
    fontWeight: 600,
    fontSize: 20,
    lineHeight: 24,
},
dropdownContainer: {
  marginTop: 8,
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

inputSearchStyle: {
  height: 40,
  fontSize: 16,
},

//DROPDOWN STYLE
dropdown: {
  fontFamily: "Greycliff-Regular",
  width: '100%',
  height: 50,
  borderColor: 'black',
  borderWidth: 0.84,
  borderRadius: 4,  
  paddingHorizontal: 14,
  backgroundColor: '#fdfbfc',
  marginBottom: 14,
},

placeholderStyle: {
  fontSize: 16,
  fontFamily: "Greycliff-Regular",
  color: '#262626' 
},
selectedTextStyle: {
  fontFamily: 'Greycliff-Regular',
  fontSize: 16,
},
itemTextStyle: {
  fontFamily: "Greycliff-Regular",
},
inputTextStyle: {
  fontFamily: "Greycliff-Regular",
},

});