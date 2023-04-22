package com.assignment.herbal_shop.dto;

import com.assignment.herbal_shop.entities.Item;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderedItemsGetDto{
	private Item item;
    private int itemAmount;
    private float totalItemPrice;
}
