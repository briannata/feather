import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, Image, StyleSheet, Button } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { openDatabase } from 'expo-sqlite';

const db = openDatabase('mydb.db');

const Post = ({bird, description, imageUri}) => (
  <View style={styles.post}>
    {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
    <Text style={styles.heading}>{bird}</Text>
    <Text>{description}</Text>
  </View>
);

function Feed({route}) {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    console.log("here")
    fetchPosts();
  }, [route]);

  const fetchPosts = () => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM posts ORDER BY id DESC;', [], (_, { rows }) => {
        const formattedPosts = rows._array.map(row => {
          return {
            id: row.id,
            bird: row.bird,
            description: row.description,
            imageUri: row.imageUri,
          };
        });
        setPosts(formattedPosts);
        console.log(formattedPosts)
      });
    });
  };

  const renderPost = ({ item }) => {
    return (
      <Post
        bird={item.bird}
        description={item.description}
        imageUri={item.imageUri}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={post => post.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  post: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 3,
    padding: 10,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 350,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
  },
});

export default Feed;