import { TouchableOpacity, StyleSheet, Text, View, Image, SafeAreaView, ImageBackground } from 'react-native';
import { useDispatch } from 'react-redux';
import { BigPressableButton } from '../components/PressableButton';
import { login } from '../reducers/user';
import PressableButton from '../components/PressableButton';

export default function LoginScreen({ navigation }) {
// Dispatch pour reducer login
const dispatch = useDispatch();

const handlePressNoAccount = () => {
dispatch(login({token: null, username: null}))
navigation.navigate('Home')
}

return (
<SafeAreaView style={styles.safeAreaView}>
  <ImageBackground 
  source={require('../assets/background-rainbowgradient.jpeg')} 
  style={styles.background}
  >

    <View style={styles.container}>

      <View style={styles.logoContainer}>
        <Image style={styles.logoSafeDoc} source={require('../assets/logoSafeDoc.png')} />
        <Text style={styles.h2}>La santé pour tous.tes!</Text>
      </View>

      <View style={styles.btnContainer}>
        {/* bouton connection */}

        <BigPressableButton 
        onPress={() => navigation.navigate('SignIn')}
        title='Me connecter'
        />

        {/* bouton insription */}
        <BigPressableButton 
        onPress={() => navigation.navigate('SignUp')}
        title="M'inscrire"
        />
      </View>

      {/* Accès sans compte */}
      <PressableButton 
      title='Accès sans compte'
      onPress={handlePressNoAccount}
      />
    </View>

    <TouchableOpacity
    style={styles.contact}
    title="Go to infos"
    // onPress={() => navigation.navigate('Infos')}
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
container: {
  height: '100%',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',

  },

  background: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

logoContainer: {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  top: 70,
},

logoSafeDoc: {
  objectFit: 'contain',
  width: '85%',
  height: 120,
  },

h2: {
  marginTop: 22,
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
  position: 'absolute',
  bottom: 60,
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