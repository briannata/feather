import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
} from 'react-native';

const Login =  ({navigation}) => {
    const onPressLogin = () => {
        navigation.navigate('Encyclopedia',
        {
          state: {
            password: state.password,
            username: state.username,
          }
        })
    };

    const [state,setState] = useState({
        password: '',
        username: '',
    })

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login Page</Text>
            <View style={styles.inputView}>
            <TextInput
                style={styles.inputText}
                placeholder="Username"
                placeholderTextColor="#003f5c"
                onChangeText={text => setState({username:text})}/>
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.inputText}
                    secureTextEntry
                    placeholder="Password"
                    placeholderTextColor="#003f5c"
                    onChangeText={text => setState({password:text})}/>
            </View>
            <TouchableOpacity
                onPress = {onPressLogin}
                style={styles.loginBtn}>
            <Text style={styles.loginText}>LOGIN</Text>
            </TouchableOpacity>
        </View>
    );
    }
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#8ECAE6',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title:{
        fontWeight: "bold",
        fontSize:50,
        color:"#023047",
        marginBottom: 40,
    },
    inputView:{
        width:"80%",
        backgroundColor:"#F7F7E9",
        borderRadius:25,
        height:50,
        marginBottom:20,
        justifyContent:"center",
        padding:20
    },
    inputText:{
        height:50,
        color:"white"
    },
    loginBtn:{
        width:"80%",
        backgroundColor:"#219EBC",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:40,
        marginBottom:10
    },
});

export default Login;