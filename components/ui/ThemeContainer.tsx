import { StyleSheet, Text, View } from 'react-native'
import React, { ReactNode } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

const ThemeContainer: React.FC<{children: ReactNode}> = ({children}) => {
  return (
    <>
        <View style={styles.container}>
            {children}
        </View>
        <StatusBar style="dark" backgroundColor='white'/>
    </>
  )
}
export default ThemeContainer;

const styles = StyleSheet.create({
    container:{
        paddingLeft: 16,
        paddingRight: 16,
        width: '100%',
        height: '100%',
        backgroundColor: '#F8F8F8',
    },
    statusBar:{
        backgroundColor: 'white',
    }
})