import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ThemeContainer from '@/components/ui/ThemeContainer'
import { useAuth } from '@/context/authContext'
import { SafeAreaView } from 'react-native-safe-area-context'
const Spending = () => {
  const{user} =useAuth();
  return (
    <SafeAreaView>
      <ThemeContainer>
          <Text>USER {user.id}</Text>
      </ThemeContainer>
    </SafeAreaView>
  )
}

export default Spending

const styles = StyleSheet.create({})