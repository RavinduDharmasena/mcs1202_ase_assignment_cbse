package com.payment.payment_gateway.configuration;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Configuration;

import com.twilio.Twilio;

@Configuration
public class TwilioInitializer {

	private final TwilioConfiguration twilioConfiguration;
	private final static Logger LOGGER = LoggerFactory.getLogger(TwilioInitializer.class);

	public TwilioInitializer(TwilioConfiguration twilioConfiguration) {
		this.twilioConfiguration = twilioConfiguration;
		Twilio.init(
			this.twilioConfiguration.getAccountSid(),
			this.twilioConfiguration.getAuthToken()
		);
		LOGGER.info("Twilio has been started with account {}",twilioConfiguration.getAccountSid());
	}
}
