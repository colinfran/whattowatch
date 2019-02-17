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

  tabBarLabel: 'TV',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={'tv'}
    />
  ),
};

export default createBottomTabNavigator({
  MovieStack,
  ShowStack,
});
