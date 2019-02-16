import React from 'react';
import { StyleSheet, Text, TouchableOpacity, Image } from 'react-native';

var genres = [
   {
     "id": 28,
     "name": "Action"
   },
   {
     "id": 12,
     "name": "Adventure"
   },
   {
     "id": 16,
     "name": "Animation"
   },
   {
     "id": 35,
     "name": "Comedy"
   },
   {
     "id": 80,
     "name": "Crime"
   },
   {
     "id": 99,
     "name": "Documentary"
   },
   {
     "id": 18,
     "name": "Drama"
   },
   {
     "id": 10751,
     "name": "Family"
   },
   {
     "id": 14,
     "name": "Fantasy"
   },
   {
     "id": 36,
     "name": "History"
   },
   {
     "id": 27,
     "name": "Horror"
   },
   {
     "id": 10402,
     "name": "Music"
   },
   {
     "id": 9648,
     "name": "Mystery"
   },
   {
     "id": 10749,
     "name": "Romance"
   },
   {
     "id": 878,
     "name": "Science Fiction"
   },
   {
     "id": 10770,
     "name": "TV Movie"
   },
   {
     "id": 53,
     "name": "Thriller"
   },
   {
     "id": 10752,
     "name": "War"
   },
   {
     "id": 37,
     "name": "Western"
   }
 ];

export default class Show extends React.Component {
  render() {
    return (
      <TouchableOpacity style={styles.container} onPress={() => this.props.updateModalData(this.props.data)}>
        <Text style={styles.item}>{this.props.data.name}</Text>
        <Image source={{uri: 'https://image.tmdb.org/t/p/w500/'+ this.props.data.poster_path}} style={{width: 200, height: 300}} ></Image>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   paddingBottom: 15,
   paddingTop: 10,

   borderBottomWidth: 0.5,
    alignItems: "center"
  },
  item: {
    fontSize: 18,
  }
});
