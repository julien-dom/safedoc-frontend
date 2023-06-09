import { TouchableOpacity, StyleSheet, Text, View, ScrollView, SafeAreaView, ImageBackground, Linking } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function InfosConfidentialityScreen({ navigation }) {
  
//ENVOI DE MAIL A l'ADRESSE DE CONTACT
const handleEmailLink = () => {
  Linking.openURL('mailto:safedoc.contact@gmail.com');
}

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

      <Text style={styles.textTitle}>Notre politique de confidentialité des médecins{'\n'}{'\n'}</Text> 
      {'\n'}{'\n'}
        Nous souhaitons vous informer que les médecins référencé.e.s sur notre application seront trié.e.s sur plusieurs niveaux de référencement en fonction de leur souhait d'apparaître à plus ou moins grande échelle.{'\n'}
        {'\n'}  Certains médecins seront accessibles à tout le monde, y compris les personnes sans compte sur l'application. D'autres seront exclusivement réservé.e.s aux membres inscrits sur l'application. Enfin, certains médecins ne s'afficheront pas publiquement sur notre application, mais pourront être partagé.e.s par e-mail.{'\n'}
        {'\n'}  Nous avons mis en place ces différents niveaux de référencement pour répondre aux besoins et aux préférences de chacun. Nous respectons la volonté de certain.e.s médecins de ne pas être largement référencé.e.s, mais nous souhaitons également offrir une liste exhaustive de professionnels de santé pour répondre aux besoins de notre communauté.{'\n'}
        {'\n'}  Nous tenons à souligner que tous.tes les médecins référencé.e.s sur notre application ont été recommandé.e.s par la communauté LGBTQIA+ et ont été évalué.e.s pour leur respect et leur soutien envers la communauté. Nous espérons que vous trouverez les informations que vous cherchez et que notre application vous sera utile.{'\n'}{'\n'} N'hésitez pas à nous contacter si vous avez des questions ou des commentaires.{'\n'}{'\n'}
      <Text style={styles.regards}>Cordialement,</Text>{'\n'}{'\n'}
        L'équipe de notre application mobile pour la communauté LGBTQIA+.{'\n'}{'\n'}

        Pour nous contacter :{'\n'}{'\n'}
        Par mail :
        </Text>
        <TouchableOpacity 
        onPress={handleEmailLink}
        style={styles.linkContainer}>
        <Text style={styles.linkToEmail}>safedoc.contact@gmail.com</Text>
        </TouchableOpacity>

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