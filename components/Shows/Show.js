import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View
}
from 'react-native';

export default class Show extends React.Component {
  render() {
    return (
      <TouchableOpacity style={styles.container} onPress={() => this.props.updateModalData(this.props.data)}>
        <View style={{backgroundColor: '#fff',   justifyContent: 'center', alignItems: 'center',  height: 30,width: 200,}}>
          <Text style={styles.item}>{this.props.data.name}</Text>
        </View>
        <Image source={{uri: 'https://image.tmdb.org/t/p/w500/'+ this.props.data.poster_path}} loadingIndicatorSource={require('../../assets/images/placeholder.jpg')} style={{width: 200, height: 300}} ></Image>
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
alignItems: 'center'

  }
});
