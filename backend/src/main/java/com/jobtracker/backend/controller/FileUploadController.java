package com.jobtracker.backend.controller;

import java.io.File;
import java.io.IOException;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/files")
@CrossOrigin("*")
public class FileUploadController {

    private static final String UPLOAD_DIR =
            System.getProperty("user.dir") + "/uploads/";

    @PostMapping("/upload")
    public String uploadFile(@RequestParam("file") MultipartFile file)
            throws IOException {

        try {

            // CHECK EMPTY FILE
            if (file.isEmpty()) {
                throw new RuntimeException("File is empty");
            }

            // CREATE UNIQUE FILE NAME
            String fileName =
                    System.currentTimeMillis() + "_"
                            + file.getOriginalFilename();

            // CREATE UPLOAD DIRECTORY
            File dir = new File(UPLOAD_DIR);

            if (!dir.exists()) {
                dir.mkdirs();
            }

            // SAVE FILE
            File serverFile = new File(UPLOAD_DIR + fileName);

            file.transferTo(serverFile);

            // RETURN FILE URL
            return "http://localhost:8081/uploads/" + fileName;

        } catch (Exception e) {

            e.printStackTrace();

            throw new RuntimeException("File upload failed: "
                    + e.getMessage());
        }
    }
}