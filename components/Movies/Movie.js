import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image
}
from 'react-native';

import AsyncImage from "../AsyncImage";

export default class Movie extends React.Component {
  render() {
    return (
      <TouchableOpacity style={styles.container} onPress={() => this.props.updateModalData(this.props.data.id)}>
        <View style={{backgroundColor: '#fff',   justifyContent: 'center', alignItems: 'center',  height: 30,width: 200,}}>
          <Text style={styles.item}>{this.props.data.title}</Text>
        </View>
        <AsyncImage source={{uri: 'https://image.tmdb.org/t/p/w500/'+ this.props.data.poster_path}} style={{width: 200, height: 300}} />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 15,
    marginRight: 20,
    marginLeft: 20,
    paddingTop: 10,
    alignItems: "center",
    width: 200

  },
  item: {
    fontSize: 12,
    textAlign:'center',
    backgroundColor: '#fff',
    color: '#000',
  }
});
