import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ScrollView, ToastAndroid } from 'react-native'
import { SelectList } from 'react-native-dropdown-select-list';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react'
import Home from './Home'
import axios from 'axios';

const RegisterCar = ({ navigation, route }) => {
    const [userName, setUserName] = useState(route.params.userName);
    const [id, setId] = useState('');
    const [model, setModel] = useState('');
    const [city, setCity] = useState('');
    const [engine, setEngine] = useState('');
    const [milege, setMilege] = useState('');
    const [year, setYear] = useState('');
    const [desc, setDesc] = useState('');
    const [charges, setCharges] = useState('');
    const [carType, setCarType] = useState('');
    const carTypes = ['5 Seater A/C', '5 Seater non A/C', '8 Seater A/C', '8 Seater non A/C'];
    const [fuelType, setfuelType] = useState('');
    const fuelTypes = ['Disel', 'Petrol', 'Electric'];
    const [GearType, setGearType] = useState('');
    const GearTypes = ['Auto', 'Manual'];
    const [image, setImage] = useState(null);
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        console.log(result);
        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    }

    const CarRegistration = () => {
        if (id == '' || image == '' || model == '' || city == '' || carType == '' || fuelType == '' ||
            GearType == '' || engine == '' || milege == '' || year == '' || desc == '' || charges == '') {
            ToastAndroid.showWithGravityAndOffset('Please Provide All Fields !!', ToastAndroid.SHORT, ToastAndroid.TOP, 0, 50);
        }else if(id.length != 4){
            ToastAndroid.showWithGravityAndOffset('Please Provide 4 digit Account Number !!', ToastAndroid.SHORT, ToastAndroid.TOP, 0, 50);
        } else if(image == null){
            ToastAndroid.showWithGravityAndOffset('Please Provide Image !!', ToastAndroid.SHORT, ToastAndroid.TOP, 0, 50);
        }else {
            axios({
                method: 'POST',
                url: 'http://192.168.1.204:8085/RentalRides/Car/RegisterCar',
                data: {
                    "carId": id,
                    "car_image": image,
                    "owner": userName,
                    "car_model": model,
                    "city": city,
                    "car_type": carType,
                    "fuel_type": fuelType,
                    "gear_type": GearType,
                    "engine": engine,
                    "milege": milege,
                    "model_year": year,
                    "description": desc,
                    "rent_charges": charges
                }
            }).then(function(response){
                ToastAndroid.showWithGravityAndOffset(response.data, ToastAndroid.SHORT, ToastAndroid.TOP, 0, 50);
                navigation.navigate("Home",userName)
            }).catch(function(error){
                console.log(error);
            })
        }

    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
                <Image source={require('../StaticImages/car.png')} style={styles.logo} />
                <View style={styles.form}>
                    <Text style={styles.headtxt}>Register Car</Text>
                    <Text style={{ color: 'darkgrey', fontSize: 22, lineHeight: 30, alignSelf: 'center', textAlign: 'center' }}>Register you car with us and start earning!</Text>
                    <View style={{ marginTop: 20 }}>
                        <View style={styles.container}>
                            {image && <Image source={{ uri: image }} style={{ width: 200, height: 150, borderRadius: 10 }} />}
                            <TouchableOpacity style={[styles.btn, { backgroundColor: 'pink' }]} onPress={pickImage}>
                                <Text style={styles.btntxt}>upload image</Text>
                            </TouchableOpacity>
                        </View>
                        <TextInput style={styles.forminput} placeholder='Enter 4 digit Car ID' keyboardType='numeric' onChangeText={(e) => setId(e)} />
                        <TextInput style={styles.forminput} placeholder='Enter Car model' onChangeText={(e) => setModel(e)} />
                        <TextInput style={styles.forminput} placeholder='Enter your city' onChangeText={(e) => setCity(e)} />
                        <SelectList searchPlaceholder={'Select Car Type'} inputStyles={{ fontSize: 18, color: 'green' }} boxStyles={[styles.forminput, { alignItems: 'center' }]} dropdownStyles={{ backgroundColor: 'white' }} data={carTypes} value={carType} setSelected={setCarType} />
                        <SelectList searchPlaceholder={"Select Car's fuel Type"} inputStyles={{ fontSize: 18, color: 'green' }} boxStyles={[styles.forminput, { alignItems: 'center' }]} dropdownStyles={{ backgroundColor: 'white' }} data={fuelTypes} value={fuelType} setSelected={setfuelType} />
                        <SelectList searchPlaceholder={'Select Gear Type'} inputStyles={{ fontSize: 18, color: 'green' }} boxStyles={[styles.forminput, { alignItems: 'center' }]} dropdownStyles={{ backgroundColor: 'white' }} data={GearTypes} value={GearType} setSelected={setGearType} />
                        <TextInput style={styles.forminput} placeholder='Enter Engine cc' keyboardType='numeric' onChangeText={(e) => setEngine(e)} />
                        <TextInput style={styles.forminput} placeholder='Enter Car milege' keyboardType='numeric' onChangeText={(e) => setMilege(e)} />
                        <TextInput style={styles.forminput} placeholder='Enter Car Model year' keyboardType='numeric' onChangeText={(e) => setYear(e)} />
                        <TextInput style={styles.forminput} placeholder='Enter Description' onChangeText={(e) => setDesc(e)} />
                        <TextInput style={styles.forminput} placeholder='Enter your charges per day' keyboardType='number-pad' onChangeText={(e) => setCharges(e)} />
                    </View>
                    <Text style={{ marginLeft: 10, marginVertical: 2, fontWeight: "300", }}>
                        <Text style={{ color: '#002E94', fontWeight: "400" }} onPress={() => navigation.navigate(Home)}>Go Back</Text>
                    </Text>
                    <TouchableOpacity style={styles.btn} onPress={CarRegistration}>
                        <Text style={styles.btntxt}>Register Car</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}

export default RegisterCar

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#EFF5F5', alignItems: 'center', },
    logo: { height: 110, width: 250, resizeMode: 'stretch', marginTop: 50, },
    form: { height: '60%', borderRadius: 10, width: '90%', marginVertical: 15, paddingVertical: 20, paddingHorizontal: 20, },
    headtxt: { fontSize: 35, fontWeight: "500", lineHeight: 40, alignSelf: 'center', marginBottom: 18 },
    forminput: { borderWidth: 0.5, borderColor: 'darkgrey', fontSize: 18, color: 'green', borderRadius: 8, alignSelf: 'center', marginVertical: 18, paddingHorizontal: 20, height: 50, width: '100%', backgroundColor: 'white', },
    btn: { height: 45, width: '100%', backgroundColor: 'green', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginVertical: 20, borderRadius: 15 },
    btntxt: { color: 'white', fontSize: 20, fontWeight: "600", margin: 2 },
})