import React, {Component} from 'react'
import {View, StyleSheet, Platform, AsyncStorage, TouchableOpacity} from 'react-native'
import {purple, white, yellow} from '../utils/colors';
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

export default class Decks extends Component {
    state = {
        deckData :{}
    }
    static navigationOptions = ({ navigation }) => {
        const { entryId } = navigation.state.params
        return {
            title: entryId
        }
    }

    componentDidMount() {
        AsyncStorage.getItem(this.props.navigation.state.params["entryId"]).then((result) => {
            this.setState({"deckData" : JSON.parse(result)});
        })
    }
    render() {


        return (
                <Container key={this.state.deckData["title"]}>
                    <Content >
                        <Body style={{marginTop: 55}}>
                        <Text style={{fontSize: 25, fontWeight: "bold"}}>
                            {this.state.deckData["title"]}
                        </Text>
                        {this.state.deckData["questions"] && this.state.deckData["questions"].length <= 1 && <Text style={styles.deckCount}>
                            {this.state.deckData["questions"] && this.state.deckData["questions"].length} Card
                        </Text>}
                        {this.state.deckData["questions"] && this.state.deckData["questions"].length > 1 && <Text style={styles.deckCount}>
                            {this.state.deckData["questions"] && this.state.deckData["questions"].length} Cards
                        </Text>}
                        <Button rounded bordered onPress={() => this.props.navigation.navigate(
                            'AddCard',
                            { entryId:this.state.deckData["title"] }
                        )}
                                style={[Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn, {backgroundColor: white}]}>
                            <Text>ADD CARD</Text>
                        </Button>
                        <Button rounded light onPress={() => this.props.navigation.navigate(
                            'Quiz',
                            { entryId:this.state.deckData["title"] }
                        )}
                                style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}>
                            <Text>START QUIZ</Text>
                        </Button>
                        </Body>
                    </Content>
                </Container>
        )
    }
}

const styles = StyleSheet.create({
    deckCount: {
        marginTop: 20,
        fontSize: 15
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
    }
});