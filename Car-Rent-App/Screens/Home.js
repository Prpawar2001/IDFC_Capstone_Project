import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, FlatList, LogBox, TextInput, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BottomNavigation } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { Entypo } from '@expo/vector-icons';
import axios from 'axios';

const Home = ({ navigation, route }) => {

  useEffect(() => {
    getAdminCars();
    getUserCars();
    getDetails({ userName });
    myRentedHistory();
    LogBox.ignoreAllLogs();
  }, []);

  const [userName, setUserName] = useState(route.params.userName);
  const [city, setCity] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState('');

  const [adminCars, setAdminCars] = useState([]);
  const [userCars, setUserCars] = useState([]);

  function getAdminCars() {
    axios({
      method: 'GET',
      url: 'http://192.168.1.204:8085/RentalRides/Car/Admin',
    }).then(function (response) {
      setAdminCars(response.data);
    }).catch(function (error) {
      console.log(error);
    })
  }

  function getUserCars() {
    axios({
      method: 'GET',
      url: 'http://192.168.1.204:8085/RentalRides/Car/User',
    }).then(function (response) {
      setUserCars(response.data);
    }).catch(function (error) {
      console.log(error);
    })
  }

  function fiveSeatAc() {
    axios({
      method: 'GET',
      url: 'http://192.168.1.204:8085/RentalRides/Car/User/FiveSeatAcList',
    }).then(function (response) {
      console.log(response.data);
      ToastAndroid.showWithGravityAndOffset('List Updated  !!', ToastAndroid.SHORT, ToastAndroid.TOP, 0, 50)
      setUserCars(response.data);
    }).catch(function (error) {
      console.log(error);
    })
  }

  function fiveSeatNonAc() {
    axios({
      method: 'GET',
      url: 'http://192.168.1.204:8085/RentalRides/Car/User/FiveSeatNonAcList',
    }).then(function (response) {
      console.log(response.data);
      ToastAndroid.showWithGravityAndOffset('List Updated !!', ToastAndroid.SHORT, ToastAndroid.TOP, 0, 50)
      setUserCars(response.data);
    }).catch(function (error) {
      console.log(error);
    })
  }

  function eightSeatAc() {
    axios({
      method: 'GET',
      url: 'http://192.168.1.204:8085/RentalRides/Car/User/EightSeatAcList',
    }).then(function (response) {
      console.log(response.data);
      ToastAndroid.showWithGravityAndOffset('List Updated !!', ToastAndroid.SHORT, ToastAndroid.TOP, 0, 50)
      setUserCars(response.data);
    }).catch(function (error) {
      console.log(error);
    })
  }

  function eightSeatNonAc() {
    axios({
      method: 'GET',
      url: 'http://192.168.1.204:8085/RentalRides/Car/User/EightSeatNonAcList',
    }).then(function (response) {
      console.log(response.data);
      ToastAndroid.showWithGravityAndOffset('List Updated !!', ToastAndroid.SHORT, ToastAndroid.TOP, 0, 50)
      setUserCars(response.data);
    }).catch(function (error) {
      console.log(error);
    })
  }

  const getDetails = (userName) => {
    axios({
      method: 'GET',
      url: 'http://192.168.1.204:8085/RentalRides/Login/' + userName.userName,
    }).then(function (response) {
      setCity(response.data.user_city);
      setMobile(response.data.user_mobile);
      setEmail(response.data.email);
      setImage(response.data.user_image);
    }).catch(function (error) {
      console.log("error", error);
    })
  }

  const updateImage = (image) => {
    console.log(userName)
    console.log(image);
    axios({
      method: 'POST',
      url: 'http://192.168.1.204:8085/RentalRides/updateImage',
      data: {
        "userName": userName,
        "user_image": image,
      }
    }).then(function (response) {
      ToastAndroid.showWithGravityAndOffset(response.data, ToastAndroid.SHORT, ToastAndroid.TOP, 0, 50);
    }).catch(function (error) {
      console.log(error);
    })
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.canceled) {
      console.log(result.assets[0].uri)
      setImage(result.assets[0].uri);
      updateImage(result.assets[0].uri);
    }
  }
  const profileRoute = () =>
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Text onPress={() => navigation.navigate("Wallet", { userName: userName })} style={{ fontSize: 20, color: 'green', alignSelf: 'flex-end', paddingRight: 20, marginTop: 10 }}>
          <Entypo name="wallet" size={24} /> My Wallet </Text>
        <View style={styles.form}>
          {image && <Image source={{ uri: image }} style={{ width: 240, height: 240, borderRadius: 200, alignSelf: 'center' }} />}
          <View style={styles.container}>
            <TouchableOpacity style={[styles.btn, { backgroundColor: 'pink' }]} onPress={pickImage}>
              <Text style={styles.btntxt}>Update Profile Image</Text>
            </TouchableOpacity>
          </View>
          <Text style={{ color: 'grey', fontSize: 22, lineHeight: 30, alignSelf: 'center' }} onPress={()=>{getDetails({ userName })}} >Your Profile</Text>
          <View style={{ marginTop: 20 }}>
            <Text style={styles.fieldinfo}>Name:</Text>
            <TextInput style={styles.forminput} value={userName} editable={false} />
            <Text style={styles.fieldinfo}>City:</Text>
            <TextInput style={styles.forminput} value={city} editable={false} />
            <Text style={styles.fieldinfo}>Mobile Number:</Text>
            <TextInput style={styles.forminput} value={mobile} editable={false} />
            <Text style={styles.fieldinfo}>Email Id:</Text>
            <TextInput style={styles.forminput} value={email} editable={false} />
          </View>
          <TouchableOpacity style={styles.btn1} onPress={() => navigation.navigate("UpdateProfile", { user: userName })}>
            <Text style={styles.btntxt}>Update Details</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btn1, { backgroundColor: 'black' }]} onPress={() => navigation.navigate("RegisterCar", { userName: userName })}>
            <Text style={styles.btntxt}>Register My Car</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>;

  const homeRoute = () =>
    <View style={styles.container}>
      <View style={styles.homeMain}>
        <FlatList horizontal={true} data={adminCars} renderItem={(item) => {
          return <View style={[styles.scrollH, { flexDirection: 'row' }]}>
            <View style={{ height: '100%', width: '40%', paddingVertical: 5 }}>
              <Text style={{ fontSize: 25, fontWeight: '800', color: 'white', paddingLeft: 10, }}>{item.item.car_model}</Text>
              <Text style={{ fontSize: 15, fontWeight: '500', color: 'white', paddingLeft: 10 }}>Enjoy the luxuries ride!</Text>
              <Text style={{ fontSize: 25, fontWeight: '700', color: 'white', paddingLeft: 10, marginTop: 14 }}>{item.item.rent_charges}<Text style={{ fontSize: 15 }}> Rs/day</Text></Text>
              <TouchableOpacity onPress={() => { navigation.navigate("CarDetails", { userName: userName, carId: item.item.carId }) }} style={[styles.blackbtn, { width: '90%', height: 30, marginTop: 5, alignSelf: 'center' }]} >
                <Text style={[styles.blackbtntxt]}>Book Now!</Text>
              </TouchableOpacity>
            </View>
            <View style={{ height: '100%', width: '60%', justifyContent: 'center', overflow: 'hidden' }}>
              <Image source={{ uri: item.item.car_image }} style={{ resizeMode: 'contain', height: 400, width: 220, borderRadius: 10 }} />
            </View>
          </View>
        }} />
      </View>
      <View style={styles.balckBtnView}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <TouchableOpacity style={styles.blackbtn} onPress={fiveSeatAc}>
            <Text style={styles.blackbtntxt}>5 seater A/C</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.blackbtn} onPress={fiveSeatNonAc}>
            <Text style={styles.blackbtntxt}>5 seater non A/C</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <TouchableOpacity style={styles.blackbtn} onPress={eightSeatAc}>
            <Text style={styles.blackbtntxt}>8 seater A/C</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.blackbtn} onPress={eightSeatNonAc} >
            <Text style={styles.blackbtntxt}>8 seater non A/C</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView Vertical={true} style={{ width: '100%', height: '100%' }} showsVerticalScrollIndicator={false}>
        <View style={styles.uCarContainer}>
          <FlatList data={userCars} renderItem={(item) => {
            return <View style={[styles.userCarCard, {}]}>
              <Image style={{ height: '60%', width: '100%', borderRadius: 10 }} source={{ uri: item.item.car_image }} />
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
                <View>
                  <Text style={{ fontSize: 25, fontWeight: '700' }}>{item.item.car_model}</Text>
                  <Text style={{ fontSize: 17, }}>{item.item.owner}</Text>
                </View>
                <View>
                  <Text style={{ fontSize: 25, fontWeight: '700', color: 'green', paddingLeft: 10, marginTop: 14 }}>{item.item.rent_charges}<Text style={{ fontSize: 15 }}> Rs/day</Text></Text>
                </View>
              </View>
              <TouchableOpacity onPress={() => { navigation.navigate("CarDetails", { userName: userName, carId: item.item.carId }) }} style={[styles.blackbtn, { width: '90%', alignSelf: 'center', backgroundColor: 'green' }]} >
                <Text style={[styles.blackbtntxt, { fontSize: 20 }]}>Book Now</Text>
              </TouchableOpacity>
            </View>
          }} />
        </View>
      </ScrollView>
    </View>;

  const [rentbg, setRentbg] = useState('#F7D716');
  const [mycarbg, setMycarbg] = useState('black');
  const [myHistory, setMyHistory] = useState([]);

  function myRentedHistory() {
    console.log(userName)
    axios({
      method: 'GET',
      url: 'http://192.168.1.204:8085/RentalRides/User/rentedCars/' + userName,
    }).then(function (response) {
      setMyHistory(response.data);
    }).catch(function (error) {
      console.log(error);
    })
  }

  function myRegisteredCars() {
    axios({
      method: 'GET',
      url: 'http://192.168.1.204:8085/RentalRides/User/registeredCars/' + userName,
    }).then(function (response) {
      setMyHistory(response.data);
    }).catch(function (error) {
      console.log(error);
    })
  }

  const [Delete, setDelete] = useState(false);

  function deleteCar(carId){
    axios({
      method:'DELETE',
      url: 'http://192.168.1.204:8085/RentalRides/Car/Delete/' + carId,
    }).then(function (response) {
      ToastAndroid.showWithGravityAndOffset("Car removed sucessfully!!", ToastAndroid.SHORT, ToastAndroid.TOP, 0, 50)
    }).catch(function (error) {
      console.log(error);
    })
  }

  function displayDelete(carId) {
    if (Delete == true) {
      return <View>
        <TouchableOpacity style={[styles.blackbtn, { backgroundColor: '#DC3535', width: '90%' }]} onPress={() => { deleteCar(carId) }} >
          <Text style={styles.blackbtntxt}>Delete</Text>
        </TouchableOpacity>
      </View>
    }
  }
  const rentalsRoute = () =>
    <View style={styles.container}>
      <View>
        <Text style={[styles.headtxt, { color: 'grey', marginTop: 10 }]}>My Rentals</Text>
      </View>
      <View style={styles.balckBtnView}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <TouchableOpacity style={[styles.blackbtn, { backgroundColor: rentbg }]} onPress={() => {
            setRentbg('#F7D716');
            setMycarbg('black');
            myRentedHistory();
            setDelete(false)
          }}>
            <Text style={styles.blackbtntxt}>Rented Cars</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.blackbtn, { backgroundColor: mycarbg }]} onPress={() => {
            setRentbg('black');
            setMycarbg('#F7D716');
            myRegisteredCars();
            setDelete(true)
          }}>
            <Text style={styles.blackbtntxt}>Registered</Text>
          </TouchableOpacity>
        </View>
        <ScrollView Vertical={true} style={{ width: '100%', height: '100%' }} showsVerticalScrollIndicator={false}>
          <View style={[styles.uCarContainer]}>
            <FlatList data={myHistory} renderItem={(item) => {
              return <View style={[styles.userCarCard1, { overflow: 'hidden' }]}>
                <Image style={{ height: 150, width: 300, borderRadius: 10 }} source={{ uri: item.item.car_image }} />
                <View style={{ paddingLeft: 15, paddingVertical: 10 }}>
                  <Text style={{ fontSize: 18, fontWeight:'600', color:'grey' }}>{item.item.car_model}</Text>
                  <Text style={{ fontSize: 18, fontWeight:'600', color:'grey' }}>{item.item.date}</Text>
                  {displayDelete(item.item.carId)}
                </View>
              </View>
            }} />
          </View>
        </ScrollView>
      </View>
    </View>;

  const [index, setIndex] = React.useState(1);
  const [routes] = React.useState([
    { key: 'profile', title: 'My Profile', focusedIcon: 'account', unfocusedIcon: 'account-outline' },
    { key: 'home', title: 'Home', focusedIcon: 'home', unfocusedIcon: 'home-outline' },
    { key: 'rentals', title: 'Rentals', focusedIcon: 'car', unfocusedIcon: 'car-hatchback' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    profile: profileRoute,
    home: homeRoute,
    rentals: rentalsRoute,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      barStyle={{ height: 66, backgroundColor: '#EAEAEA' }}
      sceneAnimationType='shifting'
      activeColor='green'
    />
  )
}

export default Home

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#EFF5F5', alignItems: 'center', paddingTop: 20 },
  homeMain: { height: '28%', borderRadius: 10, marginVertical: 5, },
  scrollH: { height: '90%', elevation: 15, shadowColor: 'darkgrey', width: 320, borderRadius: 10, backgroundColor: '#54B435', marginHorizontal: 20, justifyContent: 'center', alignItems: 'center', alignSelf: 'center' },
  balckBtnView: { width: '95%', borderRadius: 10, paddingVertical: 5, backgroundColor: 'white' },
  blackbtn: { height: 40, width: '45%', backgroundColor: 'black', borderRadius: 10, marginVertical: 5, justifyContent: 'center', alignItems: 'center', },
  blackbtntxt: { color: 'white', fontSize: 15, fontWeight: '900' },
  uCarContainer: { width: '90%', alignSelf: 'center', paddingTop: 10 },
  userCarCard: { backgroundColor: 'white', elevation: 10, shadowColor: 'grey', margin: 10, borderRadius: 10, height: 270 },
  userCarCard1: { backgroundColor: 'white', elevation: 10, shadowColor: 'grey', margin: 10, borderRadius: 10, },
  logo: { height: 110, width: 250, resizeMode: 'stretch', marginTop: 50, },
  fieldinfo: { fontSize: 20, color: 'grey', paddingLeft: 10 },
  form: { height: '60%', borderRadius: 10, width: '90%', paddingVertical: 20, paddingHorizontal: 20, },
  headtxt: { fontSize: 35, fontWeight: "500", lineHeight: 40, alignSelf: 'center', marginBottom: 18 },
  forminput: { borderWidth: 0.5, borderColor: 'darkgrey', fontSize: 18, color: 'green', borderRadius: 8, alignSelf: 'center', marginVertical: 18, paddingHorizontal: 20, height: 50, width: '100%', backgroundColor: 'white', },
  btn: { height: 45, width: '100%', backgroundColor: 'green', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginVertical: 20, borderRadius: 15 },
  btn1: { height: 45, width: '100%', backgroundColor: 'green', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginVertical: 10, borderRadius: 15 },
  btntxt: { color: 'white', fontSize: 20, fontWeight: "600", margin: 2 },
});