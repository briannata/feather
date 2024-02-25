import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Camera, CameraType } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Upload() {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [camera, setCamera] = useState(null);

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
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
      const photo = await camera.takePictureAsync();
      // TODO: save to database
      console.log('Photo taken:', photo);
    }
  };

  const recordVideo = async () => {
    if (camera) {
      const video = await camera.recordAsync();
      // TODO: save to database
      console.log('Video recorded:', video);
    }
  };

  const stopRecording = () => {
    if (camera) {
      camera.stopRecording();
    }
  };

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <Text style={styles.text}>
              <MaterialCommunityIcons name="camera-flip-outline" size={30}></MaterialCommunityIcons>
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.buttonLabel]} onPress={takePicture}>
            <MaterialCommunityIcons name="camera-iris" size={30} color="white"></MaterialCommunityIcons>
            <Text style={styles.text}>Take Picture</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.videoButton]}
            onPress={camera?.isRecording ? stopRecording : recordVideo}
          >
            <View style={styles.buttonLabel}>
              <MaterialCommunityIcons name="camcorder" size={30} color="white"></MaterialCommunityIcons>
              <Text style={styles.text}>
                {camera?.isRecording ? 'Stop Recording' : 'Record Video'}
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
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
    marginBottom: 60,
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
