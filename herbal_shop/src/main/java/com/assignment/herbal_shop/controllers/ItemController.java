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

import com.assignment.herbal_shop.entities.Item;
import com.assignment.herbal_shop.response.ItemEntityCollectionResponse;
import com.assignment.herbal_shop.response.ErrorResponse;
import com.assignment.herbal_shop.response.SingleItemEntityResponse;
import com.assignment.herbal_shop.service.ItemService;

@RestController
public class ItemController {
	
	@Autowired
	ItemService itemService;

	@GetMapping(path = "/items")
	@CrossOrigin
    public ResponseEntity<ItemEntityCollectionResponse> getItems() {
		ItemEntityCollectionResponse successDataResponse = new ItemEntityCollectionResponse();
		successDataResponse.setItems(this.itemService.getItems());
		successDataResponse.setHttpStatusCode(HttpStatus.OK);
		ResponseEntity<ItemEntityCollectionResponse> response = new ResponseEntity<ItemEntityCollectionResponse>(successDataResponse,successDataResponse.getHttpStatusCode());
		return response;
    }
	
	@PostMapping(path = "/items")
	@CrossOrigin
	public ResponseEntity<?> insertItem(@RequestBody Item item){
		Item savedItem = this.itemService.insertItem(item);
		
		if(this.itemService.checkEntityExists(savedItem.getId())) {
			SingleItemEntityResponse successDataResponse = new SingleItemEntityResponse();
			successDataResponse.setItem(savedItem);
			successDataResponse.setHttpStatusCode(HttpStatus.OK);
			ResponseEntity<SingleItemEntityResponse> response = new ResponseEntity<SingleItemEntityResponse>(successDataResponse,successDataResponse.getHttpStatusCode());
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
	
	@PutMapping(path = "/items/{itemId}")
	@CrossOrigin
	public ResponseEntity<?> updateItem(@RequestBody Item item, @PathVariable Long itemId){
		if(this.itemService.checkEntityExists(itemId)) {
			Item savedItem = this.itemService.updateItem(item,itemId);
			SingleItemEntityResponse successDataResponse = new SingleItemEntityResponse();
			successDataResponse.setItem(savedItem);
			successDataResponse.setHttpStatusCode(HttpStatus.OK);
			ResponseEntity<SingleItemEntityResponse> response = new ResponseEntity<SingleItemEntityResponse>(successDataResponse,successDataResponse.getHttpStatusCode());
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
