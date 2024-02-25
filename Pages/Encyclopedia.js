import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, ActivityIndicator, ScrollView, Picker } from 'react-native';


function Encyclopedia() {
  const [isLoading, setLoading] = useState(true);
  const [birds, setBirds] = useState([]);
  const [filteredBirds, setFilteredBirds] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [familyCommonNames, setFamilyCommonNames] = useState([]);

  const getBirds = async () => {
    try {
      const response = await fetch('https://api.ebird.org/v2/ref/taxonomy/ebird?fmt=json&cat=species');
      const json = await response.json();
      console.log(json)
      const birdData = json.map(bird => ({
        name: bird.comName,
        scientificName: bird.sciName,
        familyComName: bird.familyComName,
        order: bird.order
      }));
      setBirds(birdData.slice(0, 30));
      setFilteredBirds(birdData.slice(0, 30));      
      const uniqueFamilyComNames = [...new Set(birdData.map(bird => bird.familyComName))];
      const sortedFamilyCommonNames = uniqueFamilyComNames.sort((a, b) => a.localeCompare(b));
      setFamilyCommonNames(sortedFamilyCommonNames);

    } catch (error) {
      console.error('Error fetching bird data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBirds();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = birds.filter(bird => bird.name.toLowerCase().includes(query.toLowerCase()));
    setFilteredBirds(filtered);
  };

  const handleFilterChange = (value) => {
    setSelectedFilter(value);
    if (value === 'All') {
      setFilteredBirds(birds);
    } else {
      const filtered = birds.filter(bird => bird.familyComName.toLowerCase() === value.toLowerCase());
      setFilteredBirds(filtered);
    }
  };
  
  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search birds..."
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <Picker
        selectedValue={selectedFilter}
        style={styles.filterPicker}
        onValueChange={(itemValue) => handleFilterChange(itemValue)}
      >
        <Picker.Item label="All" value="All" />
        {familyCommonNames.map((name, index) => (
          <Picker.Item key={index} label={name} value={name} />
        ))}
      </Picker>
      <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollView}>
        {filteredBirds.map(bird => (
          <View key={bird.name} style={styles.birdContainer}>
            <Text style={styles.name}>{bird.name}</Text>
            <Text style={styles.scientificName}>{bird.scientificName}</Text>
          </View>
        ))}
     </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchInput: {
    width: '80%',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  filterPicker: {
    width: '80%',
    marginBottom: 10,
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
