import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ProgressBar from 'react-native-progress/Bar';

const Wallet = ({progress, color, unfilledColor}) => {
  return (
    <>
      <ProgressBar
          progress={progress}
          width={315} 
          height={8}
          color={color}
          unfilledColor={unfilledColor}
          borderWidth={1}
          borderColor="#CCF1DC" 
      />
    </>
  );
};

export default Wallet;

