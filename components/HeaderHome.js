import { TouchableOpacity, StyleSheet, Text, View, Image, Modal, Pressable } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import ModalNoAccount from './ModalNoAccount';

export default function HeaderHome({ navigation }) {
// Dispatch pour reducer 
const dispatch = useDispatch();

// Etat local pour Modal
const [modalVisible, setModalVisible] = useState(false);

// UseSelector pour recuperer user reducer pour conditionner affichage different du header si user is logged ou pas logged
const user = useSelector((state) => state.user.value);

// Fonction Retour page Login
const handlePressLogin = () => {
  setModalVisible(!modalVisible)
  navigation.navigate('SignUp')
}

// Fonction press conditionné au reducer et au token (pour le clic sur bouton user)
const handlePress = () => {
  if (user.token){
    navigation.navigate('User')
  } else {
    setModalVisible(true)
  }
}

return (
<View style={styles.container}>
{/* <TouchableOpacity onPress={() => navigation.goBack()}>
<FontAwesome name={'angle-left'} size={40} color={'white'} title="Go back" />
</TouchableOpacity> */}
  <View></View>

  <TouchableOpacity
  >
    <Image style={styles.image} source={require('../assets/homeButton.png')} />
  </TouchableOpacity>

  {/* Changer pour rediriger vers User */}
  <TouchableOpacity title="Go to User" onPress={handlePress}>
    <FontAwesome name={'user'} size={28} color={'white'}  />
  </TouchableOpacity>
  <ModalNoAccount visible={modalVisible} onClose={() => setModalVisible(false)} onLogin={handlePressLogin} text={"Profil Utilisateur.ice"}/>
</View>
);
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#2D0861',
      display: 'flex',
      flexDirection:'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: 65,
      width: '100%',
      paddingLeft: 30,
      paddingRight: 30
    },

    image: {
      height: 55,
      width: 55,
      borderRadius: 10
    },
});