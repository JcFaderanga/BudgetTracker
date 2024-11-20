import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

interface buttonProps {
  onPress: () => void;
  title: string;
}

const CustomButton: React.FC<buttonProps> = ({ onPress, title }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#01A3DA', 
    paddingVertical: 12,         
    width: 300,      
    borderRadius: 99,            
    alignItems: 'center',      
    justifyContent: 'center',  
    marginTop: 10,   
    marginHorizontal: 'auto'           
  },
  text: {
    color: '#fff',              
    fontSize: 16,              
    fontWeight: 'bold',         
  }
})
