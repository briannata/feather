import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, ActivityIndicator, ScrollView, Image, Pressable } from 'react-native';
import { Picker } from '@react-native-picker/picker'
// import CollapsibleView from './CollapsibleView';
import { AntDesign } from '@expo/vector-icons';
import { Button } from 'react-native-web';
// import Button from "@mui/material/Button";
// import IconButton from '@mui/material';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


function Encyclopedia() {
  const [isLoading, setLoading] = useState(true);
  const [birds, setBirds] = useState([]);
  const [birdsDesc, setBirdsDesc] = useState([]);
  const [birdsImg, setBirdsImg] = useState([]);

  const [filteredBirds, setFilteredBirds] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [familyCommonNames, setFamilyCommonNames] = useState([]);
  const [expanded, setExpanded] = useState(false);


  const getBirds = async () => {
    try {
      // fetching JSON from eBird API
      const response = await fetch('https://api.ebird.org/v2/ref/taxonomy/ebird?fmt=json&cat=species');
      const json = await response.json();
      console.log(json)
      // Mapping the JSON data to variables to be used
      const birdData = json.map(bird => ({
        name: bird.comName,
        scientificName: bird.sciName,
        familyComName: bird.familyComName,
        order: bird.order
      }));

      // slicing the BirdData to make data more manageable 
      setBirds(birdData.slice(0, 30));
      setFilteredBirds(birdData.slice(0, 30));  
      
      // connecting local birdDesc JSON and matching name up to bird names
      const birdDesc = require('./birdDesc.json');
      setBirdsDesc(birdDesc.birds.reduce((acc, bird) => {
        // reduce - transform array into object 
        // acc - stores result of each iteration and passes to next iteration
        acc[bird.name] = bird.description;
        return acc;
      }, {}));
      setBirdsImg(birdDesc.birds.reduce((acc, bird) => {
        // reduce - transform array into object 
        // acc - stores result of each iteration and passes to next iteration
        acc[bird.name] = bird.image;
        return acc;
      }, {}));
      console.log(birdDesc.birds)

      const uniqueFamilyComNames = [...new Set(birdData.map(bird => bird.familyComName))];
      const sortedFamilyCommonNames = uniqueFamilyComNames.sort((a, b) => a.localeCompare(b));
      setFamilyCommonNames(sortedFamilyCommonNames);

      // fetching JSON from eBird API
      // const apiKey = 'aabbee96-1bc2-4433-a3e3-80054f37f803'
      // const response2 = await fetch('https://nuthatch.lastelm.software/v2/birds',
      // {method: 'GET',
      // headers: {
      //   Authorization: `Bearer + ${apiKey}` // Adding  API key to Authorization header
      // }});
      // console.log(response2)
      // const json2 = await response2.json();
      // console.log(json2)

      // Mapping the JSON data to variables to be used
      // const birdImg = json.map(birdImg => ({
      // }));


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
      {/* <Picker
        selectedValue={selectedFilter}
        style={styles.filterPicker}
        onValueChange={(itemValue) => handleFilterChange(itemValue)}
      >
        <Picker.Item label="All" value="All" />
        {familyCommonNames.map((name, index) => (
          <Picker.Item key={index} label={name} value={name} />
        ))}
      </Picker> */}
      <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollView}>
        {filteredBirds.map(bird => (
          <View key={bird.name} style={styles.birdContainer}>
            <View style={styles.birdCover}>
              <View>
                <Text style={styles.name}>{bird.name}</Text>
                <Text style={styles.scientificName}>{bird.scientificName}</Text>
                <Pressable className="showMore" onPress={() => setExpanded(!expanded)}>
                  <AntDesign name="down" size={24} color="black"/>
                </Pressable>
              </View>
              <Image style={styles.logo} source={{ uri: birdsImg[bird.name]}}/>
            </View>
            {expanded ? (
              <Text style={styles.scientificName}>
                {/* <Image source={{uri: birdsImg[bird.name]}}/> */}
                {/* description of bird */}
                {birdsDesc[bird.name] || "No description available"}
              </Text>
            ) : null}
          </View>
        ))}
     </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'left',
    alignItems: 'left',
  },
  searchInput: {
    width: '90%',
    padding: 10,
    marginLeft: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginTop: 15,
  },
  filterPicker: {
    width: '90%',
    marginBottom: 10,
    marginLeft: 20,
  },
  scrollView: {
    flexGrow: 1,
    width: '90%',
    justifyContent: 'left',
    alignItems: 'left',
    marginLeft: 20,
  },
  birdCover: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
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
  logo: {
    width: 100,
    height: 100,
    marginLeft: 50,
  },
  // showMore: {
  //   border: '1px solid black',
  //   padding: '2px 5px',
  //   cursor: 'pointer',
  // },
  // expandable: {
  //   width: '40%',
  //   margin: 'auto',
  // },
});

export default Encyclopedia;
