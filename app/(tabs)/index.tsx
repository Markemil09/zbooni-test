import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import CustomButton from '@/components/CustomButton';
import { Colors } from '@/constants/Colors';


const Homepage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>New Invoice</Text>

      <View style={styles.contentContainer}>
        <Image source={require('../../assets/images/n.png')} />
        <Text style={styles.label}>Create a new order</Text>
        <Text style={styles.text}>Share with your customers for easy checkout</Text>
        <CustomButton 
            title='Create order'
            onPress={()=> console.log("PRESSED")} 
            containerStyles={styles.createOrderButton}
            textStyles={styles.createOrderText}
        />
      </View>
    </View>
  )
}

export default Homepage

const styles = StyleSheet.create({
    container : {
        flex: 1,
        marginTop: 84
    },
    contentContainer : {
        flex: 1,
        alignItems: 'center',
        marginTop: '20%',
    },
    headerTitle : {
        fontFamily: 'Montserrat',
        fontWeight: '500',
        fontSize: 18,
        textAlign: 'center'
    },
    label : { 
        fontFamily: 'Montserrat',
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        justifyContent: 'center',
        marginTop: '10%'
    },
    text : {
        fontFamily: 'Montserrat',
        fontSize: 14,
        textAlign: 'center',
        justifyContent: 'center',
        marginTop: 5,
        color: '#848484'
    },
    createOrderButton : {
        backgroundColor : Colors.primary,
        margin: 25
    },
    createOrderText : {
        color : Colors.white
    }
})