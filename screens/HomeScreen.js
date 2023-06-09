import { TouchableOpacity, SafeAreaView, StyleSheet, Text, View, ImageBackground } from 'react-native';
import HeaderHome from '../components/HeaderHome';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import ModalNoAccount from '../components/ModalNoAccount';
import { BigPressableButton } from '../components/PressableButton';

export default function HomeScreen({ navigation }) {
// UseSelector pour recuperer user reducer
const user = useSelector((state) => state.user.value);

// Etat local pour Modal
const [modalVisible, setModalVisible] = useState(false);
      
// Fonction Retour page Login
const handlePressLogin = () => {
  setModalVisible(!modalVisible)
  navigation.navigate('SignUp')
}

// Fonction press conditionné au reducer et au token (pour le clic sur bouton user)
const handlePress = () => {
  if (user.token){
  navigation.navigate('CheckAddDoc')
  } else {
   setModalVisible(true)
  }
}

return (
<SafeAreaView style={styles.safeAreaView}>

  <ImageBackground 
  source={require('../assets/background-rainbowgradient.jpeg')} 
  style={styles.background}
  >

    <View style={styles.container}>
      <HeaderHome navigation={navigation}/>
        <View style={styles.logoContainer}>
          <Text style={styles.h2}>Bienvenue {user.username}!</Text>
        </View>

        <View style={styles.btnContainer}>
          {/* bouton pour chercher un.e doc */}

          <BigPressableButton 
          title="Trouver un.e doc"
          purple={true}
          onPress={() => navigation.navigate('FindDocHome')}
          />

          <BigPressableButton 
          title="Ajouter un.e doc"
          purple={true}
          onPress={handlePress}
          />

        </View>

        <ModalNoAccount visible={modalVisible} onClose={() => setModalVisible(false)} onLogin={handlePressLogin} text={"Ajouter un.e doc"}/>
    
    </View>
    
    <TouchableOpacity
      style={styles.contact}
      title="Go to infos"
      onPress={() => navigation.navigate('TabNavigator')}
      >
        <Text style={styles.h5}>Qui sommes-nous ?</Text>
    </TouchableOpacity>

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
    background: {
      width: '100%',
      height: '100%',
    },
    keyContainer: {
      height: '100%',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignContent: 'center',
    },
    container: {
      height: '100%',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',

      },
    
    logoContainer: {
      position: 'absolute',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      top: 60,
    },
    
    logoSafeDoc: {
      objectFit: 'contain',
      width: '85%',
      height: 120,
      },

    h2: {
      marginTop: 30,
      position: 'absolute',
      color: '#2D0861',
      fontFamily: 'Greycliff-Bold',
      fontStyle: 'normal',
      fontWeight: 800,
      fontSize: 20,
      lineHeight: 19,
      display: 'flex',
      alignItems: 'center',
      letterSpacing: 0.25,
      top: 100,
    },

    btnContainer: {
      position: 'absolute',
      display: 'flex',
      height: '25%',
      flexDirection: 'column',
      justifyContent: 'space-around',
      bottom: 250,
    },

    contact: {
      bottom: 60,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    h5: {
      color: '#2D0861',
      fontFamily: 'Greycliff-Bold',
      fontWeight: 600,
      fontSize: 14,
      lineHeight: 19,
      letterSpacing: 0.25,
      textDecorationLine: 'underline'
    },
    
    h3: {
      color: 'white',
      fontFamily: 'Greycliff-Bold',
      fontWeight: 600,
      fontSize: 16,
      lineHeight: 19,
      display: 'flex',
      alignItems: 'center',
      letterSpacing: 0.25,
    },
  });