package com.jobtracker.backend.controller;

import com.jobtracker.backend.dto.JobApplicationDTO;
import com.jobtracker.backend.dto.JobResponseDTO;
import com.jobtracker.backend.dto.ApiResponse;
import com.jobtracker.backend.service.JobApplicationService;

import org.springframework.data.domain.Page;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/jobs")
@CrossOrigin("*")
public class JobApplicationController {

    private final JobApplicationService service;

    public JobApplicationController(JobApplicationService service) {
        this.service = service;
    }

 
    //  GET JOBS (Pagination + Search)

    @GetMapping
    public ApiResponse<Page<JobResponseDTO>> getAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String status,
            @RequestParam(defaultValue = "appliedDate") String sortBy,
            @RequestParam(defaultValue = "desc") String direction
    ) {

        Page<JobResponseDTO> data =
                service.getAllJobs(page, size, search, status, sortBy, direction);

        return new ApiResponse<>(
                "SUCCESS",
                data,
                "Jobs fetched successfully"
        );
    }


    //  CREATE JOB
   
    @PostMapping
    public ApiResponse<JobResponseDTO> add(@Valid @RequestBody JobApplicationDTO dto) {

        JobResponseDTO job = service.addJob(dto);

        return new ApiResponse<>(
                "SUCCESS",
                job,
                "Job created successfully"
        );
    }


    // UPDATE JOB
   
    @PutMapping("/{id}")
    public ApiResponse<JobResponseDTO> update(@PathVariable Long id,
                                             @RequestBody JobApplicationDTO dto) {

        JobResponseDTO job = service.updateJob(id, dto);

        return new ApiResponse<>(
                "SUCCESS",
                job,
                "Job updated successfully"
        );
    }

  
    // DELETE JOB
  
    @DeleteMapping("/{id}")
    public ApiResponse<String> delete(@PathVariable Long id) {

        service.deleteJob(id);

        return new ApiResponse<>(
                "SUCCESS",
                null,
                "Job deleted successfully"
        );
    }
    

}