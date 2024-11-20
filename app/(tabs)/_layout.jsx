import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { icons } from '@/constant'; 



const TabIcon = ({ icon, color }) => {
  return (
    
    <View style={styles.iconContainer}>
      <Image
        source={icon}
        resizeMode="contain"
        style={[styles.icon, { tintColor: color }]} 
      />
    </View>
  );
};

 export default function TabLayout() {
   return (
    
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#00BA4F', // Active tab color
        headerShown: false, // Hide header
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {
            height: 65,
            
          },
        }),
      }}
    >
      <Tabs.Screen
        name="report"
        options={{
          tabBarLabel: ({ focused }) => (
            <Text style={[styles.tabLabel, focused && styles.tabLabelFocused]}>
            Report
            </Text>
          ),
          tabBarIcon: ({ color }) => <TabIcon icon={icons.report} color={color} />,
          tabBarButton: (props) => (
            <TouchableOpacity {...props} activeOpacity={1}/>
          ),
        }}
      />
      <Tabs.Screen
        name="spending"
        options={{
          tabBarLabel: ({ focused }) => (
            <Text style={[styles.tabLabel, focused && styles.tabLabelFocused]}>
              Spending
            </Text>
          ),
          tabBarIcon: ({ color }) => <TabIcon icon={icons.spending} color={color} />,
          tabBarButton: (props) => (
            <TouchableOpacity {...props} activeOpacity={1} />
          ),
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          tabBarLabel: ({ focused }) => (
            <Text style={[styles.tabLabel, focused && styles.tabLabelFocused]}>
              Wallet
            </Text>
          ),
          tabBarIcon: ({ color }) => <TabIcon icon={icons.wallet} color={color} />,
          tabBarButton: (props) => (
            <TouchableOpacity {...props} activeOpacity={1}/>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:14
  },
  icon: {
    width: 30,
    height: 30,
  },
  touchableContainer: {
    flex: 1,
  },
  tabLabel: {
    marginTop: 5, // Add margin to the title
    fontSize: 12,
    color: 'gray',
  },
  tabLabelFocused: {
    color: '#00BA4F', 
  },
});
