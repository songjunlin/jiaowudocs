package com.ymall.service;

import com.ymall.common.ServerResponse;
import com.ymall.common.exception.BaseException;
import com.ymall.common.exception.IllegalException;
import com.ymall.pojo.Address;

public interface AddressService {
    ServerResponse add(Integer userId, Address address) throws IllegalException;

    ServerResponse delete(Integer userId,Integer addressId) throws BaseException;
}
