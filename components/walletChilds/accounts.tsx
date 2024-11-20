import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ProgressBar from '../progressBar'
import Currency from '../currency'
import { formatAmount } from '@/utils/formatAmount'
interface accountProps{
    title: string;
    amount: number;
    progress: number;
    color: string;
    unfilledColor: string;
}
const Accounts: React.FC<accountProps> = ({title, amount = 0, progress, color, unfilledColor}) => {

  return (
    <View style={styles.container}>
        <View style={{marginLeft:22,marginRight:22}}>
            <View style={styles.tagName}>
                <Text style={{fontWeight: 'bold', color: '#333333', fontSize: 15}}>{title}</Text>
                <Currency style={{ width: 15, height: 15, marginRight: -1 }}>
                    <Text style={{fontWeight: 'bold', color: '#6F6F6F', fontSize: 15}}>{formatAmount(amount)}
                    
                        <Text style={{fontWeight: '400', color: '#B6BBC1', fontSize: 15}}> Available</Text>
                    </Text>
                </Currency>
            </View>
            <ProgressBar
                progress={progress}
                color={color}
                unfilledColor={unfilledColor}
            />
        </View>
    </View>
  )
}

export default Accounts

const styles = StyleSheet.create({
 container:{
    width:'100%',
    height: 67,
    backgroundColor: 'white',
    paddingTop: 14,

},
 tagName:{
    width: '100%',
    display:'flex',
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center'
 }

})