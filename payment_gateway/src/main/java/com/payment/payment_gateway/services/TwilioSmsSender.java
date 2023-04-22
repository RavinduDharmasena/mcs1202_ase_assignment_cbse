package com.payment.payment_gateway.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import com.payment.payment_gateway.configuration.TwilioConfiguration;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.rest.api.v2010.account.MessageCreator;
import com.twilio.type.PhoneNumber;

@Service(value = "twilio")
public class TwilioSmsSender implements SmsSender {

	private final TwilioConfiguration twilioConfiguration;
	private static final Logger LOGGER = LoggerFactory.getLogger(TwilioSmsSender.class);

	public TwilioSmsSender(TwilioConfiguration twilioConfiguration) {
		this.twilioConfiguration = twilioConfiguration;
	}

	public void sendSms(SmsRequest smsRequest) {
		if (isPhoneNumberIsValid(smsRequest.getPhoneNumber())) {
			PhoneNumber to = new PhoneNumber(smsRequest.getPhoneNumber());
			PhoneNumber from = new PhoneNumber(twilioConfiguration.getTrialNumber());
			MessageCreator creator = Message.creator(to, from, smsRequest.getMessage());
			creator.create();
			LOGGER.info("Send SMS {}",smsRequest);
		} else {
			throw new IllegalArgumentException(
					"The phone number [" + smsRequest.getPhoneNumber() + "] is not a valid phone number"
			);
		}
	}

	private boolean isPhoneNumberIsValid(String phoneNumber) {
		// TODO Auto-generated method stub
		return true;
	}
}
