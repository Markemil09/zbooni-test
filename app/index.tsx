import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import { Colors } from '@/constants/Colors';
import { StatusBar } from 'expo-status-bar';
import CustomButton from '@/components/CustomButton';
import { useRouter } from 'expo-router';


const WelcomeScreen = () => {
    const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Image
            source={require("../assets/images/splash-icon.png")}
        />
        <Text style={styles.title}>Say hello to cCommerce</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <CustomButton 
            title="Log in"
            onPress={()=>router.push("/login")}
            containerStyles={styles.loginButton}
            textStyles={styles.loginButtonText}
        />
        <CustomButton 
            title="Create a free account"
            onPress={() => router.push("/register")}
            containerStyles={styles.registerButton}
            textStyles={styles.registerButtonText}
        />
      </View>
      <StatusBar style='light' />
    </View>
  );
}

export default WelcomeScreen

const styles = StyleSheet.create({
    container : {
        alignItems: 'center',
        backgroundColor: Colors.primary,
        flex: 1,
        paddingBlock: 120
    },
    heading : {
        marginBlock: 100 
    },
    title : {
        color : Colors.white,
        fontSize : 24,
        fontFamily : 'Montserrat-400Regular',
        fontWeight : '500'
    },
    loginButton : {
        backgroundColor : Colors.primary,
        borderColor : Colors.white,
        borderWidth : 1,
        margin: 10
    },
    loginButtonText : {
        color : Colors.white
    },
    registerButton : {
        backgroundColor : Colors.white,
        margin : 10
    },
    registerButtonText : {
        color : Colors.primary
    },
    buttonsContainer : {
        marginBlock : 200
    }
});