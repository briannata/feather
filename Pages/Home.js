import Register from './Register';
import {
    Button
  } from 'react-native';

  const Home = ({navigation}) => {
    return (
      <Button
        title="Go to Jane's profile"
        onPress={() =>
          navigation.navigate('Register')
        }
      />
    );
  };

export default Home;