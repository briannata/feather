import { Text, View } from 'react-native';

  const Home = ({navigation}) => {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text onPress={navigation.navigate('Register')}>Home!</Text>
      </View>
    );
  };

export default Home;