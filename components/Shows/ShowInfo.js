import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  Linking,
  PixelRatio,
  Dimensions,
  Platform,
  WebView,
  TouchableOpacity,
  ScrollView

}
from 'react-native';

import renderIf from 'render-if'
import { Rating} from 'react-native-elements';
import searchYoutube from 'youtube-api-v3-search';

import YTSearch from 'youtube-api-search';
import YouTube, { YouTubeStandaloneIOS, YouTubeStandaloneAndroid } from 'react-native-youtube';
import Video from 'react-native-video'
import { AntDesign } from '@expo/vector-icons';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';



export default class ShowInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      data_air_date: null,
    };
    this.getGenres = this.getGenres.bind(this);
    this.getCreator = this.getCreator.bind(this);
    this.getNetworks = this.getNetworks.bind(this);
    this.getDate = this.getDate.bind(this);
  }

  componentDidMount(){
    this.getDate();
  }

  // This function returns a <Text> component with a string containing each genre in genre array
  getGenres() {
    var arr = this.state.data.genres.slice(0);
    var newArr = [];
    for (var g in arr)
      newArr.push(arr[g].name);
    return <Text style={{fontSize: 12, color: 'white', paddingTop: 5}}>Genres: {newArr.join(", ")}</Text>
  }

  // This function converts a date string into the wanted format
  getDate(){
    var myDate = this.props.data.last_air_date;
    var chunks = myDate.split('-');
    var formattedDate = chunks[1]+'/'+chunks[2]+'/'+chunks[0];
    const dateFormat = new Date(formattedDate);
    var strDate = dateFormat.toLocaleString("en", { month: "long"  }) + ' ' + dateFormat.toLocaleString("en", { day: "numeric" }) + ', ' + dateFormat.toLocaleString("en", { year: "numeric"});
    this.setState({data_air_date: strDate});
  }

  // This function returns a <Text> component with a string containing each creator of the show from the array
  getCreator() {
    var arr = this.state.data.created_by.slice(0);
    var newArr = [];
    for (var g in arr)
      newArr.push(arr[g].name);
    if (newArr.length == 1)
      return <Text style={{fontSize: 12, color: 'white', paddingTop: 5}}>Creator: {newArr[0]}</Text>
    else
      return <Text style={{fontSize: 12, color: 'white', paddingTop: 5}}>Creators: {newArr.join(", ")}</Text>
  }

  // This function returns a <Text> component with a string containing each network to watch the the show from the array  
  getNetworks() {
    var arr = this.state.data.networks.slice(0);
    var newArr = [];
    for (var g in arr)
      newArr.push(arr[g].name);
    if (newArr.length == 1)
      return <Text style={{fontSize: 12, color: 'white', paddingTop: 5}}>Watch on: {newArr[0]}</Text>
    else
      return <Text style={{fontSize: 12, color: 'white', paddingTop: 5}}>Watch on: {newArr.join(", ")}</Text>
  }

  render() {
    return(
      <View style={[{flex: 1, paddingTop: 5, backgroundColor: '#121D1D'  }]}>
        <ScrollView style={{marginLeft:10, flex:1}}>
          <View style={{flexDirection: 'row'}}>
            <Rating
              imageSize={12}
              readonly
              style={{alignItems: 'flex-start'}}
              count={10}
              startingValue={this.state.data.vote_average}
              fractions={this.state.data.vote_average}
              ratingCount={10}
            />
          <Text style={{fontSize: 10, color: 'white'}}>{"  ("}{this.state.data.vote_count}{")"}</Text>
          </View>
          <Text style={{fontSize: 12, color: 'white', paddingTop: 5}}>Popularity/Ranking: {this.state.data.popularity}</Text>
          {this.getCreator()}
          <Text style={{fontSize: 12, color: 'white', paddingTop: 5}}>Last Air Date: {this.state.data_air_date}</Text>
          {this.getGenres()}
          <Text style={{fontSize: 12, color: 'white', paddingTop: 5}}>Number of Seasons: {this.state.data.number_of_seasons}</Text>
          {this.getNetworks()}
          <Text style={{fontSize: 12, color: 'white', paddingTop: 5}}>Overview: {this.state.data.overview}</Text>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    borderBottomWidth: 0.5,
    backgroundColor: 'white'
  },
  item: {
    fontSize: 12,
    color: 'white',
    paddingTop: 5
  },
  scene: {
    flex: 1,
  },
});
