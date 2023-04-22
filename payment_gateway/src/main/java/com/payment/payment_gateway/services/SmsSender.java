package com.payment.payment_gateway.services;

public interface SmsSender {
	void sendSms(SmsRequest smsRequest);
}
