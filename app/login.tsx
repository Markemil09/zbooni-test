import { View, Text, StyleSheet, TextInput, SafeAreaView, Alert, TouchableOpacity } from 'react-native'
import React, {useContext, useState} from 'react'
import { Colors } from '@/constants/Colors'
import CustomButton from '@/components/CustomButton';
import Ionicons from '@expo/vector-icons/Ionicons';
import {useForm, Controller} from 'react-hook-form';
import { login } from '../actions/auth-actions';
import { useRouter } from 'expo-router';
import { AppContext } from '../context/AppContext';

const Login = () => {
    const {control, handleSubmit} = useForm();
    const { setToken } = useContext(AppContext);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (data: Record<string, any>) => {
        setIsLoading(true);
    
        try {
            const response = await login(data);
            console.log("Login response:", response.access_token);
            setToken(response.access_token);
            router.push("/(tabs)");
        } catch (error) {
            if (
                typeof error === "object" &&
                error !== null &&
                "message" in error &&
                typeof error.message === "object"
            ) {
                const apiError = error as { status: number; message: Record<string, string[]> };
                const firstError = Object.values(apiError.message)
                    .flat()
                    .join(" ");
    
                Alert.alert(
                    "Error",
                    firstError || "An unexpected error occurred. Please try again.",
                    [
                        {
                            text: "OK",
                        },
                    ]
                );
            } else {
                Alert.alert("Error", "An unexpected error occurred. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    };

  return (
    <SafeAreaView style={styles.container}>
        <View style={{ height: '20%'}}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10 }}>
            <TouchableOpacity onPress={()=>router.push('/')} style={{ flex: 1 }}>
                <Ionicons name="chevron-back-outline" size={24} color="black" />
            </TouchableOpacity>
            <View style={{ flex: 2, alignItems: 'center' }}>
                <Text style={styles.headerTitle}>Create an Account</Text>
            </View>
            <View style={{ flex: 1 }} />
        </View>
        <View style={styles.formContainer}>
            <Controller 
                control={control}
                name='username'
                rules={{required: true}}
                render={({field: {value, onChange, onBlur}, fieldState: {error}})=>
                <TextInput        
                    placeholder='Email Address'
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    style={[styles.textInputStyle, {borderBottomColor: error? 'red' : '#ebebeb'}]}
                />}
            />
            
            <Controller 
                control={control}
                name='password'
                rules={{required: true}}
                render={({field: {value, onChange, onBlur}, fieldState: {error}})=>
                    <View style={[styles.passwordContainer, {borderBottomColor: error? 'red' : '#ebebeb'}]}>
                        <TextInput
                            placeholder='Password'
                            style={styles.passwordInput}
                            secureTextEntry={true}
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                        />
                    </View>}
            />
           
            
        </View>
        </View>
        <View style={styles.bottomContainer}>
            <CustomButton 
                onPress={handleSubmit(handleLogin)}
                title='Log In'
                textStyles={styles.submitButtonText}
                containerStyles={styles.submitButton}
                isLoading={isLoading}
                disabled={isLoading}
            />
        </View>
    </SafeAreaView>
    
  )
}

export default Login

const styles = StyleSheet.create({
    container : {
        flex: 1,
        marginTop: 100,
    },
    formContainer : {
        flex: 1,
    },
    headerTitle : {
        fontFamily: 'Montserrat',
        fontWeight: '500',
        fontSize: 18,
        textAlign: 'center'
    },
    textInputStyle : {
        fontFamily: 'Montserrat',
        fontWeight: '500',
        fontSize: 16,
        height: 32,
        borderBottomWidth: 1,
        borderBottomColor: '#ebebeb',
        padding: 5,
        margin: 18,
    },
    passwordContainer : {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ebebeb',
        margin: 18,
    },
    passwordInput : {
        flex: 1,
        fontFamily: 'Montserrat',
        fontWeight: '500',
        fontSize: 16,
        padding: 5,
    },
    bottomContainer : {
        backgroundColor: '#ebebeb',
        flex: 1,
        alignItems: 'center',
        height: '90%',
        paddingTop: 18
    },
    submitButton : {
        backgroundColor : Colors.primary,
        borderColor : Colors.white,
        borderWidth : 1,
        margin: 10
    },
    submitButtonDisabled : {
        backgroundColor : '#bcbcbc',
        borderColor : Colors.white,
        borderWidth : 1,
        margin: 10
    },
    submitButtonText : {
        color : Colors.white
    },
    privacyPolicyContainer : {
        flexDirection: 'row',
        margin: 24
    },
    privacyPolicyText : {
        paddingInline: 24
    },
    countryCodeText : {
        fontFamily: 'Montserrat',
        fontWeight: '500',
        fontSize: 16,
        padding: 5,
    },
});