package com.assignment.herbal_shop.respository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.assignment.herbal_shop.entities.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long>{

}
