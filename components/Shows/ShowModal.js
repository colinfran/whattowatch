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
import { AntDesign } from '@expo/vector-icons';
import { TabView, SceneMap } from 'react-native-tab-view';

import ShowInfo from "./ShowInfo";
import ShowTrailer from "./ShowTrailer";


export default class ShowModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      isLoading: true,
      currentTab: 0,
      videoLoading: true,
      routes: [
        { key: 'first', title: 'Info' },
        { key: 'second', title: 'Trailer' },
      ],
      index: 0,
    };
    this.getTVData = this.getTVData.bind(this);
  }

  componentDidMount() {
    this.getTVData();
  }


  getTVData(){
      return fetch("https://api.themoviedb.org/3/tv/" + this.state.id + "?api_key=dbcdb9d96b827ad1d9d7f6c5d9e2d636&language=en-US&append_to_response=videos")
        .then(response => response.json())
        .then(responseJson => {
          this.setState({
              id: responseJson.id,
              title: responseJson.title,
              videoId: "",
              data: responseJson,
              videoData: responseJson.videos.results,
              isLoading: false,
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
        return <ShowInfo data={this.state.data} />;
      case 'second':
        return <ShowTrailer videoData={this.state.videoData} movieId={this.state.id} title={this.state.title} videoLoading={this.state.videoLoading}   />;
      default:
        return null;
    }
  }

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
                <Text style={styles.item, {flexWrap: 'wrap', color: 'white'}}>{this.state.data.name}</Text>
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
