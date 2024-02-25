import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import {useAuth0, Auth0Provider} from 'react-native-auth0';
import { Redis } from 'react-native-redis';

const Register =  ({navigation}) => {

    const {authorize} = useAuth0();
    
    const onPress = async () => {
        try {
            await authorize();
        } catch (e) {
            console.log(e);
        }
    };

    const makeUserObject = async () => {
        try {
            await Redis.connect({
                "singleServerConfig": {
                  "address": "redis://127.0.0.1:6379",
                  "database": 0
                }
              }).then((client) => {
                client.saveObject(state.username, {
                  "username": state.username,
                  "email": state.email,
                  "password": state.password,
                }).then((val) => {
                  console.log('redis.saveObject = ', val);
                });
        }); }
         catch (e) {
            console.log(e);
        }
    }

    const onPressRegister = () => {
        navigation.navigate('MyTabs')
        onPress();
        makeUserObject();
    };

    const [state,setState] = useState({
        email: '',
        password: '',
        username: '',
    })

    return (
        <Auth0Provider domain={"dev-0wyyj1bhaco72a8z.us.auth0.com"} clientId={"R8ADxheKlfMKJCwF82Z7Zd0OuPFA8iey"}>
        <View style={styles.container}>
            <Text style={styles.title}>Registration</Text>
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
                placeholder="Email"
                placeholderTextColor="#003f5c"
                onChangeText={text => setState({email:text})}/>
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
                onPress = {onPressRegister}
                style={styles.loginBtn}>
            <Text style={styles.loginText} onPress={onPressRegister}>SIGN UP</Text>
            </TouchableOpacity>
        </View>
        </Auth0Provider>
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
        color:"black"
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

export default Register;