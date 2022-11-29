import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ScrollView, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import Home from './Home';
import axios from 'axios';

const Payment = ({ navigation, route }) => {
    const [userName, setUserName] = useState(route.params.userName);
    const [id, setId] = useState(route.params.carId);
    const [charges, setCharges] = useState(route.params.amount);
    const [accNo, setAccNo] = useState(route.params.userName);
    const [image, setImage] = useState(route.params.image);
    const [paymentMethod, setPaymentMethod] = useState('Bank Card')
    const [placeholder, setPlaceholder] = useState("Enter Card Number")
    const [paymentImage, setPaymentImage] = useState(require('../StaticImages/Bank.png'));
    const [bankCardBg, setBankCardbg] = useState('#F7D716');
    const [upibtnbg, setUpibtnbg] = useState('black')
    const [walletbtnbg, setwalletbtnbg] = useState('black')
    const [hei, setHei] = useState(50)
    const [border, setBorder] = useState(0.5)
    const today = new Date();
    const [date, setDate] = useState(new Date());
    const maxDate = new Date().setMonth(today.getMonth() + 3)
    const str = (date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear()).toString()

    const onChange = (event, selectedDate) => {
        setDate(selectedDate);
        console.log(date);
    };

    const dateView = () => {
        DateTimePickerAndroid.open({
            value: date,
            minimumDate: new Date().setDate(today.getDate()+2),
            maximumDate: maxDate,
            onChange: onChange,
            mode: 'date',
        });
    };

    function pay() {
        if(date == today){
            ToastAndroid.showWithGravityAndOffset("Enter account number or UPI", ToastAndroid.SHORT, ToastAndroid.TOP, 0, 50)
        }else if(accNo == null ){
            ToastAndroid.showWithGravityAndOffset("Enter account number or UPI", ToastAndroid.SHORT, ToastAndroid.TOP, 0, 50)
        }else{
            axios({
                method: 'POST',
                url: 'http://192.168.1.204:8085/RentalRides/Car/Booking',
                data: {
                    "carId": id,
                    "car_image": image,
                    "rentedBy": userName,
                    "date": str,
                    "payment_method": paymentMethod,
                    "accountNo": accNo 
                }
            }).then(function (response) {
                ToastAndroid.showWithGravityAndOffset(response.data, ToastAndroid.SHORT, ToastAndroid.TOP, 0, 50)
            }).catch(function (error) {
                console.log("error", error);
            })
        }
    }

    function paymentForm() {
        return <View>
            <Image source={paymentImage} style={{ height: 150, width: '100%', resizeMode: 'stretch', borderRadius: 10, marginVertical: 20 }} />
            <TextInput style={[styles.forminput, { height: hei, borderWidth: border }]} placeholder={placeholder} onChangeText={(e) => setAccNo(e)} />
            <Text style={styles.fieldinfo}>Select Date:</Text>
            <TextInput style={styles.forminput} value={str} onPressIn={dateView} />
            <Text style={styles.fieldinfo}>Amount:</Text>
            <Text style={[styles.forminput, { paddingVertical: 12 }]}>{charges}</Text>
        </View>
    }
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
                <View style={styles.form}>
                    <Text style={{ color: 'grey', fontSize: 30, lineHeight: 30, alignSelf: 'center', marginVertical: 20 }}>Payment</Text>
                    <View style={styles.methodContainer}>
                        <TouchableOpacity style={[styles.methodBtn, { backgroundColor: bankCardBg }]} onPress={() => {
                            setPaymentImage(require('../StaticImages/bankCard.png'));
                            setPlaceholder("Enter Card Number");
                            setBankCardbg('#F7D716');
                            setUpibtnbg('black')
                            setwalletbtnbg('black')
                            setHei(50)
                            setBorder(0.5)
                            setPaymentMethod('Bank Card')
                        }}>
                            <Text style={styles.methodBtntxt}>Bank Card</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.methodBtn, { backgroundColor: upibtnbg }]} onPress={() => {
                            setPaymentImage(require('../StaticImages/UPI.png'));
                            setPlaceholder("Enter UPI Id");
                            setBankCardbg('black');
                            setUpibtnbg('#F7D716')
                            setwalletbtnbg('black')
                            setHei(50)
                            setBorder(0.5)
                            setPaymentMethod('UPI')
                        }}>
                            <Text style={styles.methodBtntxt}>UPI</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.methodBtn, { backgroundColor: walletbtnbg }]} onPress={() => {
                            setPaymentImage(require('../StaticImages/wallet.png'));
                            setPlaceholder("Enter mail");
                            setBankCardbg('black');
                            setUpibtnbg('black')
                            setwalletbtnbg('#F7D716')
                            setHei(0)
                            setBorder(0)
                            setPaymentMethod('Wallet Payment')
                            setAccNo(userName)
                        }}>
                            <Text style={styles.methodBtntxt}>Wallet</Text>
                        </TouchableOpacity>
                    </View>
                    {paymentForm()}
                    <TouchableOpacity style={styles.btn} onPress={() => { pay() }}>
                        <Text style={styles.btntxt}>Pay</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btn, { backgroundColor: '#DC3535' }]} onPress={() => { navigation.navigate("Home", userName) }}>
                        <Text style={styles.btntxt}>Cancel Payment</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}

export default Payment

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#EFF5F5', alignItems: 'center', },
    logo: { height: 110, width: 250, resizeMode: 'stretch', marginTop: 50, },
    fieldinfo: { fontSize: 20, color: 'grey', paddingLeft: 10 },
    form: { height: '60%', borderRadius: 10, width: '90%', marginVertical: 15, paddingVertical: 20, paddingHorizontal: 20, },
    headtxt: { fontSize: 35, fontWeight: "500", lineHeight: 40, alignSelf: 'center', marginBottom: 18 },
    forminput: { borderWidth: 0.5, borderColor: 'darkgrey', fontSize: 18, color: 'green', borderRadius: 8, alignSelf: 'center', marginVertical: 8, paddingHorizontal: 20, height: 50, width: '100%', backgroundColor: 'white', },
    btn: { height: 45, width: '100%', backgroundColor: 'green', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 15, borderRadius: 15 },
    btntxt: { color: 'white', fontSize: 22, fontWeight: "600", margin: 2 },
    methodContainer: { height: 40, width: '100%', marginVertical: 10, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' },
    methodBtn: { height: 40, width: '31%', flexDirection: 'row', backgroundColor: '#F7D716', borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
    methodBtntxt: { color: 'white', fontSize: 18, fontWeight: "600", margin: 2 },
    fieldinfo: { fontSize: 20, color: 'grey', paddingLeft: 10 },
})