import { StyleSheet, Text, View, Image, StyleProp, ImageStyle } from 'react-native';
import React, { ReactNode } from 'react';
import { icons } from '@/constant';

interface CurrencyProps {
  children?: ReactNode;
  style?: StyleProp<ImageStyle>;
}

const Currency: React.FC<CurrencyProps> = ({ children, style }) => {

  return (
    <View style={styles.container}>
      <Image source={icons.peso} style={[styles.icon, style]} resizeMode="contain" />
      {children&&<Text>{children}</Text>}
    </View>
  );
};

export default Currency;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', 
    alignItems: 'center', 
  },
  icon: {
    width: 20, 
    height: 20, 
    marginRight: 8, 
    tintColor: '#6F6F6F',
  },
});
