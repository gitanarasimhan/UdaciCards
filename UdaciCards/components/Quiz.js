import React, {Component} from 'react'
import {StyleSheet, View, TextInput, TouchableOpacity, AsyncStorage, Platform} from 'react-native'
import {purple, black, white, yellow} from '../utils/colors'
import Expo from 'expo'
import {clearLocalNotification, setLocalNotification} from '../utils/helpers'


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
    Form,
    Right
} from 'native-base';


function QuestionBtn({onPress}) {
    return (
        <TouchableOpacity
            style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
            onPress={onPress}>
            <Text style={styles.submitBtnText}>Question</Text>
        </TouchableOpacity>
    )
}

export default class AddCard extends Component {
    async componentWillMount() {
        await Expo.Font.loadAsync({
            'Roboto': require('native-base/Fonts/Roboto.ttf'),
            'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
        });
        this.setState({loading: false});
    }

    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            questions: [],
            score: 0,
            quizComplete: false,
            answerBtn: false,
            loading: true
        };
    }

    static navigationOptions = ({navigation}) => {
        const {entryId} = navigation.state.params
        return {
            title: "Quiz"
        }
    }
    updateScore = (type) => {
        var c = this.state.count;
        if (this.state.questions.length > c + 1) {
            this.setState({count: this.state.count + 1});
        } else {
            this.setState({"quizComplete": true});
            clearLocalNotification()
                .then(setLocalNotification)
        }

        if (type === "correct") {
            this.setState({"score": this.state.score + 1});
        }
    }

    restartQuiz = () => {
        this.setState({count: 0});
        this.setState({"quizComplete": false});
    }

    componentDidMount() {
        AsyncStorage.getItem(this.props.navigation.state.params["entryId"]).then((result) => {
            this.setState({"questions": JSON.parse(result)["questions"]});
        })
    }

    render() {
        if (this.state.loading) {
            return <Expo.AppLoading />;
        }
        return (
            <Container>
                <Content>
                    {!this.state.quizComplete && !this.state.answerBtn &&
                        <Body >
                        <Text style={{marginTop: 45, marginBottom: 20, marginLeft: 300, fontWeight: "bold"}}>
                            {this.state.count + 1} / {this.state.questions.length}
                        </Text>
                        <Text style={{marginTop: 55, marginBottom: 20, fontWeight: "bold"}}>
                            {JSON.stringify(this.state.questions[this.state.count]) !== undefined && JSON.stringify(this.state.questions[this.state.count]["question"])}
                        </Text>
                        <Text style={{fontStyle: "italic", marginBottom: 20}}>
                            <Text>Is it</Text>
                            - {JSON.stringify(this.state.questions[this.state.count]) !== undefined && JSON.stringify(this.state.questions[this.state.count]["answer"])}
                        </Text>
                        <Body>
                        <Button transparent danger onPress={() => this.setState({"answerBtn": true})}
                                style={{marginLeft: 47}}>
                            <Text>Answer</Text>
                        </Button>
                        <Button rounded onPress={() => this.updateScore("correct")}
                                style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}>
                            <Text>Correct</Text>
                        </Button>
                        <Button rounded onPress={() => this.updateScore("incorrect")}
                                style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}>
                            <Text>Incorrect</Text>
                        </Button>
                        </Body>
                        </Body>}
                    {this.state.answerBtn && <Body>
                    <Text style={{marginTop: 55, marginBottom: 20, fontWeight: "bold", fontSize: 25}}>
                        YES
                    </Text>
                    <Button transparent danger onPress={() => this.setState({"answerBtn": false})}
                            style={{marginLeft: 5}}>
                        <Text>Question</Text>
                    </Button>
                    </Body>}
                    {this.state.quizComplete &&
                    <Body>
                    <Text style={{marginTop: 55, marginBottom: 20, fontStyle: "italic"}}>Score of the Quiz is:</Text>
                    <Text style={{
                        marginBottom: 20,
                        fontWeight: "bold"
                    }}>{this.state.score / this.state.questions.length * 100} %</Text>
                    <Button rounded onPress={this.restartQuiz}
                            style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}>
                        <Text>Restart Quiz</Text>
                    </Button>
                    <Button rounded onPress={() => this.props.navigation.navigate(
                        'DeckDetail',
                        {entryId: this.props.navigation.state.params["entryId"]}
                    )} style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}>
                        <Text>Back to Deck</Text>
                    </Button>
                    </Body>}

                </Content>
            </Container>

        )
    }
}

const styles = StyleSheet.create({
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
        borderRadius: 2,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    }
})
