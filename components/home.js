import React, { useState, useEffect } from "react";
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import Loading from "./loading";
import NewsItem from "./newsItem";
import Search from "./search";

// temporary, while not requesting from API:
import tempData from "../data-temporary";
import axios from 'axios';

import { articles_url, country_code, category } from './newsAPI_config/general_config';
import { _api_key } from './newsAPI_config/API_key';

function Home() {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState(tempData);

    // SENDS REQUEST FOR API DATA - LIMIT 100 PER DAY SO TURNED OFF TEMPORARILY (Later, set data back to '' to start and remove tempData):
    // useEffect(() => {
    //     axios.get(`${articles_url}?country=${country_code}&category=${category}`, {
    //         headers: {
    //             'X-API-KEY': _api_key
    //         }
    //     })
    //     .then(data => {
    //         setIsLoading(false);
    //         setData(data.data.articles);
    //     })
    //     .catch(function (error){
    //         console.log(error);
    //     })
    // }, []);
    
    // if (isLoading) {
    //     return <Loading />;
    // }

    return (
        <React.Fragment>
            <View style={styles.newsContainer}>
                <Search />
                <View style={styles.headerContainer}>
                    <Text style={styles.newsHeader}>
                        General News
                    </Text>
                </View>
                <View style={styles.newsItemsWrapper}>
                    <NewsItem data={data} key={1}/>
                </View>
            </View>
        </React.Fragment>
    );
}

const styles = StyleSheet.create({
    newsContainer: {
        flex: 1,
        paddingVertical: 30,
        paddingHorizontal: 1
    },
    headerContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // paddingVertical: 3,
        borderBottomWidth: 2,
        borderBottomColor: '#cccccc'
    },
    newsHeader: {
        // borderWidth: 1,
        // borderColor: '#cccccc',
        textAlign: 'center',
        width: '100%',
        // marginRight: 8,
        // padding: 8
    },
    // inputContainer: {
    //     flex: 1,
    //     flexDirection: 'row',
    //     justifyContent: 'space-between',
    //     alignItems: 'center',
    //     marginBottom: 24,
    //     borderBottomWidth: 1,
    //     borderBottomColor: '#cccccc',
    // },
    // textInput: {
    //     borderWidth: 1,
    //     borderColor: '#cccccc',
    //     width: '70%',
    //     marginRight: 8,
    //     padding: 8,
    // },
    newsItemsWrapper: {
        flex: 10,
        // paddingTop: 30,
        paddingHorizontal: 1,
        marginHorizontal: 3
    }
});

export default Home;