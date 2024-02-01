import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import axios from 'axios';

const ImageFetcher = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(`http://192.168.1.7:3000/api/single-profile/${10}`);
        
        // Check if response.data.data.url is an array before setting state
        if (Array.isArray(response.data.data.url)) {
          setImages(response.data.data.url);
        } else if (response.data.data.url === '[]') {
          // If url is a string representation of an empty array, set images as an empty array
          setImages([]);
        } else {
          console.error('Invalid response format - expected an array');
        }
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []); // Empty dependency array to fetch images only once on component mount

  return (
    <View style={styles.container}>
      {images && images.map((image, index) => (
        <Image
          key={index}
          source={{ uri: image }}
          style={styles.image}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 10,
    borderRadius: 10,
  },
});

export default ImageFetcher;
