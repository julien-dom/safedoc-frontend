import { TouchableOpacity, SafeAreaView, StyleSheet, Text, View, Linking, ScrollView } from 'react-native';
import Header from '../components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUserDoctor } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { Button } from 'react-native-paper';
import { useSelector } from 'react-redux';
import Tag from '../components/Tag';
import { useState } from 'react';
import { separateWords } from "../utils/utils";
import ModalNoAccount from '../components/ModalNoAccount';
import PressableButton from '../components/PressableButton';

export default function DoctorInfoScreen({ navigation, route: {params: props} }) {
// Etat local pour Modal
const [modalVisible, setModalVisible] = useState(false);

// UseSelector pour recuperer user reducer
const user = useSelector((state) => state.user.value);

console.log('props is ', props)
// Useselector Doctor pour recuperer info dans reducer doctor
const doctor = useSelector((state) => state.doctor.value);

// Fonction pour lien Doctolib
const doctolibPress = () => {
  Linking.openURL('https://www.doctolib.fr');
}

// Map pour recuperer tags
const tags = props.tags.map((data, i) => {
  console.log('map tags is', data)
  return (
    <TouchableOpacity key={i}>
      <Tag  name={data} />
    </TouchableOpacity>
  );
});
      
// Fonction Retour page Login
const handlePressLogin = () => {
    setModalVisible(!modalVisible)
    navigation.navigate('SignUp')
}

// Fonction Press pour page recommandation
const handleRecoPress = () => {
  console.log('clic reco tags')
  if (user.token){
    navigation.navigate('QuizRecoTags', {...props})
  } else {
    setModalVisible(true)
  }
}

return (
<SafeAreaView style={styles.container}>
  <View style={styles.keyContainer}>
    <Header navigation={navigation}/>
    <View style={styles.userLogoContainer}>
      <FontAwesomeIcon  icon={ faUserDoctor } size={60} color={'black'}  />
      <View style={styles.userNameContainer}>
        <Text style={styles.h1}>Dr {props.firstname} {props.lastname}</Text>
        <TouchableOpacity>
          <FontAwesomeIcon 
          icon={ faPenToSquare }  
          size={14} 
          color={'black'}
          />
        </TouchableOpacity>
      </View>
    </View>

    <View style={styles.textInfosContainer}>
      <View style={styles.textInfosAddress}>
        <Text style={styles.h3}>Spécialité(s):</Text>
        <Text style={styles.h3Justify}>{separateWords(props.specialties)}</Text>
      </View>

      <View style={styles.textInfosAddress}>
        <Text style={styles.h3}>Adresse:</Text>
        <Text style={styles.h3Justify}>{props.address}</Text>
      </View>

      <View style={styles.textInfos}>
        <Text style={styles.h3}>Téléphone:</Text>
        <Text style={styles.h3}>{props.phone}</Text>
      </View>

      <View style={styles.textInfos}>
        <Text style={styles.h3}>Email:</Text>
        <Text style={styles.h3}>{props.email}</Text>
      </View>

      <View style={styles.textInfos}>
        <Text style={styles.h3}>Secteur:</Text>
        <Text style={styles.h3}>{props.sector.description}</Text>
      </View>

      <View style={styles.textInfos}>
        <Text style={styles.h3}>Langues:</Text>
        <Text style={styles.h3}>{separateWords(props.languages)}</Text>
      </View>
    </View>

    <Button 
    icon="link" 
    mode="elevated" 
    onPress={doctolibPress}
    contentStyle={{width: 320, borderRadius: 20, }}
    labelStyle={{color: '#2D0861', fontFamily: 'Greycliff-Bold', fontSize: 16, letterSpacing: 0.25, fontWeight: 600
    }}
    >
    Lien Doctolib
    </Button>

    <Text style={styles.h5}>Recommandé.e par: 3 membres</Text>

    <View style={{flexDirection: 'row'}}>
      <ScrollView contentContainerStyle={styles.tagsContainer} horizontal={true}>
      {tags}
      </ScrollView>
    </View>

    <PressableButton 
      title='Recommander'
      onPress={handleRecoPress}
      marginBottom="30px"
    />

    <ModalNoAccount visible={modalVisible} onClose={() => setModalVisible(false)} onLogin={handlePressLogin} text={"Recommander un.e doc"}/>
  </View>
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
      // alignItems: 'center',
    },

    keyContainer: {
      backgroundColor: 'white',
      height: '100%',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  
    userLogoContainer: {
      alignItems: 'center'
    },

    userNameContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 10
    },

    textInfosContainer: {
      width: '100%',
      paddingLeft: 30,
      paddingRight: 30,
    },

    textInfos: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 15
   },

   deleteContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
   },

  h1: {
    fontFamily: 'Greycliff-Bold', 
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: 34,
    lineHeight: 41,
    display: 'flex',
    alignItems: 'center',
    marginRight: 20,
},

  h3: {
    fontFamily: 'Greycliff-Bold',
    fontWeight: 600,
    fontSize: 16,
    lineHeight: 19,
    display: 'flex',
    alignItems: 'center',
    letterSpacing: 0.25,
  },

  h5: {
    color: '#2D0861',
    fontFamily: 'Greycliff-Bold',
    fontWeight: 600,
    fontSize: 14,
    lineHeight: 19,
    letterSpacing: 0.25,
    marginRight: 20,
  },

  tagsContainer: {
    paddingLeft: 30,
    paddingRight: 30,
    display: 'flex',
    flexDirection: 'row',
  }, 

  textInfosAddress:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    width: '100%'
  }, 

  h3Justify:{
    fontFamily: 'Greycliff-Bold',
    fontWeight: 600,
    fontSize: 16,
    display: 'flex',
    alignContent: 'flex-end',
    alignItems: 'center',
    width: 180,
    textAlign: 'right'
  },

  });