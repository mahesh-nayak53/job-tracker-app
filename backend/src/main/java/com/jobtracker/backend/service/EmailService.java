package com.jobtracker.backend.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendStatusEmail(String to, String company, String role, String status) {

        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(to);
        message.setSubject("Job Application Status Update");

        message.setText(
                "Your application status has been updated:\n\n" +
                "Company: " + company + "\n" +
                "Role: " + role + "\n" +
                "Status: " + status + "\n\n" +
                "Keep applying!"
        );

        mailSender.send(message);
    }
}