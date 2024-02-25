import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';

function Post({route, navigation}) {
    const {imageUri} = route.params;
    console.log(imageUri)

    const handleUpload = async () => {
        //TODO: upload to database
        navigation.pop();
        navigation.navigate('Feed');
    }

    return (
      <View style={styles.container}>
        {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
        <Text>Give your post a title!</Text>
        <TouchableOpacity onPress={handleUpload}>
            <Text>Upload</Text>
        </TouchableOpacity>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    image: {
      width: '100%',
      height: '50%',
      resizeMode: 'contain',
    },
});

export default Post;