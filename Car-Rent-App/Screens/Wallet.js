import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ScrollView, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';

const Wallet = ({ navigation, route }) => {
    const [userName, setUserName] = useState(route.params.userName)
    const [balance, setBalance] = useState('')
    const [amount, setAmount] = useState('')
    const [placeholder, setPlaceholder] = useState("Enter Bank Account Number")
    const [paymentImage, setPaymentImage] = useState(require('../StaticImages/Bank.png'));
    const [bankCardBg, setBankCardbg] = useState('#F7D716');
    const [upibtnbg, setUpibtnbg] = useState('black');
    const [acc, setAcc] = useState('');

    useEffect(() => {
        getBalance()
    }, [])

    function paymentForm() {
        return <View>
            <Image source={paymentImage} style={{ height: 150, width: '100%', resizeMode: 'stretch', borderRadius: 10, marginVertical: 20 }} />
            <TextInput style={styles.forminput} placeholder={placeholder} onChangeText={(e) => setAcc(e)} keyboardType='numeric' />
            <Text style={styles.fieldinfo}>Amount:</Text>
            <TextInput style={styles.forminput} placeholder={"Enter Amount"} keyboardType='numeric' onChangeText={(e) => setAmount(e)} />
        </View>
    };

    function getBalance() {
        axios({
            method: 'GET',
            url: 'http://192.168.1.204:8085/RentalRides/Wallet/balance/' + userName,
        }).then(function (response) {
            console.log(userName)
            setBalance(response.data);
        }).catch(function (error) {
            console.log(error)
        });
    }

    function walletTransfer(a) {
        if(acc.length != 12){
            ToastAndroid.showWithGravityAndOffset("Invalid Account number", ToastAndroid.SHORT, ToastAndroid.TOP, 0, 50)
        }else{
            axios({
                method: 'POST',
                url: 'http://192.168.1.204:8085/RentalRides/Wallet/' + userName + "/" + amount + "/" + a,
            }).then(function (response) {
                ToastAndroid.showWithGravityAndOffset(response.data, ToastAndroid.SHORT, ToastAndroid.TOP, 0, 50)
                getBalance();
            }).catch(function (error) {
                console.log(error)
            });
        }
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
                <View style={styles.form}>
                    <View style={{ alignItems: 'flex-end', marginTop: 20, }}><FontAwesome name="close" size={25} onPress={() => { navigation.navigate("Home", userName) }} /></View>
                    <Text style={{ color: 'grey', fontSize: 26, fontWeight: '700', lineHeight: 30, alignSelf: 'center', marginVertical: 30 }}>Wallet Balance: Rs.{balance}</Text>
                    <View style={styles.methodContainer}>
                        <TouchableOpacity style={[styles.methodBtn, { backgroundColor: bankCardBg }]} onPress={() => {
                            setPaymentImage(require('../StaticImages/Bank.png'));
                            setPlaceholder("Enter Bank Account Number");
                            setBankCardbg('#F7D716');
                            setUpibtnbg('black')
                        }}>
                            <Text style={styles.methodBtntxt}>Bank</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.methodBtn, { backgroundColor: upibtnbg }]} onPress={() => {
                            setPaymentImage(require('../StaticImages/UPI.png'));
                            setPlaceholder("Enter UPI Id");
                            setBankCardbg('black');
                            setUpibtnbg('#F7D716');
                        }}>
                            <Text style={styles.methodBtntxt}>UPI</Text>
                        </TouchableOpacity>
                    </View>
                    {paymentForm()}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TouchableOpacity style={styles.btn} onPress={() => { walletTransfer("Withdraw") }}>
                            <Text style={styles.btntxt}>Withdraw</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btn} onPress={() => { walletTransfer("Deposit") }}>
                            <Text style={styles.btntxt}>Deposit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

export default Wallet

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#EFF5F5', alignItems: 'center', },
    logo: { height: 110, width: 250, resizeMode: 'stretch', marginTop: 50, },
    fieldinfo: { fontSize: 20, color: 'grey', paddingLeft: 10 },
    form: { height: '60%', borderRadius: 10, width: '90%', marginVertical: 15, paddingVertical: 20, paddingHorizontal: 20, },
    headtxt: { fontSize: 35, fontWeight: "500", lineHeight: 40, alignSelf: 'center', marginBottom: 18 },
    forminput: { borderWidth: 0.5, borderColor: 'darkgrey', fontSize: 18, color: 'green', borderRadius: 8, alignSelf: 'center', marginVertical: 18, paddingHorizontal: 20, height: 50, width: '100%', backgroundColor: 'white', },
    btn: { height: 45, width: '48%', backgroundColor: 'green', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginVertical: 10, borderRadius: 15 },
    btntxt: { color: 'white', fontSize: 22, fontWeight: "600", margin: 2 },
    methodContainer: { height: 40, width: '100%', marginVertical: 10, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' },
    methodBtn: { height: 40, width: '45%', flexDirection: 'row', backgroundColor: '#F7D716', borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
    methodBtntxt: { color: 'white', fontSize: 18, fontWeight: "600", margin: 2 },
    fieldinfo: { fontSize: 20, color: 'grey', paddingLeft: 10 },
})