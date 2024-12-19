package com.example.rolf.service;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class KafkaConsumer {

    @KafkaListener(topics = "chat", groupId = "group_id")
    public void consume(Object message) {
        // Process the message
    }
}
