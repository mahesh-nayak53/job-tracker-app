package com.jobtracker.backend.service;

import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

@Service
public class ResumeAnalyzerService {

    @Value("${openrouter.api.key}")
    private String apiKey;

    public String analyzeResume(MultipartFile file) {

        try {

            // READ PDF
            PDDocument document =
                    Loader.loadPDF(file.getBytes());

            PDFTextStripper stripper =
                    new PDFTextStripper();

            String resumeText =
                    stripper.getText(document);

            document.close();

            // AI PROMPT
//            String prompt =
//                    "Analyze this resume. " +
//                    "Give strengths, missing skills, " +
//                    "career suggestions and improvement tips:\n\n"
//                    + resumeText;
            
            String prompt =
                    "Analyze this resume and give:\n" +
                    "1. Resume Score out of 100\n" +
                    "2. Strengths\n" +
                    "3. Missing Skills\n" +
                    "4. Career Suggestions\n" +
                    "5. Improvement Tips\n\n"
                    + resumeText;

            // OPENROUTER API
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

            return "Resume analysis failed.";
        }
    }
}