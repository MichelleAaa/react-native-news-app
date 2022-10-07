import React from "react";
import { View, StyleSheet, Modal, Pressable, ActivityIndicator } from 'react-native';
import { Text } from 'react-native-elements';
import { WebView } from 'react-native-webview';
import { useFonts, Roboto_300Light } from '@expo-google-fonts/roboto';
import Loading from "./loading";

function NewsDetailModal({ modalArticleData, setModalArticleData, modalIsVisible, setModalIsVisible  }) {
    let [fontsLoaded] = useFonts({
        Roboto_300Light
    });

    if (!fontsLoaded) {
        return <Loading />;
    }

    function ActivityIndicatorLoadingView() {
        return (
            <ActivityIndicator
                color="#457b9d"
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
                startInLoadingState
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
        elevation: 2,
        shadowOffset: { width: 0, height: 2 }
    },
        pressed: {
        opacity: 0.75,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 17,
        fontFamily: 'Roboto_300Light'
    },
    modalWebViewContainer: {
        backgroundColor : 'white',
        width : '100%',
        height : '100%'
    },
    ActivityIndicatorStyle: {
        flex: 1,
        justifyContent: 'center'
    }
});

export default NewsDetailModal;