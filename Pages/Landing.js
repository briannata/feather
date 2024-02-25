import { StyleSheet, View, Text, Button, TouchableOpacity, Image} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function Landing({navigation}) {

    const handleLogin = () => {
        navigation.navigate('Login');
      };
    
      const handleSignUp = () => {
        navigation.navigate('Register');
      };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Welcome to Feather!</Text>
            <Image source={require('../assets/feather.png')} style={styles.logo} />
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Log In</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.signupButton]} onPress={handleSignUp}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#F7F7E8',
    },
    title: {
        fontSize: 24,
        marginTop: 30,
        color: '#003149'
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'col',
        justifyContent: 'space-between',
        gap: '10px',
        alignItems: 'center',
        width: '80%',
        marginBottom: 20,
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
        signupButton: {
        backgroundColor: '#003149',
    },
});

export default Landing;