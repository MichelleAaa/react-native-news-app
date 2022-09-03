import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';

const Loading = () => {
    return (
        <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>
                Loading Data...
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // paddingVertical: 3,
        borderBottomWidth: 2,
        borderBottomColor: '#cccccc'
    },
    loadingText: {
        // borderWidth: 1,
        // borderColor: '#cccccc',
        textAlign: 'center',
        width: '100%',
        // marginRight: 8,
        // padding: 8
    }
});

export default Loading;