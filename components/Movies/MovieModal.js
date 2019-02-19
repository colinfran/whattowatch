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
  ScrollView,
  Animated

}
from 'react-native';

import {Constants} from 'expo';
import renderIf from 'render-if'
import searchYoutube from 'youtube-api-v3-search';

import YTSearch from 'youtube-api-search';
import YouTube, { YouTubeStandaloneIOS, YouTubeStandaloneAndroid } from 'react-native-youtube';
import Video from 'react-native-video'
import { AntDesign } from '@expo/vector-icons';
import { TabView, SceneMap } from 'react-native-tab-view';

import RNAnimatedTabs from 'rn-animated-tabs';


const APIKEY = "AIzaSyD_MZfbF0l1mU5B3ygn43a-A5sDDEhcJWo";

var genres = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western"
};

import MovieInfo from "./MovieInfo";
import MovieTrailer from "./MovieTrailer";

const DATA = [MovieInfo, MovieTrailer];


export default class MovieModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      isLoading: true,
      currentTab: 0,


      isReady: false,

   videoLoading: true,
   routes: [
     { key: 'first', title: 'Info' },
     { key: 'second', title: 'Trailer' },
   ],
   index: 0,
    };
    this.getGenres = this.getGenres.bind(this);
  }

  handleTabChange = (value) => this.setState({ currentTab: value });


  getGenres() {
    var arr = this.state.genres.slice(0);
    var newArr = [];
    for (var g in arr){
      newArr.push(arr[g].name);
    }
    return (
      <Text style={{fontSize: 14}}>Genres: {newArr.join(", ")}</Text>
    );
  }

  componentDidMount() {
    return fetch("https://api.themoviedb.org/3/movie/" + this.state.id + "?api_key=dbcdb9d96b827ad1d9d7f6c5d9e2d636&language=en-US")
      .then(response => response.json())
      .then(responseJson => {
        console.log(this.state.id +": " + JSON.stringify(responseJson) + "\n\n");
        this.setState({
            isLoading: false,
            id: responseJson.id,
            title: responseJson.title,
            videoId: "",
            data: responseJson
          },
          function() {

          }
        );
      })
      .catch(error => {
        console.error(error);
      });
  }


  renderScene = ({ route }) => {
    switch (route.key) {
      case 'first':
        return <MovieInfo data={this.state.data}/>;
      case 'second':
        return <MovieTrailer title={this.state.title} videoLoading={this.state.videoLoading}  />;
      default:
        return null;
    }
  }

  renderTabBar = props => {
    const inputRange = props.navigationState.routes.map((x, i) => i);

    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => {
          const color = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map(
              inputIndex => (inputIndex === i ? '#fff' : 'grey')
            ),
          });
          return (
            <TouchableOpacity
              key={i}
              style={styles.tabItem}
              onPress={() => this.setState({ index: i })}>
              <Animated.Text key={i} style={{ color }}>{route.title}</Animated.Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
        </View>
      );
    }
    else {
      return (
          <View style={styles.container}>
            <TouchableOpacity style={{alignItems: 'flex-end'}} onPress={() => this.props.updateModalData(this.state.data.id)}>
              <AntDesign name="downcircleo" size={32} color="white" />
            </TouchableOpacity>
            <View style={{flexDirection: 'row'}}>
              <View style={{paddingRight:10}}>
                <Image source={{uri: 'https://image.tmdb.org/t/p/w500/'+ this.state.data.poster_path}} style={{width: 125, height: 188}} ></Image>
              </View>
              <View style={{flexDirection: 'column', width: '40%'}}>
                <Text style={styles.item, {flexWrap: 'wrap', color: 'white'}}>{this.state.data.title}</Text>
                <Text style={styles.item , {flexWrap: 'wrap', color: 'white'}}>ID: {this.state.data.id}</Text>
              </View>
            </View>
            <View style={{height:200, marginTop: 10}}>
              <TabView
                  navigationState={this.state}
                  renderScene={this.renderScene}
                  onIndexChange={index => this.setState({ index })}
                  initialLayout={{ width: Dimensions.get('window').width, height: 0 }}

                />
            </View>
          </View>

      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    borderBottomWidth: 0.5,
    backgroundColor: '#232b2b'
  },
  item: {
    fontSize: 16,
    width: 300
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor:'#353839'
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
});
