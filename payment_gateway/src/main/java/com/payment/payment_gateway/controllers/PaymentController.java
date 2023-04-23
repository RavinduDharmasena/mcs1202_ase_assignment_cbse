package com.payment.payment_gateway.controllers;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.payment.payment_gateway.entities.CreditCard;
import com.payment.payment_gateway.services.SmsRequest;
import com.payment.payment_gateway.services.PaymentService;

@RestController()
@RequestMapping(path = "/payment")
public class PaymentController {

	private final PaymentService paymentService;
	
	public PaymentController(PaymentService paymentService) {
		this.paymentService = paymentService;
	}

	@PostMapping(path = "/validate")
	@CrossOrigin
	public ResponseEntity<?> validateCreditCardData(@Valid @RequestBody CreditCard creditCard) {
		CreditCard existingCreditCard = this.paymentService.getCreditCardData(creditCard);
		if(existingCreditCard != null) {
			return new ResponseEntity<>(existingCreditCard,HttpStatus.OK);
		}
		else {
			return new ResponseEntity<>("UNAUTHORISED",HttpStatus.UNAUTHORIZED);
		}
	}

	@PostMapping(path = "/sms")
	@CrossOrigin
	public void sendSms(@Valid @RequestBody SmsRequest smsRequest) {
		this.paymentService.sendSms(smsRequest);
	}
}
