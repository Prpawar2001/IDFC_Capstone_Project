import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ToastAndroid } from 'react-native'
import React, { useState } from 'react';
import Register from './Register';
import Login from './Login';
import axios from 'axios';

const ResetPassword = ({navigation}) => {

    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const Reset = () => {
        const regpass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/;
        if(userName == '' && email == '' && password == ''){
            ToastAndroid.showWithGravityAndOffset('Please Provide All Fields !!', ToastAndroid.SHORT, ToastAndroid.TOP, 0, 50)
        }else if(regpass.test(password) == false){
            ToastAndroid.showWithGravityAndOffset('Password must contain Min 1 uppercase letter, Min 1 lowercase letter, Min 1 special character, Min 1 number, Min 8 characters !!', ToastAndroid.SHORT, ToastAndroid.TOP, 0, 50)
        }else{
            axios({
                method: 'PUT',
                url: 'http://192.168.1.204:8085/RentalRides/forgotPass/' + userName + '/' + email + '/' + password, 
            }).then(function(response){
                ToastAndroid.showWithGravityAndOffset(response.data , ToastAndroid.SHORT, ToastAndroid.TOP, 0, 50)
            }).catch(function(error){
                console.log(error)
            })
        }
    }

    return (
        <View style={styles.container}>
            <Image source={require('../StaticImages/car.png')} style={styles.logo} />
            <View style={styles.form}>
                <Text style={styles.headtxt}>Reset Password!</Text>
                <Text style={{ color: 'darkgrey', fontSize: 22, lineHeight: 30, alignSelf: 'center', textAlign: 'center' }}>We need to verify You!</Text>
                <View style={{ marginTop: 20 }}>
                    <TextInput style={styles.forminput} placeholder='Enter user name' onChangeText={(e) => setUserName(e)}/>
                    <TextInput style={styles.forminput} placeholder='Enter your email' onChangeText={(e) => setEmail(e)} />
                    <TextInput style={styles.forminput} placeholder='Enter password' secureTextEntry={true} onChangeText={(e) => setPassword(e)}/>
                </View>
                <TouchableOpacity style={styles.btn} onPress={Reset}>
                    <Text style={styles.btntxt}>Reset Password</Text>
                </TouchableOpacity>
                <Text style={{ marginLeft: 10, marginVertical: 2, fontWeight: "300", alignSelf: 'center' }}>Don't have an account?
                    <Text style={{ color: '#002E94', fontWeight: "400" }} onPress={() => navigation.navigate(Register)}> Register now</Text>
                </Text>
            </View>
        </View>
    )
}

export default ResetPassword

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#EFF5F5', alignItems: 'center', },
    logo: { height: 110, width: 250, resizeMode: 'stretch', marginTop: 50, },
    form: { height: '60%', borderRadius: 10, width: '90%', marginVertical: 15, paddingVertical: 20, paddingHorizontal: 20, },
    headtxt: { fontSize: 35, fontWeight: "500", lineHeight: 40, alignSelf: 'center', marginBottom: 18,color:'green' },
    forminput: { borderWidth: 0.5, borderColor: 'darkgrey', fontSize: 18, color: 'green', borderRadius: 8, alignSelf: 'center', marginVertical: 18, paddingHorizontal: 20, height: 50, width: '100%', backgroundColor: 'white', },
    btn: { height: 45, width: '100%', backgroundColor: 'green', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginVertical: 20, borderRadius: 15 },
    btntxt: { color: 'white', fontSize: 20, fontWeight: "600", margin: 2 },
})