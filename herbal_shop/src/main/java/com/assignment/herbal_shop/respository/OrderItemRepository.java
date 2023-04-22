package com.assignment.herbal_shop.respository;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.JpaRepository;

import com.assignment.herbal_shop.entities.Order;
import com.assignment.herbal_shop.entities.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long>{
	ArrayList<OrderItem> findByOrder(Order order);
}
