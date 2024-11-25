import { View, Text, StyleSheet, TextInput, SafeAreaView, TouchableOpacity, Alert, Modal, FlatList } from 'react-native'
import React, {useState, useContext} from 'react'
import { Colors } from '@/constants/Colors'
import Ionicons from '@expo/vector-icons/Ionicons';
import Checkbox from 'expo-checkbox';
import CustomButton from '@/components/CustomButton';
import {useForm, Controller} from 'react-hook-form';
import { fetchToken, register } from '../actions/auth-actions';
import { useRouter } from 'expo-router';
import { AppContext } from '../context/AppContext';

const Register = () => {
    const {control, handleSubmit, formState: {errors}} = useForm();
    const { state } = useContext(AppContext);
    const router = useRouter();

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [countryCode, setCountryCode] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const countryCodes = [
        { name: 'United States', code: '+1' },
        { name: 'United Kingdom', code: '+44' },
        { name: 'Canada', code: '+1' },
        { name: 'Australia', code: '+61' },
        { name: 'India', code: '+91' },
      ];

    const onSubmit = async (data: any) => {
        setIsLoading(true);
        const formattedData = {
            ...data,
            phone_number: `${countryCode}${data.phone_number}`,
        };
        try {
          const token = await fetchToken();
          await register(token, formattedData);
          router.push('/');
        } catch (error) {
          if (
            typeof error === "object" &&
            error !== null &&
            "message" in error &&
            typeof (error as any).message === "object"
          ) {
            const apiError = error as { status: number; message: Record<string, string[]> };
            const firstError = Object.values(apiError.message)
              .flat()
              .join(" ");
      
            Alert.alert(
              "Error",
              firstError,
              [
                {
                  text: "OK"
                },
              ]
            );
          } else {
            console.log("Unexpected error:", error);
          }
        } finally {
          setIsLoading(false);
        }
      };

      const handleSelect = (code : string) => {
        setCountryCode(code);
        setModalVisible(false);
      };

  return (
    <SafeAreaView style={styles.container}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10 }}>
            <TouchableOpacity onPress={()=>router.push('/')} style={{ flex: 1 }}>
                <Ionicons name="chevron-back-outline" size={24} color="black" />
            </TouchableOpacity>
            <View style={{ flex: 2, alignItems: 'center' }}>
                {state.language ? 
                    <Text style={styles.headerTitle}>Create an Account</Text>
                :
                <Text style={styles.headerTitle}> 
 	
                إنشاء حساب</Text>
                }
            </View>
            <View style={{ flex: 1 }} />
        </View>
        <View style={styles.formContainer}>
            <Controller 
                control={control}
                name='first_name'
                rules={{required: true}}
                render={({field: {value, onChange, onBlur}, fieldState: {error}})=>
                <TextInput        
                    placeholder={state.language ? 'First Name' : 'الاسم الأول'}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    style={[
                        styles.textInputStyle, 
                        {
                            borderBottomColor: error ? 'red' : '#ebebeb', 
                            direction: state.language ? 'ltr' : 'rtl', 
                            textAlign: state.language ?'left' : 'right'
                        }]}
                />}
            />
            <Controller 
                control={control}
                name='last_name'
                rules={{required: true}}
                render={({field: {value, onChange, onBlur}, fieldState: {error}})=>
                <TextInput        
                    placeholder={state.language ? 'Last Name' : 'اسم العائلة'}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    style={[
                        styles.textInputStyle, 
                        {
                            borderBottomColor: error ? 'red' : '#ebebeb', 
                            direction: state.language ? 'ltr' : 'rtl', 
                            textAlign: state.language ?'left' : 'right'
                        }]}
                />}
            />
            <Controller 
                control={control}
                name='email'
                rules={{required: true}}
                render={({field: {value, onChange, onBlur}, fieldState: {error}})=>
                <TextInput        
                placeholder={state.language ? 'Email' : 'عنوان البريد الإلكتروني'}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    style={[
                        styles.textInputStyle, 
                        {
                            borderBottomColor: error ? 'red' : '#ebebeb', 
                            direction: state.language ? 'ltr' : 'rtl', 
                            textAlign: state.language ?'left' : 'right'
                        }]}
                />}
            />
            
            <Controller 
                control={control}
                name='password'
                rules={{required: true}}
                render={({field: {value, onChange, onBlur}, fieldState: {error}})=>
                    <View style={[styles.passwordContainer, {borderBottomColor: error? 'red' : '#ebebeb'}]}>
                        <TextInput
                            placeholder={state.language ? 'Password' : 'كلمة المرور'}
                            style={[
                                styles.passwordInput, 
                                {
                                borderBottomColor: error ? 'red' : '#ebebeb', 
                                direction: state.language ? 'ltr' : 'rtl', 
                                textAlign: state.language ?'left' : 'right'
                                }
                            ]}
                            secureTextEntry={!isPasswordVisible}
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                        />
                        <TouchableOpacity 
                            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                        >
                            <Ionicons style={styles.passwordEye} name="eye" size={16} color="black" />
                        </TouchableOpacity>
                    </View>}
            />
            
            <View style={styles.divider} />
            <View style={styles.passwordContainer}>
                <Text style={[styles.countryCodeText, {width: '60%'}]}>Country Code</Text>
                <TouchableOpacity style={{justifyContent: 'flex-end'}} onPress={()=>setModalVisible(true)}>
                {countryCode ? <Text style={[styles.countryCodeText, {color: 'blue', marginLeft: '48%'}]}>{countryCode}</Text> : <Text style={[styles.countryCodeText, {color: 'blue', textAlign: 'right'}]}>Select country code</Text>}
                </TouchableOpacity>
            </View>
           
            <Controller 
                control={control}
                name='phone_number'
                rules={{required: true}}
                render={({field: {value, onChange, onBlur}, fieldState: {error}})=>
                <TextInput        
                    placeholder='Phone Number'
                    value={value}
                    keyboardType='phone-pad'
                    onChangeText={onChange}
                    onBlur={onBlur}
                    style={[styles.textInputStyle, {borderBottomColor: error? 'red' : '#ebebeb'}]}
                    maxLength={10}
                />}
            />
        </View>
        <View style={styles.bottomContainer}>
            <View style={styles.privacyPolicyContainer}>
            <Checkbox
                value={isChecked}
                onValueChange={setIsChecked}
                color={isChecked ? '#4630EB' : undefined}
                />
            {state.language ? <Text style={styles.privacyPolicyText}>By creating an account you agree to the
            Terms and Conditions & Privacy Policy</Text> :
            <Text style={styles.privacyPolicyText}>
            بإنشاء متجر، أنت توافق سياسة الخصوصية البنود والشروط على</Text>}
            </View>
        <CustomButton 
            onPress={handleSubmit(onSubmit)}
            title='Create account'
            textStyles={styles.submitButtonText}
            containerStyles={isChecked && countryCode.length > 0 && !isLoading ? styles.submitButton : styles.submitButtonDisabled}
            isLoading={isLoading}
            disabled={!isChecked || countryCode.length == 0 || isLoading}
        />
        </View>
    <Modal visible={modalVisible}>
        <View style={styles.container}>
            <Text style={styles.header}>Choose your country</Text>
            <FlatList
                data={countryCodes}
                keyExtractor={(item) => item.name}
                renderItem={({ item }) => (
                <TouchableOpacity style={styles.item} onPress={() => handleSelect(item.code)}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.code}>{item.code}</Text>
                </TouchableOpacity>
                )}
            />
       </View>
    </Modal>
    </SafeAreaView>
    
  )
}

export default Register

const styles = StyleSheet.create({
    container : {
        flex: 1,
        marginTop: 84
    },
    formContainer : {
        flex: 1,
        marginBottom: 200
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
    passwordEye : {
        fontSize: 16,
        height: 32,
        marginRight: 2
    },
    divider : {
        width: '100%',
        height: 24,
        backgroundColor: '#ebebeb',
        marginVertical: 24
    }, 
    bottomContainer : {
        backgroundColor: '#ebebeb',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
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
    header: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
      },
      item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
      },
      name: {
        fontSize: 18,
      },
      code: {
        fontSize: 18,
        fontWeight: 'bold',
      },
});