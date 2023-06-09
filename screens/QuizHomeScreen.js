import { TouchableOpacity, StyleSheet, Text, View, SafeAreaView, ImageBackground } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/user';


export default function QuizzHomeScreen({ navigation }) {
// Dispatch pour reducer login
const dispatch = useDispatch();

// UseSelector pour recuperer user reducer
const user = useSelector((state) => state.user.value);


//Fonction clic pour passer le questionnaire
  const skipQuizz = () => {
    console.log('click detected')
      fetch('https://safedoc-backend.vercel.app/users/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: user.username, password: user.password, email: user.email }),
          }).then(response => response.json())
            .then(data => {
              console.log('data is', data)
              if (data.result) {
                dispatch(login(({ token: data.token, username: user.username, password: user.password, email: user.email })))
                navigation.navigate('Home')
              }
            });
  };

// Fonction lors du clic sur bouton
  const handlePress = () => {
    navigation.navigate('QuizGender')
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground 
        source={require('../assets/background-bluegradient.jpeg')} 
        style={styles.gradientContainer}>

        <View style={styles.keyContainer}>
            <TouchableOpacity style={styles.angleLeft} title="Go back" onPress={() => navigation.goBack()}>
              <FontAwesome name={'angle-left'} size={40} color={'#652CB3'}/>
            </TouchableOpacity>

            <TouchableOpacity style={styles.angleRight} title="Go back" onPress={skipQuizz}>
              <FontAwesome name={'angle-right'} size={40} color={'#652CB3'}/>
            </TouchableOpacity>

            <Text style={styles.h5}>passer</Text>
            <Text style={styles.h1}>Questionnaire</Text>

            <View style={styles.textContainer}>
              <Text style={styles.h2}>
                Voici un petit questionnaire facultatif qui nous permettra de cibler au mieux vos besoins.{'\n'}{'\n'}
                Les informations enregistrées ne seront pas partagées.{'\n'}{'\n'}
                Elles permettront potentiellement d'améliorer l'application dans de futures versions.{'\n'}{'\n'}
                En espérant qu'il y en aura !
              </Text>  
            </View>

            <View style={styles.dotsProgressContainer}>
              <FontAwesome name={'circle'} size={15} color={'#2D0861'}/>
              <FontAwesome name={'circle-thin'} size={15} color={'#2D0861'}/>
              <FontAwesome name={'circle-thin'} size={15} color={'#2D0861'}/>
            </View>

            <TouchableOpacity
            title="Go on"
            style={styles.mediumbtn}
            onPress={handlePress}
            >
              <Text style={styles.h3white}>Continuer</Text>
            </TouchableOpacity>

        </View>
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

  angleRight: {
    position: 'absolute',
    right: 30,
  },

h5: {
    color: '#652CB3',
    fontFamily: 'Greycliff-Bold',
    fontWeight: 600,
    fontSize: 14,
    lineHeight: 19,
    letterSpacing: 0.25,
    position: 'absolute',
    right: 20,
    top: 34,
},
h1: {
    marginTop: 100,
    fontFamily: 'Greycliff-Bold', 
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: 34,
    lineHeight: 41,
},

inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '30%',
    paddingLeft: 30,
    paddingRight: 30,
},
h3:{
  fontFamily: 'Greycliff-Bold',
  fontWeight: 600,
  fontSize: 20,
},
input: {
    borderColor: '#263238',
    borderStyle: 'solid',
    // borderRadius: 8,
    // borderLeftWidth: 1.5,
    // borderTopWidth: 1.5,
    // borderRightWidth: 1.5,
    // borderBottomWidth: 1.5,
    height: 56,
    marginBottom: 10,
    paddingLeft: 10,
},
mediumbtn: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 100,
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
  fontFamily: 'Greycliff-Bold',
  fontWeight: 600,
  fontSize: 20,
  lineHeight: 24,
},
textContainer: {
  display: 'flex',
  flexDirection: 'column',
  width: '70%',
  height: '50%',
  justifyContent: 'center',
  alignContent: 'flex-start'
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
  textAlign: 'center',
},
dotsProgressContainer: {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: 80,
  position: 'absolute',
  bottom: 50
},
});