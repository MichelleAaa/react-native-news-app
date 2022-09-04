import React, { useState } from "react";
import { FlatList, View, StyleSheet, Image, Modal, Pressable, ActivityIndicator } from 'react-native';
import { ListItem, Text } from 'react-native-elements';
import { WebView } from 'react-native-webview';
import NewsDetailModal from "./newsDetailModal";

function NewsItem({ data }) {
    const [modalArticleData, setModalArticleData] = useState('');
    const [modalIsVisible, setModalIsVisible] = useState(false);//Modal is set to false for visibility to start.

    const renderNewsItem = ({ item }) => {
        
        const handleItemPress = (item) => {
            setModalArticleData(item);
            setModalIsVisible(true);
        }

        return (
            <ListItem 
            button onPress={() => handleItemPress(item)}
            style={styles.itemWrapper}
            subtitle={ 
                <View style={{ flex:1, flexDirection:'row'}}>
                    <Image 
                        source={{ uri: item.urlToImage != null ? item.urlToImage : ''}}
                        style={item.urlToImage != null ? {
                            width:100,
                            height:100,
                            borderWidth:2,
                            borderColor:'#cccccc',
                            resizeMode:'contain',
                            margin:8
                        } : {margin: 0}}
                    />
                    <View style={styles.textRow}>
                        <Text note numberOfLines={2}>{item.title}</Text>
                        <Text note numberOfLines={2}>{item.description}</Text>
                        <View>
                            <Text note>{item.source.name}</Text>
                        </View>
                    </View>
                </View>
            }
            />
        );
    }
    
    return (
        <React.Fragment>
            {/* <View styles={{backgroundColor: '#a8dadc'}}> */}
            <FlatList 
                data={data}
                renderItem={renderNewsItem}
                keyExtractor={item=>item.publishedAt}
            />
            {/* </View> */}

            <NewsDetailModal modalArticleData={modalArticleData} setModalArticleData={setModalArticleData} modalIsVisible={modalIsVisible} setModalIsVisible={setModalIsVisible}   />

        </React.Fragment>
    );
}

const styles = StyleSheet.create({
    textRow: {
        // alignItems: 'center',
        // justifyContent: 'center',
        flex: 1,
        // flexWrap: "wrap",
        // flexDirection: 'row',
        marginTop: 5,
        padding: 2 
    },
    itemWrapper: {
        justifyContent: 'center',
        marginBottom: 4,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#cccccc',
    }
});

export default NewsItem;
