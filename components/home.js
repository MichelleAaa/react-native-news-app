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
import { _api_key } from './newsAPI_config/API_key/API_key';

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
            <View style={styles.mainContainer}>
                <Search />
                <View style={styles.headerContainer}>
                    <Text style={styles.headerTitle}>
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
    mainContainer: {
        flex: 1,
        paddingVertical: 30,
        paddingHorizontal: 1,
        height: '100%',
        backgroundColor: '#a8dadc',
    },
    headerContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: '#cccccc',
        height: '100%',
        // backgroundColor: '#cccccc'
    },
    headerTitle: {
        // borderWidth: 1,
        // borderColor: '#cccccc',
        textAlign: 'center',
        width: '100%',
        height: '100%',
        fontSize: 20,
        fontWeight: "bold",
    },
    newsItemsWrapper: {
        flex: 10,
        // paddingTop: 30,
        paddingHorizontal: 1,
        marginHorizontal: 3
    }
});

export default Home;