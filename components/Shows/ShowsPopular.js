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

import Show from "./Show";
import ShowModal from "./ShowModal";

export default class ShowsPopular extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      showData: null,
      modalVisible: false,
      modalData: null,
      modalDataID: null,

    };
    this.updateDataForModal = this.updateDataForModal.bind(this);
    this.getData = this.getData.bind(this);

  }

  componentDidMount() {
    this.getData();
  }


  // API Call to get TV popular data
  getData(){
    return fetch("https://api.themoviedb.org/3/discover/tv?api_key=dbcdb9d96b827ad1d9d7f6c5d9e2d636&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1")
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
            isLoading: false,
            showData: responseJson.results
          },
          function() {}
        );
      })
      .catch(error => {
        console.error(error);
      });
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
            data={this.state.showData}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (<Show updateModalData={this.updateDataForModal} data={item}/>)}
          />
          <Modal
            isVisible={this.state.modalVisible}
            onBackdropPress={() => this.setState({ modalVisible: !this.state.modalVisible })}
            style={{ alignItems: "center" }}
            hideModalContentWhileAnimating={true}
          >
            <ShowModal  id={this.state.modalDataID} updateModalData={this.updateDataForModal}/>
          </Modal>
        </View>
      );
    }
  }
}
