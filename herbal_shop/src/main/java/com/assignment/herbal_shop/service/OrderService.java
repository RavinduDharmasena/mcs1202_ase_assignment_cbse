package com.assignment.herbal_shop.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.assignment.herbal_shop.dto.OrderPostDTO;
import com.assignment.herbal_shop.dto.OrderedItemsDTO;
import com.assignment.herbal_shop.entities.Item;
import com.assignment.herbal_shop.entities.Order;
import com.assignment.herbal_shop.entities.OrderItem;
import com.assignment.herbal_shop.entities.OrderItemKey;
import com.assignment.herbal_shop.respository.ItemRepository;
import com.assignment.herbal_shop.respository.OrderItemRepository;
import com.assignment.herbal_shop.respository.OrderRepository;

@Service
public class OrderService {

	private final double COMMISSION_RATE = 0.5;
	private final String ORDER_PENDING_STATUS = "pending";
	private final String ORDER_CONFIRM_STATUS = "confirm";
	@Autowired
	private OrderRepository orderRepository;

	@Autowired
	private ItemRepository itemRepository;

	@Autowired
	private OrderItemRepository orderItemRepository;

	public ArrayList<Order> getOrders() {
		return new ArrayList<>(this.orderRepository.findAll());
	}

	public Order insertOrder(OrderPostDTO orderPostDto) {
		orderPostDto.getOrder().setOrderStatus(ORDER_PENDING_STATUS);
		float commission = 0;
		Order order = this.orderRepository.save(orderPostDto.getOrder());

		for (OrderedItemsDTO orderedItem : orderPostDto.getItems()) {
			Item item = this.itemRepository.findById(orderedItem.getItemId()).get();
			OrderItem orderItem = new OrderItem();
			orderItem.setItem(item);
			orderItem.setOrder(order);
			orderItem.setAmount(orderedItem.getTotalItemPrice());
			orderItem.setNoOfItems(orderedItem.getItemAmount());

			commission += orderItem.getAmount() * COMMISSION_RATE;

			OrderItemKey orderItemKey = new OrderItemKey();
			orderItemKey.setItemId(item.getId());
			orderItemKey.setOrderId(order.getId());

			orderItem.setId(orderItemKey);

			order.getOrderItems().add(orderItem);
			this.orderItemRepository.save(orderItem);
		}

		order.setCommission(commission);
		this.orderRepository.save(order);

		return order;
	}

	public Order confirmOrder(Long orderId) {
		Order existingItem = this.orderRepository.findById(orderId).get();
		existingItem.setOrderStatus(ORDER_CONFIRM_STATUS);

		return this.orderRepository.save(existingItem);
	}

	public Order updateOrder(Order order, Long orderId) {
		Order existingItem = this.orderRepository.findById(orderId).get();
		existingItem.setTransactionId(order.getTransactionId());

		return this.orderRepository.save(existingItem);
	}

	public boolean checkEntityExists(Long orderId) {
		return this.orderRepository.existsById(orderId);
	}
}
