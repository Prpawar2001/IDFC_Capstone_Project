package com.rental_ride.app.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.rental_ride.app.model.Bookings;

@Repository
public interface Booking_repo extends MongoRepository<Bookings, Integer> {

}
