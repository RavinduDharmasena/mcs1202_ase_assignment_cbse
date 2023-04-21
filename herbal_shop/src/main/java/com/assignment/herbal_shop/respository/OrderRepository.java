package com.assignment.herbal_shop.respository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.assignment.herbal_shop.entities.Order;

public interface OrderRepository extends JpaRepository<Order, Long>{

}
