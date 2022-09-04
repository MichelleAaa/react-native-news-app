import React, { useState } from "react";
import { View, StyleSheet, TextInput, Button, Pressable, Modal, Alert } from 'react-native';
import { Text } from 'react-native-elements';
import axios from 'axios';
import NewsItem from "./newsItem" ;
import Loading from "./loading";
import { search_url, country_code, sortBy } from './newsAPI_config/search_config';
import { _api_key } from './newsAPI_config/API_key/API_key';

// temporary, while not requesting from API:
import tempData from "../data-temporary";

function Search() {
    const [enteredInputText, setEnteredInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // NOTE - Set to tempData only while not using API:
    const [data, setData] = useState(tempData);

    const [searchModalIsVisible, setSearchModalIsVisible] = useState(false);//Modal will be closed to start.

    function textInputHandler(enteredText) {
        setEnteredInputText(enteredText);
    }

    // SENDS REQUEST FOR API DATA - LIMIT 100 PER DAY SO TURNED OFF TEMPORARILY:
    function addSearchHandler() {
        if(enteredInputText != ''){
            setIsLoading(true);

        //Search by the input text term:
        // axios.get(`${search_url}?q=${enteredInputText}&sortBy=${sortBy}`, {
        //     headers: {
        //         'X-API-KEY': _api_key
        //     }
        // })
        // .then(data => {
        //     setIsLoading(false);
        //     setData(data.data.articles);
        // })
        // .catch(function (error){
            // setIsLoading(false);
        //     console.log(error);
        // });

        setIsLoading(false); //TEMPORARY
        setSearchModalIsVisible(true);
        } else {
            Alert.alert(
                "Error",
                "Please enter a search term in the input box to continue.",
                [
                    {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                    }
                ]
            );
        }
    }

    if (isLoading) {
        return <Loading />;
    }

    return (
        <React.Fragment>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Enter search term here..."
                    onChangeText={textInputHandler}
                    value={enteredInputText}
                />

                <View style={styles.buttonContainer}>
                    <View style={styles.buttonOuterContainer}>
                        <Pressable
                        style={({ pressed }) =>
                        pressed
                            ? [styles.buttonInnerContainer, styles.pressed]
                            : styles.buttonInnerContainer
                        }
                        onPress={() => addSearchHandler()}
                        android_ripple={{ color: '#457b9d' }}
                        >
                            <Text style={styles.buttonText}>Search</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
            <Modal visible={searchModalIsVisible} animationType="slide">
                {/* <View> */}
                    <View style={styles.searchContainer}>
                        <View style={styles.searchTextContainer}>
                            <Text style={styles.searchText}>Search Results For: {enteredInputText}</Text>
                        </View>
                        <View style={styles.buttonContainer}>
                            <View style={styles.buttonOuterContainer}>
                                <Pressable
                                style={({ pressed }) =>
                                pressed
                                    ? [styles.buttonInnerContainer, styles.pressed]
                                    : styles.buttonInnerContainer
                                }
                                onPress={() => {
                                    setEnteredInputText('');
                                    setSearchModalIsVisible(false);
                                }}
                                android_ripple={{ color: '#457b9d' }}
                                >
                                    <Text style={styles.buttonText}>Cancel</Text>
                                </Pressable>
                            </View>
                        </View>
                        <View>
                            <NewsItem data={data}/>
                        </View>
                    </View>
                {/* </View> */}
            </Modal>
        </React.Fragment>
    );
}

const styles = StyleSheet.create({
    searchContainer: {
        margin: 1,
        backgroundColor: '#a8dadc',
        // flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center'

    },
    searchTextContainer: {
        margin: 5,
        padding: 20,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    searchText: {
        fontSize: 22
    },
    inputContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
        // borderBottomWidth: 1,
        // borderBottomColor: '#cccccc',
        backgroundColor: '#a8dadc',
        padding: 4
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#cccccc',
        height: 40,
        width: '70%', 
        marginRight: 8,
        padding: 8,
        borderRadius: 28,
        backgroundColor: '#edf6f9'
    },
    buttonContainer: {
        // backgroundColor: '#457b9d',
        paddingBottom: 2,
        borderBottomWidth: 2,
        borderBottomColor: '#cccccc',
    },
    buttonOuterContainer: {
        borderRadius: 28,
        margin: 4,
        overflow: 'hidden',
    },
    buttonInnerContainer: {
        backgroundColor: '#457b9d',
        paddingVertical: 8,
        paddingHorizontal: 16,
        elevation: 2,//note that this is for android, there’s no equivalent (elevation feature) in ios. Instead, you would have to use shadow properties for ios. Such as shadowColor etc.
        shadowOffset: { width: 0, height: 2 } //how much the shadow should be offset from the original object, from the left and height. Requires object.
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
    pressed: {
        opacity: 0.75,
    }
});

export default Search;