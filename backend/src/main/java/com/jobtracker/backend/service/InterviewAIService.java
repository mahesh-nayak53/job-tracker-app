package com.jobtracker.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
public class InterviewAIService {

    @Value("${openrouter.api.key}")
    private String apiKey;

    public String generateQuestions(
            String role,
            String skills
    ) {

        try {

            String prompt =
                    "Generate interview questions and answers " +
                    "for role: " + role +
                    " with skills: " + skills;

            String url =
                    "https://openrouter.ai/api/v1/chat/completions";

            RestTemplate restTemplate =
                    new RestTemplate();

            HttpHeaders headers =
                    new HttpHeaders();

            headers.setContentType(MediaType.APPLICATION_JSON);

            headers.setBearerAuth(apiKey);

            Map<String, Object> body =
                    new HashMap<>();

            body.put("model", "openai/gpt-3.5-turbo");

            List<Map<String, String>> messages =
                    new ArrayList<>();

            Map<String, String> msg =
                    new HashMap<>();

            msg.put("role", "user");
            msg.put("content", prompt);

            messages.add(msg);

            body.put("messages", messages);

            HttpEntity<Map<String, Object>> request =
                    new HttpEntity<>(body, headers);

            ResponseEntity<Map> response =
                    restTemplate.exchange(
                            url,
                            HttpMethod.POST,
                            request,
                            Map.class
                    );

            List choices =
                    (List) response.getBody().get("choices");

            Map choice =
                    (Map) choices.get(0);

            Map messageMap =
                    (Map) choice.get("message");

            return messageMap.get("content").toString();

        } catch (Exception e) {

            e.printStackTrace();

            return "Failed";
        }
    }
}