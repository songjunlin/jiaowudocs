package com.ymall.annotation;

import java.lang.annotation.*;

/**
 *  自动判断登录注解
 */
@Target({ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface AccessRequired {
    boolean validate() default true;
}
