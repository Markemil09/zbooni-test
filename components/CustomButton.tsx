import { Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
import React from 'react'


interface CustomButtonProps {
    onPress: () => void;
    title: string;
    textStyles?: {};
    containerStyles?: {};
    isLoading?: boolean;
    disabled?: boolean;
}

const CustomButton = ({ 
    onPress, 
    title, 
    textStyles = {}, 
    containerStyles = {},
    isLoading = false,
    disabled = false
}: CustomButtonProps) => {
  return (
    <TouchableOpacity 
        activeOpacity={0.7}
        style={[styles.container, containerStyles]}
        onPress={onPress}
        disabled={disabled}
    >
      {isLoading ? <ActivityIndicator /> : <Text style={[styles.text, textStyles]}>{title}</Text>}
    </TouchableOpacity>
  )
}

export default CustomButton

const styles = StyleSheet.create({
    container : {
        borderRadius : 30,
        height : 50,
        width : 307,
        justifyContent: 'center'
    },
    text : {
        fontSize: 18,
        fontFamily: 'Montserrat-Regular',
        fontWeight: '500',
        textAlign: 'center',
    }
});