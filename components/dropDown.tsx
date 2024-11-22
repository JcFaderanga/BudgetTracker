import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import RNPickerSelect from 'react-native-picker-select';

interface dropDownProps{
  title: string | any;
  placeholder: string;
  list: any;
  onValueChange: any;
}
const dropDown:React.FC<dropDownProps> = ({title, placeholder, list, onValueChange}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.dropdownContainer}>
        <RNPickerSelect
          onValueChange={onValueChange}
          style={{
            inputIOS: styles.pickerSelect,
            inputAndroid: styles.pickerSelect, 
          }}
          placeholder={{
            label: placeholder,
            value: null,
            color: 'gray',
          }}
          items={list}
        />
      </View>
    </View>
  );
}

export default dropDown
const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginHorizontal: 'auto',
    
    
  },
  title: {
    fontSize: 16, // 'text-base' equivalent
    paddingLeft: 8, // 'pl-2' equivalent
    paddingBottom: 4, // 'pb-1' equivalent
  },
  dropdownContainer: {
    borderWidth: 1,
    borderColor: '#EAEAEA',
    height: 56,
    borderRadius: 16, 
    backgroundColor: 'white'
  },
  pickerSelect: {
    height: 50,
    borderWidth: 1,
    borderRadius: 200,
  
  },
});