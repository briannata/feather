import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, ScrollView } from 'react-native';


function Encyclopedia() {
  const [isLoading, setLoading] = useState(true);
  const [birds, setBirds] = useState([]);

  const getBirds = async () => {
    try {
      const response = await fetch('https://api.ebird.org/v2/ref/taxonomy/ebird?fmt=json&cat=species');
      const json = await response.json();
      console.log(json)
      const birdData = json.map(bird => ({
        name: bird.comName,
        scientificName: bird.sciName,
      }));
      setBirds(birdData)
    } catch (error) {
      console.error('Error fetching bird data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBirds();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }

    return (
      <ScrollView contentContainerStyle={styles.scrollView}>
      {birds.map(bird => (
        <View key={bird.name} style={styles.birdContainer}>
          <Text style={styles.name}>{bird.name}</Text>
          <Text style={styles.scientificName}>{bird.scientificName}</Text>
        </View>
      ))}
    </ScrollView>
  );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    scrollView: {
      flexGrow: 1,
      justifyContent: 'left',
      alignItems: 'left',
    },
    birdContainer: {
      marginBottom: 20,
      padding: 10,
      backgroundColor: '#f0f0f0',
      borderRadius: 10,
    },
    name: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    scientificName: {
      fontSize: 16,
    },
});

export default Encyclopedia;