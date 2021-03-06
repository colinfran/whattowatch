import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar
}
from 'react-native';
import TopBarNav from 'top-bar-nav';
import ShowsDay from '../components/Shows/ShowsDay';
import ShowsWeek from '../components/Shows/ShowsWeek';
import ShowsPopular from '../components/Shows/ShowsPopular';
import ShowsTopRated from '../components/Shows/ShowsTopRated';

export default class ShowScreen extends React.Component {
  constructor(props) {
    super(props);
    console.log("\n\n\n\n\n\n\n\n\n\n");
  }

  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <SafeAreaView style={{
        flex: 1,
        backgroundColor: 'black',
      }}>
      <StatusBar barStyle = "light-content"/>
        <ScrollView style={{
          flex: 1,
          backgroundColor: 'black'
        }}>
          <Text style={{fontSize: 20,paddingTop: 5,backgroundColor: '#000', color: '#fff',paddingLeft: 20,fontWeight: 'bold'}}>Trending Today</Text>
          <ShowsDay></ShowsDay>
          <Text style={{fontSize: 20,paddingTop: 25, backgroundColor: '#000', color: '#fff',paddingLeft: 20,fontWeight: 'bold'}}>Trending This Week</Text>
          <ShowsWeek></ShowsWeek>
          <Text style={{fontSize: 20,paddingTop: 25, backgroundColor: '#000', color: '#fff',paddingLeft: 20,fontWeight: 'bold'}}>Most Popular</Text>
          <ShowsPopular></ShowsPopular>
          <Text style={{fontSize: 20,paddingTop: 25, backgroundColor: '#000', color: '#fff',paddingLeft: 20,fontWeight: 'bold'}}>Top Rated</Text>
          <ShowsTopRated></ShowsTopRated>
      </ScrollView>
    </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  headerStyle: {
    borderBottomWidth: 1,
    borderColor: 'lightgrey',
    backgroundColor: '#000'
  },
  labelStyle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#fff'
  },
  imageStyle: {
    height: 20,
    width: 20,
    tintColor: '#e6faff'
  },
  underlineStyle: {
    height: 3.6,
    backgroundColor: '#fff',
    width: 40
  }
});
