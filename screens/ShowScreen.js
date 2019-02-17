import React from 'react';
import {
  View,
  Text,
  StyleSheet,
}
from 'react-native';
import TopBarNav from 'top-bar-nav';
import ShowsDay from '../components/ShowsDay';
import ShowsWeek from '../components/ShowsWeek';

const ROUTES = {
  ShowsDay,
  ShowsWeek
};

const ROUTESTACK = [{
  text: 'Today',
  title: 'ShowsDay'
}, {
  text: 'This Week',
  title: 'ShowsWeek'
}];

export default class ShowScreen extends React.Component {
  constructor(props) {
    super(props);
    console.log("\n\n\n\n\n\n\n\n\n\n");
  }

  render() {
    return (
      <View style={{
        flex: 1,
        backgroundColor: 'lightgrey'
      }}>
      <TopBarNav
        routeStack={ROUTESTACK}
        renderScene={(route, i) => { let Component = ROUTES[route.title]; return <Component index={i}/>;}}
        headerStyle={[styles.headerStyle, {paddingTop: 15}]}
        labelStyle={styles.labelStyle}
        underlineStyle={styles.underlineStyle}
        imageStyle={styles.imageStyle}
        sidePadding={40}
        initialIndex={0}
        inactiveOpacity={1}
        fadeLabels={true}
      />
    </View>
    );
  }
}

const styles = StyleSheet.create({
  headerStyle: {
    borderBottomWidth: 1,
    borderColor: 'lightgrey',
    backgroundColor: '#fff'
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
    backgroundColor: '#000',
    width: 40
  }
});
