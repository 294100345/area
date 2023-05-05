package com.liu.crm.utils;

import org.apache.commons.lang3.StringUtils;

import javax.servlet.http.HttpServletRequest;


public class LoginUserUtil {

    /**
     * 从cookie中获取userId
     * @param request
     * @return
     */
    public static int releaseUserIdFromCookie(HttpServletRequest request) {
        String userIdString = CookieUtil.getCookieValue(request, "userId");
        if (StringUtils.isBlank(userIdString)) {
            return 0;
        }
        Integer userId = Integer.parseInt(userIdString);
        return userId;
    }
}
