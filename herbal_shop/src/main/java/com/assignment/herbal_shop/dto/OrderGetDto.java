package com.assignment.herbal_shop.dto;

import java.util.ArrayList;

import com.assignment.herbal_shop.entities.Order;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderGetDto {

	private Order order;
	private ArrayList<OrderedItemsGetDto> orderedItems;
}
