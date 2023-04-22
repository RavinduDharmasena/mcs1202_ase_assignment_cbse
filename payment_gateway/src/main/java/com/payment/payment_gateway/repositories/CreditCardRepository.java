package com.payment.payment_gateway.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.payment.payment_gateway.entities.CreditCard;

public interface CreditCardRepository extends JpaRepository<CreditCard, Long>{
	public CreditCard findByCreditCardNumberAndCvcAndExpiryMonthAndExpiryYear(
			String creditCardNumber,
			String Cvc,
			String expiryMonth,
			String expiryYear
	);
}
