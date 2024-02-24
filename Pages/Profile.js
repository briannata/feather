import { StyleSheet, View, Text, Button, TouchableOpacity, Image} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function Profile({onLogout}) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Profile!</Text>
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
      marginTop: 10,
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
});

export default Profile;