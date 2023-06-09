import { TouchableOpacity, StyleSheet, Text, View, ScrollView, SafeAreaView, ImageBackground } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function InfosQuestionScreen({ navigation }) {

const handleClick = () => {
  navigation.goBack()
}

return (
<SafeAreaView 
  style={styles.container}
>
  <ImageBackground 
    source={require('../assets/background-rainbowgradient.jpeg')} 
    style={styles.background}
  >

  <TouchableOpacity style={styles.angleLeft} title="Go back" onPress={handleClick}>
    <FontAwesome name={'angle-left'} size={40} color={'#652CB3'}/>
  </TouchableOpacity>

  <ScrollView>
    <Text style={styles.textContainer}>
      <Text style={styles.textTitle}>
        FAQ               
      </Text> 
              
                {'\n'}{'\n'}{'\n'}
              
                Qui gère l'application ?
                Des devs de la communauté impliqué.es et motivé.es. ❤️ {'\n'}{'\n'}

                Comment puis-je vous contacter pour signaler un.e médecin ?
                Par email à safedoc.contact@gmail.com. {'\n'}{'\n'}

                Quelle est votre politique de confidentialité des données ?
                Les données de connexion sont stockées jusqu'à la suppression du compte. Concernant les données sur votre genre ou votre orientation, vous pouvez les mentionner si vous souhaitez nous aider à personnaliser l'application pour de futures fonctionnalités, mais cela reste facultatif.{'\n'}{'\n'}

                Puis-je supprimer mon compte ?
                Oui, et vos données utilisateur seront supprimées.{'\n'}{'\n'}
        </Text>
        <View style={styles.invisibleView}></View>
    </ScrollView>
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

  background: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

    angleLeft: {
      zIndex: 99,
      position: 'absolute',
      left: 30
    },

    textContainer: {
      paddingTop: '20%',
      textAlign:'justify',
      width: 320,
      fontFamily: 'Greycliff-Light',
    },
    textTitle: {
      textAlign:'center',
      width: 320,
      fontSize: 20,
      fontFamily: 'Greycliff-Bold',
    },

    regards: {
      textAlign: 'left',
      width: 320,
      fontSize: 20,
      fontFamily: 'Greycliff-Bold',
    },

    linkToEmail: {
      textDecorationLine: 'underline'
    },

    linkContainer: {
      height: 20
    },

    invisibleView: {
      height: 80,
    },
});