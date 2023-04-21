package com.assignment.herbal_shop.entities;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
public class OrderItemKey implements Serializable{

	private static final long serialVersionUID = 1L;

	@Column(name = "order_id")
	private Long orderId;
	
	@Column(name = "item_id")
	public Long itemId;
}
