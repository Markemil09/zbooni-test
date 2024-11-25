import { View, Text, StyleSheet, Alert } from 'react-native';
import React, {useContext} from 'react';
import CustomButton from '@/components/CustomButton';
import { Colors } from '@/constants/Colors';
import { AppContext } from '../../context/AppContext';
import { useRouter } from 'expo-router';

const More = () => {
  const { logoutUser, setLang } = useContext(AppContext);
  const router = useRouter();

  const handleLogout = () => {
    logoutUser();
    router.push('/login')
  }

  const handleSwitch = () => {
    setLang();
    Alert.alert(
      "Switch success!",
      '',
      [
        {
          text: "OK"
        },
      ]
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>More</Text>

      <View style={styles.contentContainer}>
        <CustomButton 
            title='Log out'
            onPress={()=> handleLogout()} 
            containerStyles={styles.logoutButton}
            textStyles={styles.logoutText}
        />
        <CustomButton 
            title='Switch language'
            onPress={()=> handleSwitch()} 
            containerStyles={styles.logoutButton}
            textStyles={styles.logoutText}
        />
      </View>
    </View>
  )
}

export default More

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
  logoutButton : {
      backgroundColor : Colors.primary,
      margin: 25
  },
  logoutText : {
      color : Colors.white
  }
})