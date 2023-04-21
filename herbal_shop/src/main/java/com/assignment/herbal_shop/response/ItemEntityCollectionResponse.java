package com.assignment.herbal_shop.response;

import java.util.ArrayList;

import org.springframework.http.HttpStatusCode;

import com.assignment.herbal_shop.entities.Item;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ItemEntityCollectionResponse {
	private ArrayList<Item> items;
	private HttpStatusCode httpStatusCode;	
}
