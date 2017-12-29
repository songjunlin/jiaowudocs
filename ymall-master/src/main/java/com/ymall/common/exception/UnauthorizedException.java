package com.ymall.common.exception;

import com.ymall.common.ServerResponse;
import org.springframework.http.HttpStatus;

public class UnauthorizedException extends BaseException {
    public UnauthorizedException(String message) {
        super(message);
    }

    @Override
    public Object getErrorObject() {
        return ServerResponse.createByErrorCodeMessage(HttpStatus.UNAUTHORIZED.value(),this.getMessage());
    }
}
