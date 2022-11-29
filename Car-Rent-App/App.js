import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CarDetails from './Screens/CarDetails';
import Home from './Screens/Home';
import Login from './Screens/Login';
import Payment from './Screens/Payment';
import Register from './Screens/Register';
import RegisterCar from './Screens/RegisterCar';
import ResetPassword from './Screens/ResetPassword';
import UpdateProfile from './Screens/UpdateProfile';
import Wallet from './Screens/Wallet';

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='Register' component={Register} />
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='RegisterCar' component={RegisterCar} />
        <Stack.Screen name='Payment' component={Payment} />
        <Stack.Screen name='CarDetails' component={CarDetails} />
        <Stack.Screen name='ResetPassword' component={ResetPassword} />
        <Stack.Screen name='Wallet' component={Wallet} />
        <Stack.Screen name='UpdateProfile' component={UpdateProfile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
