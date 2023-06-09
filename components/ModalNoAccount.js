import { TouchableOpacity, StyleSheet, Text, View, Image, Modal, Pressable } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useState } from 'react';


export default function ModalNoAccount({  visible, onClose, onLogin, text }) {

    return (
      <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>L'accès à la page {text} est reservé aux membres enregistré.e.s.</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={onClose}
              >
              <Text style={styles.textStyle}>Continuer sans s'enregistrer</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={onLogin}
              >
              <Text style={styles.textStyle}>Aller à la page "M'inscrire"</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      );

}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#E9D3F1',
      borderRadius: 10,
      display: 'flex',
      flexDirection:'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: 30,
      padding: 7,
      marginLeft: 5,
      marginRight: 5,
    },

    h3: {
      color: '#652CB3',
      fontFamily: 'Greycliff-Light',
      fontSize: 14,
      display: 'flex',
      alignItems: 'center',
      letterSpacing: 0.25,
    },

    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
      },
      buttonOpen: {
        backgroundColor: '#F194FF',
      },
      buttonClose: {
        backgroundColor: '#652CB3',
        marginBottom: 20
      },
      textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: 'Greycliff-Bold',
        fontWeight: 600,
        fontSize: 14,
      },
      modalText: {
        fontFamily: 'Greycliff-Bold',
        fontSize: 14,
        marginBottom: 20,
        textAlign: 'center',
    }, 
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
  
    overlay: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      // backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
  });