import React from 'react';
import { StyleSheet, Text, TouchableOpacity, Image } from 'react-native';

export default class Movie extends React.Component {

  render() {
    return (
      <TouchableOpacity style={styles.container} onPress={() => this.props.updateModalData(this.props.data)}>
        <Text style={styles.item}>{this.props.data.title}</Text>
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
