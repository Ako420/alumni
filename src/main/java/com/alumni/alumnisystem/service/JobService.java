package com.alumni.alumnisystem.service;

import com.alumni.alumnisystem.dto.*;
import com.alumni.alumnisystem.model.*;
import com.alumni.alumnisystem.repository.JobOpportunityRepository;
import com.alumni.alumnisystem.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class JobService {

    private final JobOpportunityRepository jobRepo;
    private final UserRepository userRepo;

    //  Allow alumni and admin to post jobs
    public void postJob(JobRequest request, UserDetails userDetails) {
        User user = userRepo.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (user.getRole() != Role.alumni && user.getRole() != Role.admin) {
            throw new RuntimeException("Only alumni or admin can post jobs.");
        }

        JobOpportunity job = JobOpportunity.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .company(request.getCompany())
                .location(request.getLocation())
                .applicationDeadline(request.getApplicationDeadline())
                .postedBy(user)
                .build();

        jobRepo.save(job);
    }

    //  Get all jobs
    public List<JobResponse> getAllJobs() {
        return jobRepo.findAll().stream()
                .map(this::toJobResponse)
                .collect(Collectors.toList());
    }

    //  Get a single job by ID
    public JobResponse getJob(Long id) {
        JobOpportunity job = jobRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        return toJobResponse(job);
    }

    //  Search/filter jobs by title, company, location
    public List<JobResponse> searchJobs(String title, String company, String location) {
        return jobRepo.searchJobs(title, company, location).stream()
                .map(this::toJobResponse)
                .collect(Collectors.toList());
    }

    //  Helper method
    private JobResponse toJobResponse(JobOpportunity job) {
        return JobResponse.builder()
                .id(job.getId())
                .title(job.getTitle())
                .description(job.getDescription())
                .company(job.getCompany())
                .location(job.getLocation())
                .applicationDeadline(job.getApplicationDeadline())
                .build();
    }
}
