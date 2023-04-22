package com.assignment.herbal_shop.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.assignment.herbal_shop.dto.OrderGetDto;
import com.assignment.herbal_shop.dto.OrderPostDTO;
import com.assignment.herbal_shop.dto.OrderedItemsGetDto;
import com.assignment.herbal_shop.dto.OrderedItemsPostDTO;
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

	private OrderGetDto prepareOrderDto(Order order) {
		OrderGetDto orderGetDTO = new OrderGetDto();
		orderGetDTO.setOrder(order);
		ArrayList<OrderedItemsGetDto> orderedItems = new ArrayList<>();
		for (OrderItem orderItem : order.getOrderItems()) {
			OrderedItemsGetDto orderedItemsGetDto = new OrderedItemsGetDto();
			orderedItemsGetDto.setItem(orderItem.getItem());
			orderedItemsGetDto.setItemAmount(orderItem.getNoOfItems());
			orderedItemsGetDto.setTotalItemPrice(orderItem.getAmount());
			orderedItems.add(orderedItemsGetDto);
		}

		orderGetDTO.setOrderedItems(orderedItems);
		return orderGetDTO;
	}
	
	public ArrayList<Order> getOrders() {
		return new ArrayList<>(this.orderRepository.findAll());
	}
	
	public OrderGetDto getOrderById(Long orderId) {
		Order order = this.orderRepository.findById(orderId).get();
		return this.prepareOrderDto(order);
	}

	public Order insertOrder(OrderPostDTO orderPostDto) {
		orderPostDto.getOrder().setOrderStatus(ORDER_PENDING_STATUS);
		float commission = 0;
		Order order = this.orderRepository.save(orderPostDto.getOrder());

		for (OrderedItemsPostDTO orderedItem : orderPostDto.getItems()) {
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
