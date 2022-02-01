import { StyleSheet, Platform } from 'react-native';
import Colors from './Colors';

export default StyleSheet.create({
    button: {
        margin: 10,
        borderWidth: 1,
        borderColor: Colors.dawnPink,
        borderRadius: 7,
        padding: 5
    },
    buttonText: {
        fontSize: 16,
        color: Colors.black,
    },
})