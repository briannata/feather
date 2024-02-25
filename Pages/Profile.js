import { StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function Profile({navigation}) {
  const onLogout = () => {
    navigation.navigate('Landing')
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.profilePicture}
        source={{
          uri: 'https://wallpapers.com/images/hd/cute-bird-pictures-h6mz3ghdofpsxhrf.jpg',
        }}
      />
      <Text style={styles.title}>briannat</Text>
      <Text style={styles.subtitle}>she/her/hers</Text>

      <Text style={styles.topic}>Location</Text>
      <Text style={styles.content}>Chapel Hill, North Carolina</Text>

      <Text style={styles.topic}>Favorite Bird</Text>
      <Text style={styles.content}>Hummingbird</Text>

      <Text style={styles.bio}>Hi everyone, I'm Brianna and I love nature and bird watching. I hope to help make a difference by collecting data for scientists working on tracking bird migration and habits for their ML models. Save the environment!</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={onLogout}>
          <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'start',
      alignItems: 'center',
      backgroundColor: '#F7F7E8',
  },
  buttonContainer: {
      flexDirection: 'col',
      justifyContent: 'space-between',
      gap: '10px',
      alignItems: 'center',
      width: '80%',
      marginTop: 30,
      marginBottom: 10,
  },
  button: {
      backgroundColor: '#45A9CD',
      paddingVertical: 15,
      borderRadius: 3,
      width: '100%',
  },
  buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
  },
  profilePicture: {
    height: 100,
    width: 100,
    borderRadius: 50,
    marginBottom: 25,
  },
  title:{
    fontWeight: "bold",
    fontSize:25,
    color: "#023047",
    color:"#023047",
    marginBottom: 10,
},
subtitle: {
  marginBottom: 40,
},
topic: {
  fontWeight: "bold",
  fontSize: 20,
  color: "#023047",
  marginBottom: 5
},
content: {
  fontSize: 16,
  marginBottom: 30
},
bio: {
  marginLeft: 60,
  marginRight: 50,
  marginTop: 30,
  marginBottom: 30
}
});

export default Profile;