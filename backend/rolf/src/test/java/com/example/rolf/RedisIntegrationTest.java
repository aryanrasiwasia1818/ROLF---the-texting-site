package com.example.rolf;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.RedisTemplate;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
public class RedisIntegrationTest {

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    @Test
    public void testRedisCaching() {
        redisTemplate.opsForValue().set("testKey", "Hello, Redis!");
        String value = (String) redisTemplate.opsForValue().get("testKey");
        assertEquals("Hello, Redis!", value);
    }
}
