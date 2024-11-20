import { StyleSheet, View, Image,Text, TouchableOpacity } from 'react-native';
import React from 'react';

interface IconProps {
  icon: any; 
  title: string;
  onPress?: () => void;
}

const WalletButton: React.FC<IconProps> = ({title, icon, onPress }) => {
  return (
    <View style={{display:'flex', alignItems: 'center', margin:13}}>
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Image source={icon} style={styles.icon} />
        </TouchableOpacity>
        <Text style={{fontSize: 13, margin: 2}}>{title}</Text>
    </View>
  );
};

export default WalletButton;

const styles = StyleSheet.create({
  button: {
    width: 55,
    height: 55,
    borderRadius: 99, 
    backgroundColor: '#E3E3E3',
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  icon: {
    width: 24, 
    height: 24, 
  },
});
