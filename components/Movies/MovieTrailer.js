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


export default class MovieTrailer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      videoLoading: this.props.videoLoading,
      videoId: null,
    };
  }

  componentDidMount(){
    this.setState({videoId: "8bYBOVWLNIs", videoLoading: false});
    // var query = this.state.title + " trailer";
    // YTSearch( {key: APIKEY, term: query}, videos => {
    //   console.log(videos);
    //     this.setState({videoId: videos[0].id.videoId, videoLoading: false});
    //   }
    // );
  }


  render() {
    return(
      <View style={{flex:1}}>
        {renderIf(!this.state.videoLoading)(() => (
          <WebView
              style={{flex:1, marginTop: 10, backgroundColor: '#232b2b'}}
              javaScriptEnabled={true}
              scrollEnabled={false}
              source={{uri: 'https://www.youtube.com/embed/' + this.state.videoId + '?rel=0&autoplay=0&showinfo=0&controls=0'}}
          />
        ))}
        {renderIf(this.state.videoLoading)(() => (
          <View style={{ flex: 1, padding: 20 }}>
            <ActivityIndicator />
          </View>
        ))}
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
