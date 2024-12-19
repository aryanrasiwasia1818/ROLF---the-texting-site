package com.example.rolf.controller;

import com.example.rolf.model.ChatMessage;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {

    @MessageMapping("/chat.sendMessage")
    @SendToUser("/queue/reply")
    public ChatMessage sendMessage(ChatMessage chatMessage) {
        chatMessage.setTimestamp(new java.util.Date().toString());
        return chatMessage;
    }
}
