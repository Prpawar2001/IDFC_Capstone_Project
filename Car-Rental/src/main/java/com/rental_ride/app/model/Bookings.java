package com.rental_ride.app.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Bookings {
	
	private int carId;
	private String car_image;
	private String owner;
	private String rentedBy;
	private String date;
	private double amount;
	private String payment_method;
	private String accountNo;
    
}
