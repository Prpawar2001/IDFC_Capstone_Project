package com.rental_ride.app.model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection="Car")
public class Car {

	@Id
	private int carId;
	private String car_image;
	private String owner;
	private String car_model;
	private String city;
	private String car_type;
	private String fuel_type;
	private String gear_type;
	private String engine;
	private String milege;
	private String model_year;
	private String description;
	private double rent_charges;
	private List<String> bookingDates;
	
}
