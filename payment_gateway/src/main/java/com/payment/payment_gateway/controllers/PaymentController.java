package com.payment.payment_gateway.controllers;

import javax.validation.Valid;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.payment.payment_gateway.service.SmsRequest;
import com.payment.payment_gateway.service.SmsService;

@RestController()
@RequestMapping(path = "/payment")
public class PaymentController {

	private final SmsService smsService;
	
	public PaymentController(SmsService smsService) {
		this.smsService = smsService;
	}

	@PostMapping(path = "/sms")
	public void sendSms(@Valid @RequestBody SmsRequest smsRequest) {
		this.smsService.sendSms(smsRequest);
	}
}
