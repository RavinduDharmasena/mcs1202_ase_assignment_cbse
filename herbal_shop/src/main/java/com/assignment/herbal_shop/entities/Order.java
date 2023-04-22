package com.assignment.herbal_shop.entities;

import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "orders")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Order {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long Id;

	@Column(name = "name")
    private String name;
    
    @Column(name = "deliveryAddress")
    private String deliveryAddress;
    
    @Column(name = "deliveryOption")
    private String deliveryOption;
    
    @Column(name = "zipCode")
    private String zipCode;
    
    @Column(name = "phoneNumber")
    private String phoneNumber;
    
    @Column(name = "email")
    private String email;
    
    @Column(name = "status")
    private String orderStatus;
    
    @Column(name = "transaction_id",nullable = true)
    private String transactionId;
    
    @Column(name = "delivery_charge",nullable = true)
    private float deliveryCharge;
    
    @Column(name = "commission")
    private float commission;
    
    @JsonIgnore
    @OneToMany(mappedBy = "order")
	private Set<OrderItem> orderItems = new HashSet<>();
}
