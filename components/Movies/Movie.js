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
        <View style={{backgroundColor: '#fff',   justifyContent: 'center', alignItems: 'center',  height: 30,width: 200,borderTopLeftRadius: 15,
        borderTopRightRadius: 15}}>
          <Text style={styles.item}>{this.props.data.title}</Text>
        </View>
        <View style={{borderBottomLeftRadius: 15,borderBottomRightRadius: 15, overflow: "hidden"}} >
          <Image source={{uri: 'https://image.tmdb.org/t/p/w500/'+ this.props.data.poster_path}} style={{width: 200, height: 300, }} />
        </View>
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
    width: 200,
    borderRadius: 10


  },
  item: {
    fontSize: 12,
    textAlign:'center',
    color: '#000',
  }
});
