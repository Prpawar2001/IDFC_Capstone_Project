import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ToastAndroid, LogBox } from 'react-native'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Home from './Home';

const UpdateProfile = ({ navigation, route }) => {
    const [userName, setUserName] = useState(route.params.user);
    const [city, setCity] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const updateProf = () => {
        const regemail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const regpass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/;
        if (city == '' && mobile == '' && email == '' && password == '') {
            ToastAndroid.showWithGravityAndOffset('Please Provide atleast one field to update !!', ToastAndroid.SHORT, ToastAndroid.TOP, 0, 50)
        } else if (mobile.length != 0 && mobile.length != 10) {
            ToastAndroid.showWithGravityAndOffset('Please Provide 10 digit mobile number !!', ToastAndroid.SHORT, ToastAndroid.TOP, 0, 50)
        } else if (email.length != 0 && regemail.test(email) == false) {
            ToastAndroid.showWithGravityAndOffset('Please Provide valid email !!', ToastAndroid.SHORT, ToastAndroid.TOP, 0, 50)
        } else if (password.length != 0 && regpass.test(password) == false) {
            ToastAndroid.showWithGravityAndOffset('Password must contain Min 1 uppercase letter, Min 1 lowercase letter, Min 1 special character, Min 1 number, Min 8 characters !!', ToastAndroid.SHORT, ToastAndroid.TOP, 0, 50)
        } else {
            axios({
                method: 'PUT',
                url: 'http://192.168.1.204:8085/RentalRides/UpdateUser',
                data: {
                    "userName": userName,
                    "user_city": city,
                    "user_mobile": mobile,
                    "email": email,
                    "password": password
                }
            }).then(function (response) {
                ToastAndroid.showWithGravityAndOffset(response.data, ToastAndroid.SHORT, ToastAndroid.TOP, 0, 50)
                navigation.navigate("Home", userName)
            }).catch(function (error) {
                console.log(error);
            })
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <Text style={styles.headtxt}>{userName}</Text>
                <Text style={{ color: 'darkgrey', fontSize: 22, lineHeight: 30, alignSelf: 'center', textAlign: 'center' }}>Please provide the fields you want to update!</Text>
                <View style={{ marginTop: 20 }}>
                    <TextInput style={styles.forminput} placeholder='Your City' onChangeText={(e) => setCity(e)} />
                    <TextInput style={styles.forminput} placeholder='Your Mobile Number' onChangeText={(e) => setMobile(e)} />
                    <TextInput style={styles.forminput} placeholder='Your email' onChangeText={(e) => setEmail(e)} />
                    <TextInput style={styles.forminput} placeholder='Your Passsword' onChangeText={(e) => setPassword(e)} />
                </View>
                <TouchableOpacity style={styles.btn} onPress={updateProf}>
                    <Text style={styles.btntxt}>Update Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btn, { backgroundColor: '#DC3535' }]} onPress={() => { navigation.navigate("Home", userName) }}>
                    <Text style={styles.btntxt}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default UpdateProfile
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#EFF5F5', alignItems: 'center', },
    form: { height: '60%', borderRadius: 10, width: '90%', marginVertical: 15, paddingVertical: 80, paddingHorizontal: 20, },
    headtxt: { fontSize: 35, fontWeight: "500", lineHeight: 40, alignSelf: 'center', marginBottom: 18, color: 'green' },
    forminput: { borderWidth: 0.5, borderColor: 'darkgrey', fontSize: 18, color: 'green', borderRadius: 8, alignSelf: 'center', marginVertical: 18, paddingHorizontal: 20, height: 50, width: '100%', backgroundColor: 'white', },
    btn: { height: 45, width: '100%', backgroundColor: 'green', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginVertical: 10, borderRadius: 15 },
    btntxt: { color: 'white', fontSize: 20, fontWeight: "600", margin: 2 },
})