package com.ymall.common.exception;

import com.ymall.common.ServerResponse;
import org.springframework.http.HttpStatus;

public class IllegalException extends BaseException {
    public IllegalException(String message) {
        super(message);
    }

    @Override
    public Object getErrorObject() {
        return ServerResponse.createByErrorCodeMessage(HttpStatus.BAD_REQUEST.value(),this.getMessage());
    }
}
