import { TouchableOpacity, StyleSheet, Text, View, ScrollView, SafeAreaView, ImageBackground, Linking } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function InfosScreen({ navigation }) {
  
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
      
    <View style={styles.testContainer}>
      <TouchableOpacity style={styles.angleLeft} title="Go back" onPress={handleClick}>
        <FontAwesome name={'angle-left'} size={40} color={'#652CB3'}/>
      </TouchableOpacity>

      <ScrollView>
        <Text style={styles.textContainer}>
                    
          <Text style={styles.textTitle}>
            Bienvenue sur SafeDoc{'\n'}{'\n'}
          </Text> 
        
          {'\n'}
          {'\n'}  L’application mobile dédiée à la recherche de médecins friendly pour la communauté LGBTQIA+. Nous avons créé cette application afin de fournir à notre communauté des informations précises et fiables pour trouver des médecins et des professionnel.les de santé qui sont inclusif.ve.s et respectueux.ses de l'identité de genre et de l'orientation sexuelle de chacun.e.
          {'\n'}{'\n'}  Malheureusement, la communauté subit encore de nombreuses discriminations dans de nombreux aspects de la vie, y compris dans le domaine de la santé. Selon une étude de l'Institut national de la santé et de la recherche médicale (INSERM), ces personnes sont plus susceptibles d'éviter les soins de santé en raison de la peur d'être maltraité.es ou discriminé.es. Les statistiques montrent que 1 personne LGBTQIA+ sur 5 a déjà été discriminée dans le domaine de la santé.
          {'\n'}{'\n'}  C'est pourquoi notre application mobile est là pour aider la communauté à trouver facilement des médecins qui sont formés et informés sur les questions LGBTQIA+. Grâce à notre base de données, les utilisateur.ice.s peuvent recommander des médecins inclusif.ve.s et partager leurs expériences avec la communauté. Cette application a pour but de faciliter l'accès aux soins pour tou.te.s, indépendamment de l'identité de genre et de l'orientation sexuelle.
          {'\n'}{'\n'}  Nous sommes convaincus que SafeDoc peut faire une réelle différence dans la vie des personnes LGBTQIA+. Nous espérons que vous apprécierez l'expérience utilisateur de notre application et que vous trouverez des médecins qui vous respectent et vous soutiennent tout au long de votre parcours de soins.
          {'\n'}{'\n'}
          
          <Text style={styles.regards}>Cordialement,</Text>
          {'\n'}{'\n'}  L'équipe de notre application mobile pour la communauté LGBTQIA+.{'\n'}{'\n'}

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
  background: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  testContainer: {
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