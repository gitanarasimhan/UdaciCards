import React, {Component} from 'react'
import {View, StyleSheet, Platform, AsyncStorage, TouchableOpacity} from 'react-native'
import {
    Container,
    Header,
    Title,
    Content,
    Footer,
    FooterTab,
    Button,
    Left,
    Right,
    Body,
    Icon,
    Text,
    Card,
    CardItem
} from 'native-base';
import {purple, white, yellow} from '../utils/colors';
import Expo from 'expo'


export default class Decks extends Component {

    async componentWillMount() {
        await Expo.Font.loadAsync({
            'Roboto': require('native-base/Fonts/Roboto.ttf'),
            'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
        });
        this.setState({ loading: false });

    }
    state = {
        arr: [],
        loading: true
    }

    render() {
        if (this.state.loading) {
            return <Expo.AppLoading />;
        }
        AsyncStorage.getAllKeys().then((results) => {
            AsyncStorage.multiGet(results).then((result) => {
                this.setState({'arr': result});
            })
        })
        return (
            <Container>
                {this.state.arr.length === 0 &&
                <Content>
                    <Card>
                        <CardItem>
                            <Text style={{marginTop: 45, fontSize: 25, fontWeight: "bold"}}>Empty Deck</Text>
                        </CardItem>
                    </Card>
                </Content>
                }
                {this.state.arr.length > 0 && <Header><Text>Card Deck</Text></Header>}
                <Content>
                    {this.state.arr.length > 0 && Object.keys(this.state.arr).map((k) => {
                        return (
                            <TouchableOpacity onPress={() => this.props.navigation.navigate(
                                'DeckDetail',
                                {entryId: this.state.arr[k][0]}
                            )} key={this.state.arr[k][0]}>
                                <Card style={styles.deckName}>
                                    <CardItem style={{backgroundColor:"#67C8FF"}}>
                                        <Body>
                                        <Text style={{fontSize: 25, fontWeight: "bold"}}>
                                            {this.state.arr[k][0]}
                                        </Text>
                                        {JSON.parse(this.state.arr[k][1])["questions"].length <=1 && <Text style={styles.deckCount}>
                                            {JSON.parse(this.state.arr[k][1])["questions"].length} Card
                                        </Text>}
                                        {JSON.parse(this.state.arr[k][1])["questions"].length > 1 && <Text style={styles.deckCount}>
                                            {JSON.parse(this.state.arr[k][1])["questions"].length} Cards
                                        </Text>}
                                        </Body>
                                    </CardItem>
                                </Card>
                            </TouchableOpacity>
                        )
                    })}
                </Content>
            </Container>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 15,
        marginBottom: 15
    },
    deckName: {
        backgroundColor: "#67C8FF",
        borderRadius: Platform.OS === 'ios' ? 16 : 2,
        padding: 20,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 17,
        justifyContent: 'center',
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
            width: 0,
            height: 3
        },
    },
    deckCount: {
        marginTop: 10,
        fontSize: 15
    }

});

