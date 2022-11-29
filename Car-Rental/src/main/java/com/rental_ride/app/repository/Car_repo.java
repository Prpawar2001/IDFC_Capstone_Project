package com.rental_ride.app.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.rental_ride.app.model.Car;

@Repository
public interface Car_repo extends MongoRepository<Car, Integer> {

}
