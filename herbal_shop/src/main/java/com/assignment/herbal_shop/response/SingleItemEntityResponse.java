package com.assignment.herbal_shop.response;

import org.springframework.http.HttpStatusCode;

import com.assignment.herbal_shop.entities.Item;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SingleItemEntityResponse {
	private Item item;
	private HttpStatusCode httpStatusCode;	
}
