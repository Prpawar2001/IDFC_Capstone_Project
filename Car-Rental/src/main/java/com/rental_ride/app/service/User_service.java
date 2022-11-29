package com.rental_ride.app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rental_ride.app.model.User;
import com.rental_ride.app.repository.User_repo;

@Service
public class User_service {

	@Autowired
	private User_repo user_repo;

	public String signUp(User user) {
		if (user_repo.existsById(user.getUserName())) {
			return "This Username is already exist!!";
		} else {
			user_repo.save(user);
			return "Account Created Successfully !!";
		}
	}

	public User login(String name) {
		if (user_repo.existsById(name)) {
			return user_repo.findById(name).get();
		}
		return null;
	}

	public String updatePassword(String name, String email, String newPass) {
		if (user_repo.existsById(name)) {
			User u = user_repo.findById(name).get();
			if (u.getEmail().equals(email)) {
				u.setPassword(newPass);
				user_repo.save(u);
				return "Password Reset Sucessfully!!";
			} else {
				return "Invalid email!!";
			}
		} else {
			return "This Username not exist!!";
		}
	}

	public String updateUserDetails(User user) {
		User u = user_repo.findById(user.getUserName()).get();
		if (user.getUser_image() != null && user.getUser_image() != "") {
			u.setUser_image(user.getUser_image());
		}
		if (user.getUser_city() != null && user.getUser_city() != "") {
			u.setUser_city(user.getUser_city());
		}
		if (user.getUser_mobile() != null && user.getUser_mobile() != "") {
			u.setUser_mobile(user.getUser_mobile());
		}
		if (user.getEmail() != null && user.getEmail() != "") {
			u.setEmail(user.getEmail());
		}
		if (user.getPassword() != null && user.getPassword() != "") {
			u.setPassword(user.getPassword());
		}
		user_repo.save(u);
		return "Account updated Sucessfully!!";
	}

//	public String addAmountWallet(String userName, double amount) {
//		if (amount < 0) {
//			return "Invalid amount entry!!";
//		} else {
//			User u = user_repo.findById(userName).get();
//			u.setWallet_amount(u.getWallet_amount() + amount);
//			user_repo.save(u);
//			return "Amount Deposited Sucessfully!!";
//		}
//	}
//
//	public String removeAmountWallet(String userName, double amount) {
//		if (amount < 0) {
//			return "Invalid amount entry!!";
//		} else {
//			User u = user_repo.findById(userName).get();
//			u.setWallet_amount(u.getWallet_amount() - amount);
//			user_repo.save(u);
//			return "Amount Withdrawn Sucessfully!!";
//		}
//	}

	public String updateImage(User user) {
		User u = user_repo.findById(user.getUserName()).get();
		u.setUser_image(user.getUser_image());
		user_repo.save(u);
		return "Profile Image Updated Successfully !!";
	}
	
	public String depositWallet(String userName, double amount, String operation) {
		User u = user_repo.findById(userName).get();
		if(amount <= 0) {
			return "Invalid amount entry!!";
		}else if(operation.equals("Withdraw")) {
			if(u.getWallet_amount() < amount) {
				return "Wallet balance is low!!";
			}else {
				u.setWallet_amount(u.getWallet_amount() - amount);
				user_repo.save(u);
				return "Amount withdrawn Sucessfully!!";
			}
		}else {
			u.setWallet_amount(u.getWallet_amount() + amount);
			user_repo.save(u);
			return "Amount Deposit Sucessfully!!";
		}
	}

	public double getBalance(String userName) {
		return user_repo.findById(userName).get().getWallet_amount();
	}

}
