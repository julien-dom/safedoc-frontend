import { TouchableOpacity, StyleSheet, Text, View, Image } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


export default function Tag(props) {
    return (
    <TouchableOpacity style={styles.container}>
      {/* <Text style={styles.h3}>Trans-Friendly</Text> */}
      <Text style={styles.h3}>{props.name}</Text>
    </TouchableOpacity>
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
    }
  });