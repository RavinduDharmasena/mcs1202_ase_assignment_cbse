package com.payment.payment_gateway.services;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.payment.payment_gateway.entities.CreditCard;
import com.payment.payment_gateway.repositories.CreditCardRepository;

@Service
public class PaymentService {
	private final SmsSender smsSender;
	private final CreditCardRepository creditCardRepository;
	
	public PaymentService(
			@Qualifier(value = "twilio") TwilioSmsSender twilioSmsSender,
			CreditCardRepository creditCardRepository) {
		this.smsSender = twilioSmsSender;
		this.creditCardRepository = creditCardRepository;
	}
	
	public void sendSms(SmsRequest smsRequest) {
		smsSender.sendSms(smsRequest);
	}

	public CreditCard getCreditCardData(CreditCard creditCard) {
		return this.creditCardRepository.findByCreditCardNumberAndCvcAndExpiryMonthAndExpiryYear(
				creditCard.getCreditCardNumber(), 
				creditCard.getCvc(),
				creditCard.getExpiryMonth(), 
				creditCard.getExpiryYear());
		
	}
}
