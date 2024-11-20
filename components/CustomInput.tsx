import { StyleSheet, TextInput, View } from 'react-native'
import React from 'react'

interface InputProps {
  onChangeText: (text: string) => void;  // Capture the text input value
  placeholder?: string;                  // Optional placeholder for the input
}

const CustomInput: React.FC<InputProps> = ({ onChangeText, placeholder }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}  // Pass the onChangeText prop to the TextInput
        placeholder={placeholder}   // Optionally display a placeholder
      />
    </View>
  )
}

export default CustomInput

const styles = StyleSheet.create({
  container: {
    marginVertical: 10, 
    paddingHorizontal: 15, 
  },
  input: {
    backgroundColor: '#fff', 
    width: 300,
    paddingHorizontal: 15,     
    paddingVertical: 10,      
    borderWidth: 1,            
    borderColor: '#ccc',       
    borderRadius: 99,           
    fontSize: 16,             
  },
})
