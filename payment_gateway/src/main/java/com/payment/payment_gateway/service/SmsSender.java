package com.payment.payment_gateway.service;

public interface SmsSender {
	void sendSms(SmsRequest smsRequest);
}
