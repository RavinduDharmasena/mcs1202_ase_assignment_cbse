package com.assignment.herbal_shop.response;

import org.springframework.http.HttpStatusCode;

import com.assignment.herbal_shop.entities.Order;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SingleOrderItemEntityResponse {
	private Order order;
	private HttpStatusCode httpStatusCode;	
}
