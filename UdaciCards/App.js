import React from 'react';
import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation'
import { purple, white } from './utils/colors'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { Constants } from 'expo'
import  Decks  from './components/Decks';
import  NewDeck  from './components/NewDeck';
import  DeckDetail  from './components/DeckDetail';
import AddCard from './components/AddCard'
import Quiz from './components/Quiz'



const Tabs = TabNavigator({
    Decks: {
        screen: Decks,
        navigationOptions: {
            tabBarLabel: 'Decks',
            tabBarIcon: ({ tintColor }) => <Ionicons name='ios-folder' size={30} color={tintColor} />
        },
    },
    NewDeck: {
        screen: NewDeck,
        navigationOptions: {
            tabBarLabel: 'New Decks',
            tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
        },
    }
}, {
    navigationOptions: {
        header: null
    },
    tabBarOptions: {
        activeTintColor: Platform.OS === 'ios' ? purple : white,
        style: {
            height: 56,
            backgroundColor: Platform.OS === 'ios' ? white : purple,
            shadowColor: 'rgba(0, 0, 0, 0.24)',
            shadowOffset: {
                width: 0,
                height: 3
            },
            shadowRadius: 6,
            shadowOpacity: 1,
        }
    }
})

const MainNavigator = StackNavigator({
    Home: {
        screen: Tabs,
    },
    DeckDetail: {
        screen: DeckDetail,
        navigationOptions: {
            headerTintColor: white,
            headerStyle: {
                backgroundColor: purple,
            },
            passProps: {index: 1}
        }
    },
    AddCard: {
        screen: AddCard,
        navigationOptions: {
            headerTintColor: white,
            headerStyle: {
                backgroundColor: purple,
            }
        }
    },
    Quiz: {
        screen: Quiz,
        navigationOptions: {
            headerTintColor: white,
            headerStyle: {
                backgroundColor: purple,
            }
        }
    }
})


export default class App extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
          <MainNavigator/>
      </View>
    );
  }
}
