import React, { useState } from "react";
import { View, StyleSheet, TextInput, Button, Modal, Alert } from 'react-native';
import { Text } from 'react-native-elements';
import axios from 'axios';
import NewsItem from "./newsItem";
import Loading from "./loading";
import { search_url, country_code, sortBy } from './newsAPI_config/search_config';
import { _api_key } from './newsAPI_config/API_key';

// temporary, while not requesting from API:
import tempData from "../data-temporary";

function Search() {
    const [enteredInputText, setEnteredInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // NOTE - Set to tempData only while not using API:
    const [data, setData] = useState(tempData);

    const [modalIsVisible, setModalIsVisible] = useState(false);//Modal is set to false for visibility to start.

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
        setModalIsVisible(true);
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
                <Button title="Search" onPress={addSearchHandler} />
            </View>
            <Modal visible={modalIsVisible} animationType="slide">
                <View>
                    <View style={styles.button}>
                        <Text>Search Results For: {enteredInputText}</Text>
                        <View style={styles.buttonContainer}>
                            <View style={styles.button}>
                                <Button title="Cancel" onPress={() => {
                                    setEnteredInputText('');
                                    setModalIsVisible(false);
                                }} />
                            </View>
                        </View>
                        <View>
                            <NewsItem data={data}/>
                        </View>
                    </View>
                </View>
            </Modal>
        </React.Fragment>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#cccccc',
        height: 40,
        width: '70%',
        marginRight: 8,
        padding: 8,
    }
});

export default Search;