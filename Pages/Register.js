import {useAuth0, Auth0Provider} from 'react-native-auth0';
import { Text, Button } from 'react-native';
import {DOMAIN, CLIENT_ID} from "@env";

function Register() {

    const {authorize} = useAuth0();
  
    const onPress = async () => {
        try {
            await authorize();
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <Auth0Provider domain={DOMAIN} clientId={CLIENT_ID}>
            <Button onPress={onPress} title="Log in" />
            <Text>Hello</Text>
        </Auth0Provider> 
    );
  }

export default Register;