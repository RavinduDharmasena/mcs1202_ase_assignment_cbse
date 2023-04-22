package com.payment.payment_gateway.service;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service
public class SmsService {
	private final SmsSender smsSender;

	public SmsService(@Qualifier(value = "twilio") TwilioSmsSender twilioSmsSender) {
		this.smsSender = twilioSmsSender;
	}
	
	public void sendSms(SmsRequest smsRequest) {
		smsSender.sendSms(smsRequest);
	}
}
