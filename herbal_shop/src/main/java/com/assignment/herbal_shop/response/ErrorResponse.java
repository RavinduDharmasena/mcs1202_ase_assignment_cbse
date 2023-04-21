package com.assignment.herbal_shop.response;

import org.springframework.http.HttpStatusCode;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ErrorResponse {
	private String errorTitle;
	private String errorDescription;
	private HttpStatusCode httpStatusCode;	
}
