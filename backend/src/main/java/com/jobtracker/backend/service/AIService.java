package com.jobtracker.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
public class AIService {

    @Value("${openrouter.api.key}")
    private String apiKey;

    public String chat(String message) {

        String url = "https://openrouter.ai/api/v1/chat/completions";

        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();

        headers.setContentType(MediaType.APPLICATION_JSON);

        headers.setBearerAuth(apiKey);

        Map<String, Object> body = new HashMap<>();

        body.put("model", "openai/gpt-3.5-turbo");

        List<Map<String, String>> messages = new ArrayList<>();

        Map<String, String> userMessage = new HashMap<>();

        userMessage.put("role", "user");
        userMessage.put("content", message);

        messages.add(userMessage);

        body.put("messages", messages);

        HttpEntity<Map<String, Object>> request =
                new HttpEntity<>(body, headers);

        ResponseEntity<Map> response = restTemplate.exchange(
                url,
                HttpMethod.POST,
                request,
                Map.class
        );

        List choices = (List) response.getBody().get("choices");

        Map choice = (Map) choices.get(0);

        Map messageMap = (Map) choice.get("message");

        return messageMap.get("content").toString();
    }
}