import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import MovieScreen from '../screens/MovieScreen';
import ShowScreen from '../screens/ShowScreen';

const MovieStack = createStackNavigator({
  Movie: MovieScreen,
});

MovieStack.navigationOptions = {
  header: null,
headerLeft: null,
  tabBarLabel: 'Movies',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={'clapperboard'}
    />
  ),
};


const ShowStack = createStackNavigator({
  Show: ShowScreen,
});

ShowStack.navigationOptions = {
  header: null,
  headerLeft: null,

  tabBarLabel: 'TV',
  style: {
    backgroundColor:'#fff'
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={'tv'}
    />
  ),
};

const TabNav = createBottomTabNavigator(
  {
    MovieStack: {
      screen: MovieStack,
    },
    ShowStack: {
      screen: ShowStack,
    },
  },
  {
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: '#fff',
      inactiveTintColor: '#404040',
      style: {
        backgroundColor: '#000',
      },
      labelStyle: {
        fontSize: 13,
      },
    },
});


export default TabNav;
