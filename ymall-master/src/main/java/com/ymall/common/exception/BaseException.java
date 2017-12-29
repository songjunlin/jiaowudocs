package com.ymall.common.exception;

import com.ymall.common.ServerResponse;
import org.springframework.http.HttpStatus;

import java.util.LinkedHashMap;
import java.util.Map;

public abstract class BaseException extends Exception {

    public BaseException(String message) {
        super(message);
    }

    public abstract Object getErrorObject();

}
