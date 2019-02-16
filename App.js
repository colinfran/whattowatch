import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView
}
from 'react-native';
import TopBarNav from 'top-bar-nav';
import Movies from './components/Movies';
import Shows from './components/Shows';

const ROUTES = {
  Movies,
  Shows
};

const ROUTESTACK = [{
  text: 'Movies',
  title: 'Movies'
}, {
  text: 'TV Shows',
  title: 'Shows'
}];

export default class App extends React.Component {
  constructor(props) {
    super(props);
    console.log("\n\n\n\n\n\n\n\n\n\n");
  }
  
  render() {
    return (
      <SafeAreaView style={{
        flex: 1,
        backgroundColor: 'lightgrey'
      }}>
      <TopBarNav
        routeStack={ROUTESTACK}
        renderScene={(route, i) => { let Component = ROUTES[route.title]; return <Component index={i}/>;}}
        headerStyle={[styles.headerStyle, {paddingTop: 30}]}
        labelStyle={styles.labelStyle}
        underlineStyle={styles.underlineStyle}
        imageStyle={styles.imageStyle}
        sidePadding={40}
        initialIndex={0}
        inactiveOpacity={1}
        fadeLabels={true}
      />
    </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  headerStyle: {
    borderBottomWidth: 1,
    borderColor: '#e6faff',
    backgroundColor: 'lightgrey'
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
    backgroundColor: '#e6faff',
    width: 40
  }
});
