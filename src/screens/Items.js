import React from 'react';
import { SafeAreaView, FlatList, ActivityIndicator, TouchableOpacity, Text } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../actions/GetItem";
import Colors from './themes/Colors';
import Styles from './themes/Styles';

const itemsList = [{ id: 1, name: "King Size Bed", price: "300", img: "./img/bed.jpg" },
{ id: 2, name: "Comfy Slippers", price: "15", img: "./img/slippers.jpg" },
{ id: 3, name: "CD Rack", price: "100", img: "./img/rack.jpg" },
{ id: 4, name: "Glow Stick Bundle", price: "10", img: "./img/sticks.jpg" },
{ id: 5, name: "Cookie Jar", price: "25", img: "./img/cookies.jpg" }]

var db = openDatabase({ name: 'items.db' });

export class Items extends React.Component {
    constructor() {
        super();
        db.transaction(function (txn) {
            txn.executeSql(
                'CREATE TABLE IF NOT EXISTS table_items(item_id INTEGER PRIMARY KEY AUTOINCREMENT, item_name VARCHAR(20))',
                []
            )
        });

    }

    componentDidMount() {
        this.props.actions.getItems()
    }

    saveItemLocally = (item) => {
        db.transaction(function (tx) {
            tx.executeSql(
                'INSERT INTO table_items (item_name) VALUES (?)'
                [item.name],
                (tx, results) => {
                    console.log('Results', results.rowsAffected);
                    if (results.rowsAffected > 0) {
                        Alert.alert(
                            'Success',
                            'Item Added to Cart Successfully',
                            [
                                {
                                    text: 'Ok',
                                },
                            ],
                            { cancelable: false }
                        );
                    } else alert('Failed to add the item in cart');
                }
            );
        });

    }

    renderItems = ({ item }) => {
        return (
            <TouchableOpacity style={Styles.button} onPress={() => {this.saveItemLocally(item) }}>
                <Text style={Styles.buttonText}>
                    {item.name}
                </Text>
            </TouchableOpacity>
        )
    }

    render() {
        const { items } = this.props;
        return (
            <SafeAreaView>
                {items.loading && <ActivityIndicator color={Colors.dawnPink} size={60} />}

                {/* it should be items.list but since not getting api response from the end point provided so using static list */}

                {!items.loading && <FlatList
                    data={itemsList}
                    renderItem={this.renderItems}
                    keyExtractor={item => item.id}
                />
                }
            </SafeAreaView>
        );
    }
};

function mapStateToProps(state) {
    return {
        items: state.items,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Items);