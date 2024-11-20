import { StyleSheet, Text, View } from 'react-native'
import React, { ReactNode } from 'react'
import Currency from '../currency';
import { formatAmount } from '@/utils/formatAmount';

interface blanaceProps{
balance : number;
children : ReactNode;
}
const AccountBalance: React.FC<blanaceProps> = ({balance, children}) => {
 
  return (
    <View style={styles.container}>
    <View style={styles.balanceContainer}>
        <View style={{width: '50%'}}>
            <Text style={styles.balanceTextTitle}>Available Balance</Text>
            <Currency style={styles.currency}>
                <Text style={styles.balanceText}>{formatAmount(balance)}</Text>
            </Currency>   
        </View>
    </View>
        {/* button list here */}
        <View style={styles.buttonContainer}>
            {children}
        </View>
     </View>
  )
}

export default AccountBalance

const styles = StyleSheet.create({
 container:{
    width: '100%',
    height: 220, 
    backgroundColor:"white", 
    padding: 15,
},
balanceContainer:{
    display: 'flex', 
    flexDirection: 'row',
    height: '50%', 
},
balanceTextTitle:{
    fontSize: 15,
    color: '#B6BBC1',
},
balanceText:{
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333333',
},
currency:{
    tintColor: "#333333",
    width: 28, 
    height:28, 
    marginRight: -2,
    marginLeft: 5
},
buttonContainer:{
    width: '100%',
    height: '50%', 
    borderTopWidth: 1,
    paddingTop: 15,
    borderColor: "#ECECEC",
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center'
}

})