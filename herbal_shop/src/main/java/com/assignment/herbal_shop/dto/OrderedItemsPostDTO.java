package com.assignment.herbal_shop.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderedItemsPostDTO{
	private Long itemId;
    private int itemAmount;
    private float totalItemPrice;
}
