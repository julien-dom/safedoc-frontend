import { TouchableOpacity, StyleSheet, Text, View, SafeAreaView, ScrollView, ImageBackground } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../reducers/user';


export default function QuizGenderScreen({ navigation }) {
// Dispatch pour reducer login
const dispatch = useDispatch();

const [genderList, setGenderList] = useState([]);
const user = useSelector((state) => state.user.value);

//USEEFFECT Qui charge la table de référence Genres au chargement de la page pour afficher les cartes de genres
  useEffect(() => {
    fetch(`https://safedoc-backend.vercel.app/genders`)
      .then((response) => response.json())
      .then((data) => {
        setGenderList(data.genders);
        });
  }, []);

//création cartes de genre
const genders = genderList.map((data, i) => {
  const handlePress = () => {
    dispatch(login(({ username: user.username, password: user.password, email: user.email, gender: data.value })))
    navigation.navigate('QuizOrientation')
  }
  return (
    <TouchableOpacity
      title="Go to QuizOrientation"
      style={styles.card}
      onPress={handlePress}
      key={i}
      >
      <Text style={styles.h3purple}>{data.value}</Text>
      </TouchableOpacity>
  );
});

//Fonction clic pour passer le questionnaire
const skipQuizz = () => {
  console.log('click detected')
    fetch('https://safedoc-backend.vercel.app/users/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: user.username, password: user.password, email: user.email }),
        }).then(response => response.json())
          .then(data => {
            if (data.result) {
              dispatch(login(({ token: data.token, username: user.username, password: user.password, email: user.email })))
              navigation.navigate('Home')
            }
          });
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

      <TouchableOpacity style={styles.angleRight} title="Skip Quizz" onPress={skipQuizz}>
        <FontAwesome name={'angle-right'} size={40} color={'#652CB3'}/>
      </TouchableOpacity>

      <Text style={styles.h5}>passer</Text>

      <Text style={styles.h1}>Questionnaire</Text>

      <View style={styles.quizPhrase}>
       <Text style={styles.h3}>Je me définis comme :</Text>
      </View>


      <ScrollView contentContainerStyle={styles.scrollView}>
        {genders}
      </ScrollView>

      <View style={styles.dotsProgressContainer}>
        <FontAwesome name={'circle-thin'} size={15} color={'#2D0861'}/>
        <FontAwesome name={'circle'} size={15} color={'#2D0861'}/>
        <FontAwesome name={'circle-thin'} size={15} color={'#2D0861'}/>
      </View>
      <View style={styles.bottomMargin}></View>

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
    marginBottom: 15,
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

quizPhrase: {
  width: 320,
  marginBottom: 10,
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
},

h3white: {
    color: 'white',
    fontFamily: 'Greycliff-Bold',
    fontWeight: 600,
    fontSize: 20,
    lineHeight: 24,
},
dotsProgressContainer: {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: 80,
  position: 'absolute',
  bottom: 60
},

//cartes map pour les genres 
scrollView: {
  width: 320,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
},

card: {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 60,
  width: '100%',
  backgroundColor: '#E9D3F1',
  marginBottom: 20,
  borderRadius: 10,
},
h3purple: {
  color: '#652CB3',
  fontFamily: 'Greycliff-Regular',
  fontWeight: 600,
  fontSize: 20,
  lineHeight: 24,
  textAlign: 'center'
},
bottomMargin: {
    height: 100,
},
});