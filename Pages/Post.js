import { Text, View, Image, StyleSheet, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useState } from 'react';
import { openDatabase } from 'expo-sqlite';

const db = openDatabase('mydb.db');

function Post({route, navigation}) {
    const {imageUri} = route.params;
    console.log(imageUri)

    const [bird, setBird] = useState('');
    const [description, setDescription] = useState('');

    const handleUpload = async () => {

        db.transaction(tx => {
            tx.executeSql(
              'INSERT INTO posts (description, bird, imageUri) VALUES (?, ?, ?);',
              [description, bird, imageUri],
              (_, { insertId }) => {
                console.log('Inserted post with ID:', insertId);
                setDescription('');
                setBird('');
                navigation.pop();
                navigation.navigate('Feed', {'key': insertId});
              },
              (_, error) => {
                console.error('Error inserting post:', error);
              }
            );
        });
        
    }

    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View contentContainerStyle={styles.inputContainer}>
                {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
                <TextInput
                    style={styles.input}
                    placeholder="Bird"
                    onChangeText={text => setBird(text)}
                    value={bird}
                />
                <TextInput
                    style={[styles.input, styles.descriptionInput]}
                    placeholder="Description"
                    onChangeText={text => setDescription(text)}
                    value={description}
                />
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => navigation.pop()} style={[styles.button, styles.cancelButton]}>
                        <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleUpload} style={styles.button}>
                        <Text style={styles.buttonText}>Upload!</Text>
                    </TouchableOpacity>
                </View>
                
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
    },
    image: {
        width: '100%',
        height: '50%',
        resizeMode: 'cover',
        marginBottom: 20,
    },
    input: {

        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        marginHorizontal: 10,
        width: '95%',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: '10px',
        alignItems: 'center',
        width: '95%',
        marginBottom: 20,
        marginHorizontal: 10,
    },
    button: {
        backgroundColor: '#45A9CD',
        paddingVertical: 15,
        borderRadius: 3,
        width: '30%',
    },
    cancelButton: {
        backgroundColor: '#003149',
    },
    buttonText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    descriptionInput: {
        height: 100,
    },
});

export default Post;