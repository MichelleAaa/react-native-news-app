import React, { useState, useEffect } from "react";
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import Loading from "./loading";
import NewsItem from "./newsItem";
import Search from "./search";

import axios from 'axios';
import { useFonts, Roboto_300Light } from '@expo-google-fonts/roboto';
import { articles_url, country_code, category } from './newsAPI_config/general_config';
import { _api_key } from './newsAPI_config/API_key/API_key';

function Home() {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState('');

    let [fontsLoaded] = useFonts({
        Roboto_300Light
    });

    // Sends request for API data for the general news section:
    useEffect(() => {
        axios.get(`${articles_url}?country=${country_code}&category=${category}`, {
            headers: {
                'X-API-KEY': _api_key
            }
        })
        .then(data => {
            setData(data.data.articles);
            setIsLoading(false);
        })
        .catch(function (error){
            console.log(error);
        })
    }, []);
    
    if (isLoading) {
        return <Loading />;
    }

    if (!fontsLoaded) {
        return null;
    }

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
                    <NewsItem data={data} key={new Date(Date.now()).toISOString()}/>
                </View>
            </View>
        </React.Fragment>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        paddingTop: 20,
        paddingHorizontal: 1,
        height: '100%',
        backgroundColor: '#a8dadc'
    },
    headerContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: '#cccccc',
        height: '100%'
    },
    headerTitle: {
        textAlign: 'center',
        width: '100%',
        height: '100%',
        fontSize: 20,
        fontWeight: "bold",
        color: '#2b2d42',
        fontFamily: 'Roboto_300Light'
    },
    newsItemsWrapper: {
        flex: 10,
        paddingHorizontal: 1,
        marginHorizontal: 3
    }
});

export default Home;