import React, {Component} from 'react'
import {StyleSheet, View, TextInput, TouchableOpacity, AsyncStorage, Platform} from 'react-native'
import {purple, black, white, yellow} from '../utils/colors'
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

export default class AddCard extends Component {

    async componentWillMount() {
        await Expo.Font.loadAsync({
            'Roboto': require('native-base/Fonts/Roboto.ttf'),
            'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
        });
        this.setState({ loading: false });
    }
    static navigationOptions = ({navigation}) => {
        const {entryId} = navigation.state.params
        return {
            title: "Add Card"
        }
    }

    state = {
        question: '',
        answer: '',
        loading: true
    }
    addNewCard = () => {
        if(this.state.question !== "" && this.state.answer !== "") {
            const newState = {
                question: this.state.question,
                answer: this.state.answer
            }
            var questions = [];
            AsyncStorage.getItem(this.props.navigation.state.params["entryId"]).then((result) => {
                JSON.parse(result)["questions"].map((question) => {
                    questions.push(question)
                })
                questions.push(newState);
                const reactState = {
                    questions: questions

                }
                AsyncStorage.mergeItem(this.props.navigation.state.params["entryId"], JSON.stringify(reactState)).then((result) => {
                    this.props.navigation.goBack();
                });
            });

        } else {
            alert("Please enter a valid question and answer");
        }

    }

    render() {
        if (this.state.loading) {
            return <Expo.AppLoading />;
        }
        return (
                <Container>
                    <Content>
                        <Form >
                            <Item floatingLabel>
                                <Label>Question</Label>
                                <Input
                                    onChangeText={(text) => this.setState({"question": text})}
                                    value={this.state.question}/>
                            </Item>
                            <Item floatingLabel>
                                <Label>Answer</Label>
                                <Input
                                    onChangeText={(text) => this.setState({"answer": text})}
                                    value={this.state.answer}/>
                            </Item>
                            <Body>
                            <Button rounded light onPress={this.addNewCard}
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
        backgroundColor: purple,
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
