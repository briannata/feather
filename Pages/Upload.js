import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Camera, CameraType } from 'expo-camera';
import { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function Upload({ navigation }) {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [camera, setCamera] = useState(null);
  const [imageUri, setImageUri] = useState(null);
  const [videoUri, setVideoUri] = useState(null);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  const takePicture = async () => {
    if (camera) {
      const photo = await camera.takePictureAsync(null);
      setImageUri(photo.uri);
      if (photo) {
        navigation.navigate('Post', { imageUri: photo.uri });
      }
    }
  };

  const recordVideo = async () => {
    if (camera) {
      try {
        const video = await camera.recordAsync(null);
        console.log(video.uri);
        setPhotoUri(video.uri);
      } catch (error) {
        console.error('Failed to record video: ', error);
      }
    }
  };

  const stopRecording = () => {
    if (camera) {
      camera.stopRecording();
    }
  };

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} ref={(ref) => setCamera(ref)}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <Text style={styles.text}>
              <MaterialCommunityIcons name="camera-flip-outline" size={30}></MaterialCommunityIcons>
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.buttonLabel]} onPress={takePicture}>
            <MaterialCommunityIcons name="camera-iris" size={30} color="white"></MaterialCommunityIcons>
            <Text style={styles.text}>Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.videoButton]}
            onPress={camera?.isRecording ? stopRecording : recordVideo}
          >
            <View style={styles.buttonLabel}>
              <MaterialCommunityIcons name="camcorder" size={30} color="white"></MaterialCommunityIcons>
              <Text style={styles.text}>
                {camera?.isRecording ? 'Stop' : 'Video'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F7F7E8',
  },
  camera: {
    flex: 1,
    maxHeight: '80%',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
    marginBottom: 30,
    marginHorizontal: 10,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
    color: 'white',
  },
  buttonLabel: {
    color: 'white',
    flexDirection: 'col',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
