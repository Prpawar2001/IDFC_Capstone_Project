import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react'
import Payment from './Payment'
import axios from 'axios';

const CarDetails = ({ navigation, route }) => {

    const [userName, setUserName] = useState(route.params.userName);
    const [id, setId] = useState(route.params.carId);
    const [owner, setOwner] = useState('');
    const [model, setModel] = useState('');
    const [city, setCity] = useState('');
    const [engine, setEngine] = useState('');
    const [milege, setMilege] = useState('');
    const [year, setYear] = useState('');
    const [desc, setDesc] = useState('');
    const [charges, setCharges] = useState('');
    const [carType, setCarType] = useState('');
    const [fuelType, setfuelType] = useState('');
    const [GearType, setGearType] = useState('');
    const [image, setImage] = useState(null);

    useEffect(() => {
        getCarDetails();
        // LogBox.ignoreAllLogs();
    }, []);

    function getCarDetails() {
        axios({
            method: 'GET',
            url: 'http://192.168.1.204:8085/RentalRides/Car/User/showCar/' + id,
        }).then(function (response) {
            setOwner(response.data.owner)
            setModel(response.data.car_model)
            setCity(response.data.city)
            setEngine(response.data.engine)
            setMilege(response.data.milege)
            setYear(response.data.model_year)
            setDesc(response.data.description)
            setCharges(response.data.rent_charges)
            setCarType(response.data.car_type)
            setfuelType(response.data.fuel_type)
            setGearType(response.data.gear_type)
            setImage(response.data.car_image)
        }).catch(function (error) {
            console.log(error);
        })
    }

    return (
        <View>
            <Image style={{ height: '60%', width: '100%', borderRadius: 10 }} source={{ uri: image }} />
            <View style={{ width: '90%', alignSelf: 'center', height: 100 }}>
                <Text style={[styles.headtxt, { color: 'green' }]}>{model}</Text>
                <View>
                    <Text style={{ color: 'black', fontSize: 22, marginVertical: 5, fontWeight: '700' }}>{owner}</Text>
                    <Text style={{ color: 'green', fontSize: 17, fontWeight: '500' }}>{city}</Text>
                </View>
                <Text style={{ color: 'grey' }}>{desc}</Text>
                <View style={{ flexDirection: 'row', borderRadius: 10, paddingVertical: 20, backgroundColor: 'white', justifyContent: 'space-around', elevation: 10, marginTop: 10 }}>
                    <View style={{}}>
                        <Text style={{ fontSize: 13, fontWeight: '600', color: 'green', marginVertical: 5 }}><MaterialCommunityIcons name="car-seat" size={21} /> Seats : <Text style={{ color: 'grey' }}>{carType}</Text></Text>
                        <Text style={{ fontSize: 13, fontWeight: '600', color: 'green', marginVertical: 5 }}><MaterialCommunityIcons name="fuel" size={21} /> fuelType : <Text style={{ color: 'grey' }}>{fuelType}</Text></Text>
                        <Text style={{ fontSize: 13, fontWeight: '600', color: 'green', marginVertical: 5 }}><Ionicons name="speedometer-outline" size={21} /> Milege : <Text style={{ color: 'grey' }}>{milege} Km/L</Text></Text>
                    </View>
                    <View style={{}}>
                        <Text style={{ fontSize: 13, fontWeight: '600', color: 'green', marginVertical: 5 }}><FontAwesome name="gears" size={18} /> Transmission : <Text style={{ color: 'grey' }}>{GearType}</Text></Text>
                        <Text style={{ fontSize: 13, fontWeight: '600', color: 'green', marginVertical: 5 }}><MaterialCommunityIcons name="engine" size={21} /> Engine : <Text style={{ color: 'grey' }}>{engine}<Text> cc</Text></Text></Text>
                        <Text style={{ fontSize: 13, fontWeight: '600', color: 'green', marginVertical: 5 }}>Model Year: <Text style={{ fontSize: 14, color: 'grey' }}>{year}</Text></Text>
                    </View>
                </View>
                <Text style={[styles.headtxt, { marginVertical: 15, color: 'black' }]}>{charges}<Text> Rs/day</Text></Text>
                <TouchableOpacity style={styles.blackbtn} onPress={() => { navigation.navigate("Payment", { userName: userName, amount: charges, carId: id, image: image }) }}>
                    <Text style={styles.blackbtntxt}>Book Now</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default CarDetails

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#EFF5F5', alignItems: 'center', paddingTop: 40 },
    headtxt: { color: 'grey', fontSize: 35, fontWeight: "500", lineHeight: 40, marginBottom: 5, },
    blackbtn: { height: 50, width: '80%', alignSelf: 'center', backgroundColor: 'black', borderRadius: 12, marginVertical: 8, justifyContent: 'center', alignItems: 'center', },
    blackbtntxt: { color: 'white', fontSize: 20, fontWeight: '900' },
})