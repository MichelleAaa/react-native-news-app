import React, { useState } from "react";
import { FlatList, View, StyleSheet, Image, Modal, Pressable, ActivityIndicator } from 'react-native';
import { ListItem, Text } from 'react-native-elements';
import { WebView } from 'react-native-webview';

function NewsDetailModal({ modalArticleData, setModalArticleData, modalIsVisible, setModalIsVisible  }) {

    function ActivityIndicatorLoadingView() {
        return (
            <ActivityIndicator
                color="#009688"
                size="large"
                style={styles.ActivityIndicatorStyle}
            /> 
        );
    }
    
    return (
        <Modal visible={modalIsVisible} animationType="slide">
            <View style={styles.buttonContainer}>
                <View style={styles.buttonOuterContainer}>
                    <Pressable
                    style={({ pressed }) =>
                    pressed
                        ? [styles.buttonInnerContainer, styles.pressed]
                        : styles.buttonInnerContainer
                    }
                    onPress={() => {
                        setModalArticleData('');
                        setModalIsVisible(false);
                    }}
                    android_ripple={{ color: '#457b9d' }}
                    >
                        <Text style={styles.buttonText}>Close</Text>
                    </Pressable>
                </View>
            </View>
            <View style={styles.modalWebViewContainer}>
                <WebView source={{uri: modalArticleData.url}} 
                style={{flex: 1}}
                renderLoading={() => ActivityIndicatorLoadingView()}
                // onError={this.handleClose} 
                startInLoadingState
                // scalesPageToFit
                />
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
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
    modalWebViewContainer: {
        backgroundColor : 'white',
        width : '90%',
        height : '90%',
    },
    ActivityIndicatorStyle: {
        flex: 1,
        justifyContent: 'center',
    }
});

export default NewsDetailModal;
