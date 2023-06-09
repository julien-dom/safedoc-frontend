// import { TouchableOpacity, StyleSheet, Text, View, KeyboardAvoidingView, SafeAreaView, ScrollView } from 'react-native';
// import React, { useEffect, useState } from 'react';

// export default function Quizcard({ props }) {

//     // Fonction clic qui ajoute le genre a l'objet user en BDD et passe a la carte quizz suivante
//   // AJOUTER lien avec la route pour enregistrement en BDD
//   const addGender = () => {
//     console.log('click on card gender')
//     navigation.navigate('QuizOrientation')
//   };
//     return (
//         <TouchableOpacity
//         style={styles.card}
//         onPress={addGender}
//         >
//         <Text style={styles.h3purple}>{data.value}</Text>
//         </TouchableOpacity>
//     );
// };


// const styles = StyleSheet.create({
// card: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: 60,
//     width: '100%',
//     backgroundColor: '#E9D3F1',
//     marginBottom: 20,
//     borderRadius: 10,
//   },
//   h3purple: {
//     color: '#652CB3',
//     fontFamily: 'Greycliff-Regular',
//     fontWeight: 600,
//     fontSize: 20,
//     lineHeight: 24,
//   },
// });