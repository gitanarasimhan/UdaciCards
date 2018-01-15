import React, { Component } from 'react'
import { StyleSheet, View, TextInput, TouchableOpacity, AsyncStorage, Platform } from 'react-native'
import { purple, black, white, yellow } from '../utils/colors'
import {
    Container,
    Header,
    Title,
    Content,
    Footer,
    FooterTab,
    Button,
    Input,
    Label,
    Body,
    Item,
    Text,
    Form
} from 'native-base';
import Expo from 'expo'




export default class NewDeck extends Component {

    async componentWillMount() {
        await Expo.Font.loadAsync({
            'Roboto': require('native-base/Fonts/Roboto.ttf'),
            'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
        });
        this.setState({ loading: false });
    }
    state = { text: '' , loading:true}
    addNewDeck = () => {
        AsyncStorage.clear();
        var title = "";
        if(this.state.text !== "") {
            var array = this.state.text.split(' ');
            for(var i = 0 ; i<array.length; i++) {
                title = title + array[i];
            }
            const reactState = {
                title: this.state.text,
                questions: []
            }
            AsyncStorage.setItem( this.state.text, JSON.stringify(reactState)).then((result) => {
                this.setState({"text": ""});
                this.props.navigation.navigate(
                    'DeckDetail',
                    {entryId: reactState["title"]}
                )
            });
        }
        else {
            alert("Please enter a deck title");
        }
    }
    render() {
        if (this.state.loading) {
            return <Expo.AppLoading />;
        }
        return (
            <Container>
                <Header><Text>Add Deck</Text></Header>
                <Content>
                    <Form >
                        <Item floatingLabel>
                            <Label>Deck Title</Label>
                            <Input
                                   onChangeText={(text) => this.setState({text})}
                                   value={this.state.text} />
                        </Item>
                        <Body>
                        <Button rounded light onPress={this.addNewDeck}
                                style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}>
                            <Text>SUBMIT</Text>
                        </Button></Body>

                    </Form>
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 25,
        marginBottom: 25,
        marginLeft: 10,
        marginRight: 10,
    },
    iosSubmitBtn: {
        backgroundColor: purple,
        padding: 10,
        height: 45,
        marginLeft: 40,
        marginRight: 40,
        marginTop: 20
    },
    AndroidSubmitBtn: {
        backgroundColor: yellow,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        height: 45,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    submitBtnText: {
        color: white,
        fontSize: 22,
        textAlign: 'center',
    },
})
