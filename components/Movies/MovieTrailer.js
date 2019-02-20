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
      videoData: this.props.videoData,
    };
  }

  componentDidMount(){
    this.setState({videoLoading: false});
  }

  renderVideos() {
    return this.state.videoData.map((item, index) =>
      <View style={{flex: 1, marginBottom: 30}} key={index}>
        <WebView
            style={{flex:1, backgroundColor: '#121D1D', height: 200, }}
            javaScriptEnabled={true}
            scrollEnabled={false}
            source={{uri: 'https://www.youtube.com/embed/' + item.key + '?rel=0&autoplay=0&showinfo=0&controls=0'}}
        />
      </View>

  );
  }


  render() {
    return(
      <ScrollView style={{flex:1, backgroundColor: '#121D1D'}}>
        {renderIf(!this.state.videoLoading)(() => (
          this.renderVideos()
        ))}
        {renderIf(this.state.videoLoading)(() => (
          <View style={{ flex: 1, padding: 20 }}>
            <ActivityIndicator />
          </View>
        ))}
      </ScrollView>
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
