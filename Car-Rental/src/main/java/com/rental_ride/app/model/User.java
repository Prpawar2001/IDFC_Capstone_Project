package com.rental_ride.app.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection="user")
public class User {

	@Id
	private String userName;
	private String user_image;
	private String user_city;
	private String user_mobile;
	private String email;
	private String password;
	private double wallet_amount;
	
}
