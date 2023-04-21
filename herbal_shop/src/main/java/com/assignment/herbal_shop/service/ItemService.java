package com.assignment.herbal_shop.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.assignment.herbal_shop.entities.Item;
import com.assignment.herbal_shop.respository.ItemRepository;

@Service
public class ItemService {

	@Autowired
	private ItemRepository itemRepository;

	public ArrayList<Item> getItems() {
		return new ArrayList<>(this.itemRepository.findAll());
	}
	
	public Item insertItem(Item item) {
		return this.itemRepository.save(item);
	}
	
	public Item updateItem(Item item,Long itemId) {
		Item existingItem = this.itemRepository.findById(itemId).get();
		existingItem.setName(item.getName());
		existingItem.setCode(item.getCode());
		existingItem.setDescription(item.getDescription());
		existingItem.setUnitPrice(item.getUnitPrice());
		
		return this.itemRepository.save(existingItem);
	}

	public boolean checkEntityExists(Long itemId) {
		return this.itemRepository.existsById(itemId);
	}
}
