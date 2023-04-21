package com.assignment.herbal_shop.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.assignment.herbal_shop.dto.OrderPostDTO;
import com.assignment.herbal_shop.entities.Order;
import com.assignment.herbal_shop.response.OrderEntityCollectionResponse;
import com.assignment.herbal_shop.response.ErrorResponse;
import com.assignment.herbal_shop.response.SingleOrderItemEntityResponse;
import com.assignment.herbal_shop.service.OrderService;

@RestController
public class OrderController {
	
	@Autowired
	OrderService orderService;

	@GetMapping(path = "/orders")
	@CrossOrigin
    public ResponseEntity<OrderEntityCollectionResponse> getOrders() {
		OrderEntityCollectionResponse successDataResponse = new OrderEntityCollectionResponse();
		successDataResponse.setOrders(this.orderService.getOrders());
		successDataResponse.setHttpStatusCode(HttpStatus.OK);
		ResponseEntity<OrderEntityCollectionResponse> response = new ResponseEntity<OrderEntityCollectionResponse>(successDataResponse,successDataResponse.getHttpStatusCode());
		return response;
    }
	
	@PostMapping(path = "/orders")
	@CrossOrigin
	public ResponseEntity<?> insertItem(@RequestBody OrderPostDTO order){
		Order savedItem = this.orderService.insertOrder(order);
		
		if(this.orderService.checkEntityExists(savedItem.getId())) {
			SingleOrderItemEntityResponse successDataResponse = new SingleOrderItemEntityResponse();
			successDataResponse.setOrder(order.getOrder());
			successDataResponse.setHttpStatusCode(HttpStatus.OK);
			ResponseEntity<SingleOrderItemEntityResponse> response = new ResponseEntity<SingleOrderItemEntityResponse>(successDataResponse,successDataResponse.getHttpStatusCode());
			return response;
		}
		else {
			ErrorResponse errorResponse = new ErrorResponse();
			errorResponse.setErrorTitle("Error Occured");
			errorResponse.setErrorDescription("An error occured while inserting the data");
			errorResponse.setHttpStatusCode(HttpStatus.INTERNAL_SERVER_ERROR);
			ResponseEntity<ErrorResponse> response = new ResponseEntity<ErrorResponse>(errorResponse,errorResponse.getHttpStatusCode());
			return response;
		}
	}
	
	@PutMapping(path = "/confirm-order/{orderId}")
	@CrossOrigin
	public ResponseEntity<?> confirmOrder(@RequestBody Order order, @PathVariable Long orderId){
		if(this.orderService.checkEntityExists(orderId)) {
			Order savedItem = this.orderService.confirmOrder(orderId);
			SingleOrderItemEntityResponse successDataResponse = new SingleOrderItemEntityResponse();
			successDataResponse.setOrder(savedItem);
			successDataResponse.setHttpStatusCode(HttpStatus.OK);
			ResponseEntity<SingleOrderItemEntityResponse> response = new ResponseEntity<SingleOrderItemEntityResponse>(successDataResponse,successDataResponse.getHttpStatusCode());
			return response;
		}
		else {
			ErrorResponse errorResponse = new ErrorResponse();
			errorResponse.setErrorTitle("Error Occured");
			errorResponse.setErrorDescription("Entity does not exists");
			errorResponse.setHttpStatusCode(HttpStatus.NOT_FOUND);
			ResponseEntity<ErrorResponse> response = new ResponseEntity<ErrorResponse>(errorResponse,errorResponse.getHttpStatusCode());
			return response;
		}
	}
	
	@PutMapping(path = "/orders/{orderId}")
	@CrossOrigin
	public ResponseEntity<?> updateItem(@RequestBody Order order, @PathVariable Long orderId){
		if(this.orderService.checkEntityExists(orderId)) {
			Order savedItem = this.orderService.updateOrder(order,orderId);
			SingleOrderItemEntityResponse successDataResponse = new SingleOrderItemEntityResponse();
			successDataResponse.setOrder(savedItem);
			successDataResponse.setHttpStatusCode(HttpStatus.OK);
			ResponseEntity<SingleOrderItemEntityResponse> response = new ResponseEntity<SingleOrderItemEntityResponse>(successDataResponse,successDataResponse.getHttpStatusCode());
			return response;
		}
		else {
			ErrorResponse errorResponse = new ErrorResponse();
			errorResponse.setErrorTitle("Error Occured");
			errorResponse.setErrorDescription("Entity does not exists");
			errorResponse.setHttpStatusCode(HttpStatus.NOT_FOUND);
			ResponseEntity<ErrorResponse> response = new ResponseEntity<ErrorResponse>(errorResponse,errorResponse.getHttpStatusCode());
			return response;
		}
	}
}
