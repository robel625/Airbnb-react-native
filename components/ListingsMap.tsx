import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import React, { memo, useEffect, useRef } from 'react';
import { defaultStyles } from '@/constants/Styles';
import { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapView from 'react-native-map-clustering';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import * as Location from 'expo-location';

interface Props {
  listings: any;
}


const INITIAL_REGION = {
    latitude: 37.33,
    longitude: -122,
    latitudeDelta: 9,
    longitudeDelta: 9,
  };

 


const ListingsMap = memo(({ listings }: Props) => {
    const router = useRouter();

    // When a marker is selected, navigate to the listing page
 const onMarkerSelected = (event: any) => {
    router.push(`/listing/${event.properties.id}`);
  };

  const renderCluster = (cluster: any) => {
    const { id, geometry, onPress, properties } = cluster;

    const points = properties.point_count;
    return (
      <Marker
        key={`cluster-${id}`}
        coordinate={{
          longitude: geometry.coordinates[0],
          latitude: geometry.coordinates[1],
        }}
        onPress={onPress}>
        <View style={styles.marker}>
          <Text
            style={{
              color: '#000',
              textAlign: 'center',
              fontFamily: 'mon-sb',
            }}>
            {points}
          </Text>
        </View>
      </Marker>
    );
  };
  
  return (
    <View style={defaultStyles.container}>
      <MapView style={StyleSheet.absoluteFillObject} 
      animationEnabled={false}
      clusterColor="#fff"
      clusterTextColor="#000"
      clusterFontFamily="mon-sb"
      renderCluster={renderCluster}
      initialRegion={INITIAL_REGION}>
        {listings.features.map((item: any) => (
          <Marker
            coordinate={{
              latitude: item.properties.latitude ? +item.properties.latitude : 0,
              longitude: item.properties.longitude ? +item.properties.longitude : 0,
            }}
            key={item.properties.id}
            onPress={() => onMarkerSelected(item)}
            >
            <View style={styles.marker}>
              <Text style={styles.markerText}>€ {item.properties.price}</Text>
            </View>
          </Marker>
        ))}
        </MapView>
    </View>
  )
})

export default ListingsMap

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    marker: {
      padding: 8,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff',
      elevation: 5,
      borderRadius: 12,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 6,
      shadowOffset: {
        width: 1,
        height: 10,
      },
    },
    markerText: {
      fontSize: 14,
      fontFamily: 'mon-sb',
    },
    locateBtn: {
      position: 'absolute',
      top: 70,
      right: 20,
      backgroundColor: '#fff',
      padding: 10,
      borderRadius: 10,
      elevation: 2,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 6,
      shadowOffset: {
        width: 1,
        height: 10,
      },
    },
  });

