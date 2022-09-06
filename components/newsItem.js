import React, { useState } from "react";
import { FlatList, View, StyleSheet, Image } from 'react-native';
import { ListItem, Text } from 'react-native-elements';
import { useFonts, Roboto_300Light } from '@expo-google-fonts/roboto';
import NewsDetailModal from "./newsDetailModal";

function NewsItem({ data }) {
    const [modalArticleData, setModalArticleData] = useState('');
    const [modalIsVisible, setModalIsVisible] = useState(false);//Modal is set to false for visibility to start.

    let [fontsLoaded] = useFonts({
        Roboto_300Light
    });

    if (!fontsLoaded) {
        return null;
    }

    const renderNewsItem = ({ item }) => {
        
        const handleItemPress = (item) => {
            setModalArticleData(item);
            setModalIsVisible(true);
        }

        return (
            <ListItem 
            button onPress={() => handleItemPress(item)}
            style={styles.listItemWrapper}
            subtitle={ 
                <View style={styles.listItemContainer}>
                    <Image 
                        source={{ uri: item.urlToImage != null ? item.urlToImage : ''}}
                        style={item.urlToImage != null ? {
                            width: 100,
                            height: 100,
                            borderWidth: 2,
                            borderColor: '#cccccc',
                            resizeMode: 'contain',
                            marginRight: 9
                        } : {margin: 0}}
                    />
                    <View style={styles.textContainer}>
                        <Text style={styles.newsDetailTitle} numberOfLines={2}>{item.title}</Text>
                        <Text style={styles.newsDetailDescription} numberOfLines={2}>{item.description}</Text>
                        <View>
                            <Text style={styles.newsDetailSource} > - {item.source.name}</Text>
                        </View>
                    </View>
                </View>
            }
            />
        );
    }
    
    return (
        <React.Fragment>
            <FlatList 
                data={data}
                renderItem={renderNewsItem}
                keyExtractor={item=>
                data.indexOf(item)}
            />
            <NewsDetailModal modalArticleData={modalArticleData} setModalArticleData={setModalArticleData} modalIsVisible={modalIsVisible} setModalIsVisible={setModalIsVisible}   />
        </React.Fragment>
    );
}

const styles = StyleSheet.create({
    textContainer: {
        flex: 1,
        paddingHorizontal: 2 
    },
    newsDetailTitle: {
        fontWeight: 'bold',
        paddingBottom: 2,
        fontSize: 17,
        fontFamily: 'Roboto_300Light'
    }, 
    newsDetailDescription: {
        fontSize: 15,
        fontFamily: 'Roboto_300Light'
    },
    newsDetailSource: {
        fontStyle: 'italic',
        paddingTop: 3,
        fontSize: 14,
        fontFamily: 'Roboto_300Light'
    },
    listItemWrapper: {
        marginBottom: 4,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#cccccc',
    },
    listItemContainer:  { 
        flex:1, 
        flexDirection:'row', 
        alignItems: 'center', 
        justifyContent: 'center'
    }
});

export default NewsItem;