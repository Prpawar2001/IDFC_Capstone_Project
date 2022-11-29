package com.rental_ride.app.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rental_ride.app.model.Bookings;
import com.rental_ride.app.model.Car;
import com.rental_ride.app.model.User;
import com.rental_ride.app.repository.Booking_repo;
import com.rental_ride.app.repository.Car_repo;
import com.rental_ride.app.repository.User_repo;

@Service
public class Car_service {
	
	@Autowired
	private Car_repo car_repo;
	
	@Autowired
	private Booking_repo booking;
	
	@Autowired
	private User_repo user_repo;
	
	public String addCar(Car car) {
		if(car_repo.existsById(car.getCarId())) {
			return "This car ID already exists !!";
		}else {
			List<String> a = new ArrayList<String>();
			a.add("Booking Dates:");
			car.setBookingDates(a);
			car_repo.save(car);
			return "Car registered Successfully!!";
		}
	}
	
	public String carBooking(Bookings userbooking) {
		System.out.println();
		Car c = car_repo.findById(userbooking.getCarId()).get();
		if(c.getBookingDates().contains(userbooking.getDate())) {
			return "This Car is not Available on this date!!";
		}else if(userbooking.getPayment_method().equals("Wallet Payment")){
			User u = user_repo.findById(userbooking.getRentedBy()).get();
			if(u.getWallet_amount() < c.getRent_charges()) {
				return "Insufficient Money in Wallet";
			}else {
				u.setWallet_amount(u.getWallet_amount() - c.getRent_charges());
				user_repo.save(u);
				c.getBookingDates().add(userbooking.getDate());
				userbooking.setOwner(c.getOwner());
				userbooking.setAmount(c.getRent_charges());
				User owner = user_repo.findById(userbooking.getOwner()).get();
				owner.setWallet_amount(owner.getWallet_amount() + c.getRent_charges());
				user_repo.save(owner);
				booking.save(userbooking);
				car_repo.save(c);
				return "Car Booked!!";
			}
		}else{
			c.getBookingDates().add(userbooking.getDate());
			userbooking.setOwner(c.getOwner());
			userbooking.setAmount(c.getRent_charges());
			User owner = user_repo.findById(userbooking.getOwner()).get();
			System.out.println(owner);
			owner.setWallet_amount(owner.getWallet_amount() + c.getRent_charges());
			user_repo.save(owner);
			booking.save(userbooking);
			car_repo.save(c);
			return "Car Booked!!";
		}
	}
	
	public List<Car> adminCars(){
		return car_repo.findAll().stream().filter((e) -> (e.getOwner().equals("Admin"))).toList();
	}
	
	public List<Car> userCars(){
		return car_repo.findAll().stream().filter((e) -> (e.getCarId() > 999)).toList();
	}
	
	public List<Car> fiveSeaterAc(){
		return car_repo.findAll().stream().filter((e) -> (e.getCar_type().equals("5 Seater A/C"))).toList();
	}
	
	public List<Car> fiveSeaterNonAc(){
		return car_repo.findAll().stream().filter((e) -> (e.getCar_type().equals("5 Seater non A/C"))).toList();
	}
	
	public List<Car> EightSeaterAc(){
		return car_repo.findAll().stream().filter((e) -> (e.getCar_type().equals("8 Seater A/C"))).toList();
	}
	
	public List<Car> EightSeaterNonAc(){
		return car_repo.findAll().stream().filter((e) -> (e.getCar_type().equals("8 Seater non A/C"))).toList();
	}
	
	public Car showCarDetails(int id) {
		return car_repo.findById(id).get();
	}
	
	public List<Bookings> getMyRentedCars(String rentedBy){
		return booking.findAll().stream().filter((e) -> (e.getRentedBy().equals(rentedBy))).toList();
	}
	
	public List<Car> registeredCarByName(String name){
		return car_repo.findAll().stream().filter((e)->(e.getOwner().equals(name))).toList();
	}
	
	public String deleteCar(int id) {
		car_repo.deleteById(id);
		return "Car deleted!!";
	}
	
}
