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
        borderBottomWidth: 2,
        borderBottomColor: '#cccccc'
    },
    loadingText: {
        textAlign: 'center',
        width: '100%'
    }
});

export default Loading;