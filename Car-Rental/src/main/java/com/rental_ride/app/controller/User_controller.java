package com.rental_ride.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rental_ride.app.model.Bookings;
import com.rental_ride.app.model.Car;
import com.rental_ride.app.model.User;
import com.rental_ride.app.service.Car_service;
import com.rental_ride.app.service.User_service;

@RestController
@RequestMapping("/RentalRides")
public class User_controller {
	
	@Autowired
	private User_service user_service;
	
	@Autowired
	private Car_service car_service;
	
//	Sign up  
	@PostMapping("/SignUp")
	public String RegisterUserAccount(@RequestBody User user) {
		return user_service.signUp(user);
	}
	
//	Login Validation 
	@GetMapping("/Login/{name}")
	public User UserLogin(@PathVariable String name) {
		return user_service.login(name);
	}
	
//	Update Profile Image
	@PostMapping("/updateImage")
	public String UpdateProfileImage(@RequestBody User user) {
		return user_service.updateImage(user);
	}

//	Update user details
	@PutMapping("/UpdateUser")
	public String UpdateUserDetails(@RequestBody User user) {
		return user_service.updateUserDetails(user);
	}
	
//	Update password
	@PutMapping("/forgotPass/{userName}/{email}/{newPass}")
	public String forgotPassword(@PathVariable String userName, @PathVariable String email, @PathVariable String newPass) {
		return user_service.updatePassword(userName, email, newPass);
	}
	
////	6.Deposit amount in wallet
//	@PutMapping("/wallet/deposit/{userName}/{amount}")
//	public String depositAmountWallet(@PathVariable String userName, @PathVariable double amount) {
//		return user_service.addAmountWallet(userName, amount);
//	}
//	
////	7.Withdraw amount in wallet
//	@PutMapping("/wallet/withdraw/{userName}/{amount}")
//	public String withdrawAmountWallet(@PathVariable String userName, @PathVariable double amount) {
//		return user_service.removeAmountWallet(userName, amount);
//	}
	
//	Register Car
	@PostMapping("/Car/RegisterCar")
	public String RegisterCar(@RequestBody Car car) {
		return car_service.addCar(car);
	}
	
//	Book Car
	@PostMapping("/Car/Booking")
	public String BookCar(@RequestBody Bookings booking) {
		return car_service.carBooking(booking);
	}
	
//	Admin Car's List
	@GetMapping("/Car/Admin")
	public List<Car> AdminCarList(){
		return car_service.adminCars();
	}
	
//	User Car's List
	@GetMapping("/Car/User")
	public List<Car> UserCarList(){
		return car_service.userCars();
	}
	
//	5 Seater A/c Car's List
	@GetMapping("/Car/User/FiveSeatAcList")
	public List<Car> FiveSeatAcList(){
		return car_service.fiveSeaterAc();
	}
	
//	5 Seater non A/c Car's List
	@GetMapping("/Car/User/FiveSeatNonAcList")
	public List<Car> FiveSeatNonAcList(){
		return car_service.fiveSeaterNonAc();
	}
	
//	8 Seater A/c Car's List
	@GetMapping("/Car/User/EightSeatAcList")
	public List<Car> EightSeatAcList(){
		return car_service.EightSeaterAc();
	}
	
//	5 Seater A/c non A/c Car's List
	@GetMapping("/Car/User/EightSeatNonAcList")
	public List<Car> EightSeatNonAcList(){
		return car_service.EightSeaterNonAc();
	}
	
//	show Car Details
	@GetMapping("/Car/User/showCar/{id}")
	public Car showCarDetails(@PathVariable int id){
		return car_service.showCarDetails(id);
	}
	
//	Update amount to Wallet
	@PostMapping("/Wallet/{userName}/{amount}/{method}")
	public String depositWallet(@PathVariable String userName, @PathVariable double amount, @PathVariable String method) {
		return user_service.depositWallet(userName, amount, method);
	}
	
//	Wallet Balance
	@GetMapping("/Wallet/balance/{userName}")
	public double getBalance(@PathVariable String userName) {
		return user_service.getBalance(userName);
	}
	
//	Get User Rented Cars
	@GetMapping("/User/rentedCars/{userName}")
	public List<Bookings> getMyRentedCars(@PathVariable String userName){
		return car_service.getMyRentedCars(userName);
	}
	
//	Get User Registered Cars
	@GetMapping("/User/registeredCars/{userName}")
	public List<Car> getMyRegisterdCars(@PathVariable String userName){
		return car_service.registeredCarByName(userName);
	}
	
//	Delete Car
	@DeleteMapping("/Car/Delete/{id}")
	public String deleteCar(@PathVariable int id) {
		return car_service.deleteCar(id);
	}
	
}
