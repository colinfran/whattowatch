import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Picker
}
from "react-native";
import Modal from "react-native-modal";

import Movie from "./Movie";
import MovieModal from "./MovieModal";

export default class MoviesTopRated extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      movieData: null,
      modalVisible: false,
      modalData: null,
      modalDataID: null,

    };
    this.updateDataForModal = this.updateDataForModal.bind(this);
    this.getTopRated = this.getTopRated.bind(this);
    this.removeNonEnglish = this.removeNonEnglish.bind(this);


  }

  componentDidMount() {
    this.getTopRated();
  }

  // API Call to get movie top rated data
  getTopRated(){
    return fetch("https://api.themoviedb.org/3/movie/top_rated?api_key=dbcdb9d96b827ad1d9d7f6c5d9e2d636&language=en-US&page=1&region=US")
      .then(response => response.json())
      .then(responseJson => {
        // console.log("TOP RATED" + JSON.stringify(responseJson.results));
        this.setState({
            isLoading: false,
            movieData: responseJson.results
          },
          function() {
            // console.log("asdfasdf" + JSON.stringify(this.state.movieData));
            this.removeNonEnglish();

          }
        );
      })
      .catch(error => {
        console.error(error);
      });
  }

  // function to return only english results
  removeNonEnglish(){
    var arr = this.state.movieData.slice(0);
    var newArr = [];
    for (var i = 0; i < arr.length; i++){
      if (arr[i].original_language == 'en'){
        newArr.push(arr[i]);
      }
    }
    this.setState({movieData: newArr});
  }

  // function to allow for children comonents to updateData in modal
  updateDataForModal(arg) {
    this.setState({
      modalDataID: arg,
      modalVisible: !this.state.modalVisible
    });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }
    else {
      return (
        <View style={{ backgroundColor: "#000", flex: 1, flexDirection: "column" }}>
          <FlatList
            data={this.state.movieData}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (<Movie updateModalData={this.updateDataForModal} data={item}/>)}
          />
          <Modal
            isVisible={this.state.modalVisible}
            style={{ alignItems: "center", }}
            hideModalContentWhileAnimating={true}
            onBackdropPress={() => this.setState({ modalVisible: !this.state.modalVisible })}

          >
            <MovieModal id={this.state.modalDataID} updateModalData={this.updateDataForModal}/>
          </Modal>
        </View>
      );
    }
  }
}
