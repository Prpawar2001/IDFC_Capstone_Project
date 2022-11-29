package com.rental_ride.app.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.rental_ride.app.model.User;

@Repository
public interface User_repo extends MongoRepository<User, String> {

}
