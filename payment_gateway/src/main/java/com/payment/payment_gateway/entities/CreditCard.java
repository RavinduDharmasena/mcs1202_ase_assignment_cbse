package com.payment.payment_gateway.entities;

import javax.validation.constraints.NotBlank;

import io.micrometer.common.lang.NonNull;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "credit_card")
@Getter
@Setter
public class CreditCard {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@NotBlank
	@NonNull
	@Column(name = "credit_card_number")
	private String creditCardNumber;
	
	@NotBlank
	@NonNull
	@Column(name = "cvc")
	private String cvc;
	
	@NotBlank
	@NonNull
	@Column(name = "expiry_month")
	private String expiryMonth;
	
	@NotBlank
	@NonNull
	@Column(name = "expiry_year")
	private String expiryYear;
	
	@NotBlank
	@NonNull
	@Column(name = "mobile_number")
	private String mobileNumber;
}
