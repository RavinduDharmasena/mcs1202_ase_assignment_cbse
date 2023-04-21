package com.assignment.herbal_shop.response;

import java.util.ArrayList;

import org.springframework.http.HttpStatusCode;

import com.assignment.herbal_shop.entities.Order;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderEntityCollectionResponse {
	private ArrayList<Order> orders;
	private HttpStatusCode httpStatusCode;	
}
