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



export default class MovieInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      data_release_date: null,
    };
    this.getGenres = this.getGenres.bind(this);
    this.getDate = this.getDate.bind(this);
  }

  componentDidMount(){
    this.getDate();
  }

  // This function returns a string containing each genre in genre array
  getGenres() {
    var arr = this.state.data.genres.slice(0);
    var newArr = [];
    for (var g in arr)
      newArr.push(arr[g].name);
    return <Text style={{fontSize: 12, color: 'white', paddingTop: 5}}>Genres: {newArr.join(", ")}</Text>
  }


  // This function converts a date string into the wanted format   
  getDate(){
    var myDate = this.state.data.release_date;
    var chunks = myDate.split('-');
    var formattedDate = chunks[1]+'/'+chunks[2]+'/'+chunks[0];
    const dateFormat = new Date(formattedDate);
    var strDate = dateFormat.toLocaleString("en", { month: "long"  }) + ' ' + dateFormat.toLocaleString("en", { day: "numeric" }) + ', ' + dateFormat.toLocaleString("en", { year: "numeric"});
    this.setState({data_release_date: strDate});
  }


  render() {
    return(
      <View style={[{flex: 1, paddingTop: 5, backgroundColor: '#121D1D' }]}>
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
          <Text style={{fontSize: 12, color: 'white', paddingTop: 5}}>Release Date: {this.state.data_release_date}</Text>
          {this.getGenres()}
          <View style={{flexDirection:'row', paddingTop: 5}}>
            <Text style={{fontSize: 12, color: 'lightblue'}} onPress={() => Linking.openURL(this.state.data.homepage)}>{this.state.data.homepage}</Text>
          </View>
          <Text style={{fontSize: 10, color: 'white', paddingTop: 5}}>{this.state.data.overview}</Text>

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
    fontSize: 16,
    width: 300
  },
  scene: {
    flex: 1,
  },
});
