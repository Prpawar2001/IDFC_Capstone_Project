import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ToastAndroid, LogBox } from 'react-native'
import React, { useEffect, useState } from 'react';
import Register from './Register';
import AppIntroSlider from 'react-native-app-intro-slider';
import Home from './Home';
import ResetPassword from './ResetPassword';
import axios from 'axios';

const Login = ({ navigation }) => {

    const [showRealApp, setShowRealApp] = useState(false);
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const onDone = () => {
        setShowRealApp(true);
    }
    const onSkip = () => {
        setShowRealApp(true);
    }
    const slides = [
        {
            key: 1,
            title: 'Planning for a Trip?',
            text: "Not getting much options for renting vehicals. Join us we won't disappoint you.",
            image: require('../StaticImages/onBoard1.png'),
            backgroundColor: 'lightgreen',
        },
        {
            key: 2,
            title: 'Renting become Easy!',
            text: "Now it's easy to rent a car. Here we have variety of cars with owner's profile. You can share your car for rent here!",
            image: require('../StaticImages/onBoard2.png'),
            backgroundColor: 'lightgrey',
        },
        {
            key: 3,
            title: 'We are in your City!',
            text: 'We are exploring in various cities across India. Join us to expand more and getting Started!',
            image: require('../StaticImages/onBoard3.png'),
            backgroundColor: 'skyblue',
        },
    ];

    const renderItem = ({ item }) => {
        return (
            <View style={[styles.container, { justifyContent: 'center', backgroundColor: item.backgroundColor }]}>
                <Image source={item.image} style={{ height: 250, width: 250, resizeMode: 'contain', borderRadius: 150, margin: 20 }} />
                <Text style={{ fontSize: 30, fontWeight: "600", margin: 10 }}>{item.title}</Text>
                <Text style={{ fontSize: 15, textAlign: 'center', width: '80%' }}>{item.text}</Text>
            </View>
        )
    }

    useEffect(() => {
        LogBox.ignoreAllLogs();
    }, []);

    const Login = () => {
        if (userName == '' || password == '') {
            ToastAndroid.showWithGravityAndOffset('Please provide all fields !!', ToastAndroid.SHORT, ToastAndroid.TOP, 0, 50)
        }else{
            axios({
               method: 'GET',
               url: 'http://192.168.1.204:8085/RentalRides/Login/' + userName, 
            }).then(function(response){
                if(userName == response.data.userName && password == response.data.password){
                    ToastAndroid.showWithGravityAndOffset('Login Sucessfully !!', ToastAndroid.SHORT, ToastAndroid.TOP, 0, 50)
                    navigation.navigate("Home",{
                        userName: response.data.userName,
                    })
                }else {
                    ToastAndroid.showWithGravityAndOffset('Invalid Credentials !!', ToastAndroid.SHORT, ToastAndroid.TOP, 0, 50)
                }
            }).catch(function(error){
                console.log("error", error);
            })
        }
    }

    return (
        showRealApp ? (
            <View style={styles.container}>
                <Image source={require('../StaticImages/car.png')} style={styles.logo} />
                <View style={styles.form}>
                    <Text style={styles.headtxt}>Hello Again!</Text>
                    <Text style={{ color: 'darkgrey', fontSize: 22, lineHeight: 30, alignSelf: 'center', textAlign: 'center' }}>Welcome back you've been missed!</Text>
                    <View style={{ marginTop: 20 }}>
                        <TextInput style={styles.forminput} placeholder='Enter user name' onChangeText={(e) => setUserName(e)} />
                        <TextInput style={styles.forminput} placeholder='Enter password' secureTextEntry={true} onChangeText={(e) => setPassword(e)} />
                        <Text style={{ marginLeft: 10, marginVertical: 2, color: '#002E94', fontWeight: "400" }} onPress={() => navigation.navigate(ResetPassword)}>forgot password ?</Text>
                    </View>
                    <TouchableOpacity style={styles.btn} onPress={Login}>
                        <Text style={styles.btntxt}>LOGIN</Text>
                    </TouchableOpacity>
                    <Text style={{ marginLeft: 10, marginVertical: 2, fontWeight: "300", alignSelf: 'center' }}>Don't have an account?
                        <Text style={{ color: '#002E94', fontWeight: "400" }} onPress={() => navigation.navigate(Register)}> Register now</Text>
                    </Text>
                </View>
            </View>
        ) : (
            <AppIntroSlider data={slides} renderItem={renderItem} onDone={onDone} onSkip={onSkip} />
        )
    )
}

export default Login

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#EFF5F5', alignItems: 'center', },
    logo: { height: 110, width: 250, resizeMode: 'stretch', marginTop: 50, },
    form: { height: '60%', borderRadius: 10, width: '90%', marginVertical: 15, paddingVertical: 20, paddingHorizontal: 20, },
    headtxt: { fontSize: 35, fontWeight: "500", lineHeight: 40, alignSelf: 'center', marginBottom: 18, color: 'green' },
    forminput: { borderWidth: 0.5, borderColor: 'darkgrey', fontSize: 18, color: 'green', borderRadius: 8, alignSelf: 'center', marginVertical: 18, paddingHorizontal: 20, height: 50, width: '100%', backgroundColor: 'white', },
    btn: { height: 45, width: '100%', backgroundColor: 'green', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginVertical: 20, borderRadius: 15 },
    btntxt: { color: 'white', fontSize: 20, fontWeight: "600", margin: 2 },
})