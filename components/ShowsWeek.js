import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableHighlight
}
from 'react-native';
import Modal from "react-native-modal";

import Show from './Show';
import ShowInfo from './ShowInfo';

export default class ShowsWeek extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      tvData: null,
      modalVisible: false,
      modalData: null,
    };
    this.updateDataForModal = this.updateDataForModal.bind(this);
  }

  componentDidMount() {
    return fetch('https://api.themoviedb.org/3/trending/tv/week?api_key=dbcdb9d96b827ad1d9d7f6c5d9e2d636')
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log(responseJson.results);
        this.setState({
          isLoading: false,
          tvData: responseJson.results
        }, function() {});
      })
      .catch((error) => {
        console.error(error);
      });
  }

  updateDataForModal(arg) {
    this.setState({
      modalData: arg,
      modalVisible: !this.state.modalVisible
    });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }
    else {
      return (
        <View style={{backgroundColor:"white", flex: 1}}>
          <FlatList
             data={this.state.tvData}
             keyExtractor={(item, index) => index.toString()}
             renderItem={({item}) => <Show updateModalData={this.updateDataForModal} data={item}></Show>}
             />
           <Modal
             isVisible={this.state.modalVisible}
              onBackdropPress={() => this.setState({ modalVisible: !this.state.modalVisible })}
              style={{ alignItems: "center" }}
              hideModalContentWhileAnimating={true}
             >
             <ShowInfo data={this.state.modalData}></ShowInfo>
           </Modal>
        </View>
      );
    }
  }
}
