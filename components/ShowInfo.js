import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

var genres = {
  10759: "Action & Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  10762: "Kids",
  9648: "Mystery",
  10763: "News",
  10764: "Reality",
  10765: "Sci-Fi & Fantasy",
  10766: "Soap",
  10767: "Talk",
  10768: "War & Politics",
  37: "Western"
};

export default class ShowInfo extends React.Component {
  constructor(props) {
   super(props);
   this.state = {

   };

   this.getGenres = this.getGenres.bind(this);

  }

  getGenres(){
    var arr = this.props.data.genre_ids.slice(0);
    var newArr = [];
    while(arr.length !== 0){
      for (var g in genres){
        if (arr[0] == g){
          newArr.push(genres[g]);
        }
      }
      arr.shift();
    }
    return(
      <Text style={{fontSize: 14}}>Genres: {newArr.join()}</Text>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.item}>{this.props.data.name}</Text>
        <Text style={styles.item}>ID: {this.props.data.id}</Text>
        {this.getGenres()}
        <Text style={{fontSize: 12}}>Overview: {this.props.data.overview}</Text>

        <Image source={{uri: 'https://image.tmdb.org/t/p/w500/'+ this.props.data.poster_path}} style={{width: 200, height: 300}} ></Image>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
   marginBottom: 5,
   borderBottomWidth: 0.5,
   backgroundColor: 'white'

  },
  item: {
    fontSize: 18,
  }
});
