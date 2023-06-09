import { TouchableOpacity, Image, StyleSheet, Text, View, SafeAreaView } from 'react-native';

// IMPORTS LIES AU COMPOSANT MAP ET GEOLOC
import MapView, { Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';
import {Dimensions} from 'react-native'
import Header from '../components/Header';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faLocationCrosshairs } from '@fortawesome/free-solid-svg-icons';



export default function GeolocalisationScreen({ navigation }) {
  const docplaces = useSelector((state) => state.docplaces.value);
  const [currentPosition, setCurrentPosition] = useState(null);

// UseEffect pour geolocalisation
useEffect(() => {
  (async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
 
    if (status === 'granted') {
      Location.watchPositionAsync({ distanceInterval: 10 },
        (location) => {
          setCurrentPosition(location.coords);
        });
    }
  })();
 }, []);

console.log('current is', currentPosition);


const markers = docplaces.map((doc, i) => {
 
  console.log(docplaces);

   return (
    <Marker 
    key={i} 
    coordinate={{ latitude: doc.latitude, longitude: doc.longitude }} 
    title={`${doc.lastname}, ${doc.firstname}`} 
    description={`${doc.specialties}, ${doc.address}`}
    pinColor="#652CB3"
    >
      <Image source={require('../assets/lgbt-pin.png')} style={{height: 20, width:20, resizeMode:"contain" }} />

      <Callout style={styles.callout}>
        <View>
          <Text style={styles.calloutTitle}>{`${doc.lastname}, ${doc.firstname}`}</Text>
          <Text style={styles.calloutDescription}>{`Spécialité(s): ${doc.specialties}`}</Text>
          <Text style={styles.calloutDescription}>{`Adresse: ${doc.address}`}</Text>
          <TouchableOpacity style={styles.btnDoc} onPress={()=>navigation.navigate('Doctor', {...doc})}>
            <Text style={styles.h5}>Aller sur sa page</Text>
          </TouchableOpacity>
        </View>
      </Callout>
    </Marker>
   );
});

return (
  <SafeAreaView style={styles.container}>

    <Header navigation={navigation}/>


    {currentPosition ? (
      <MapView
      mapType="standard"
      showsUserLocation={true}
      showsMyLocationButton={true}
      rotateEnabled={true}
      initialRegion={{
      latitude: currentPosition.latitude,
      longitude: currentPosition.longitude,
      // latitude: currentPosition?.latitude || 48.8566,
      // longitude: currentPosition?.longitude || 2.3522,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.021,
      }}
      style={styles.map}
      >
        {currentPosition && <Marker coordinate={currentPosition} title="Ma Position" pinColor="#652CB3" />}
        {markers}

        <TouchableOpacity
        style={styles.locationButton}
        >
          <FontAwesomeIcon icon={faLocationCrosshairs} size={33} color="#652CB3" />
        </TouchableOpacity>

      </MapView>
      ) : (

      <View style={styles.load}>
      <Text style={styles.loadText}>Loading...</Text>
      </View>

    )}
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

    map: {
      flex: 1,
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height
  },

    callout: {
    width: 200,
  },
  calloutTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  },
  calloutDescription: {
    fontSize: 14,
    marginBottom: 10
  },

  h5: {
    color: 'white',
    fontFamily: 'Greycliff-Bold',
    fontWeight: 600,
    fontSize: 14,
    lineHeight: 19,
    letterSpacing: 0.25,
  },

  btnDoc: {
    backgroundColor: '#652CB3',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    width: '65%', 
    alignSelf: 'center',
    padding: 2
  },
  load:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  loadText: {
    color: 'white',
    fontFamily: 'Greycliff-Bold',
    fontWeight: 600,
    fontSize: 14,
    lineHeight: 19,
    letterSpacing: 0.25,
  },

  locationButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    borderRadius: 100,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  });