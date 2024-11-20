import { Button, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ThemeContainer from '@/components/ui/ThemeContainer'
import { supabase } from '@/lib/supabase'
import { SafeAreaView } from 'react-native-safe-area-context'
const Report = () => {
  return (
    <SafeAreaView>
    <ThemeContainer>
        <Pressable onPress={()=>supabase.auth.signOut()}>
          <Text>Logout</Text>
        </Pressable>
    </ThemeContainer>
    </SafeAreaView>
  )
}

export default Report

const styles = StyleSheet.create({

})