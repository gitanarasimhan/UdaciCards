import {AsyncStorage} from 'react-native';

export function getDecks() {
    AsyncStorage.getAllKeys().then((results) => {
        AsyncStorage.multiGet(results).then((result) => {
            return result;
        })
    })
}