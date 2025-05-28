package com.alumni.alumnisystem.controller;

import com.alumni.alumnisystem.dto.JobRequest;
import com.alumni.alumnisystem.dto.JobResponse;
import com.alumni.alumnisystem.service.JobService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
@RequiredArgsConstructor
public class JobController {

    private final JobService jobService;

    //  POST /api/jobs - Only alumni or admin
    @PostMapping
    public String postJob(@RequestBody JobRequest request,
                          @AuthenticationPrincipal UserDetails userDetails) {
        jobService.postJob(request, userDetails);
        return "Job posted successfully";
    }

    //  GET /api/jobs/search?title=x&company=y&location=z
    @GetMapping("/search")
    public List<JobResponse> searchJobs(@RequestParam(required = false) String title,
                                        @RequestParam(required = false) String company,
                                        @RequestParam(required = false) String location) {
        return jobService.searchJobs(title, company, location);
    }

    //  GET /api/jobs/{id} - Public: View single job
    @GetMapping("/{id}")
    public JobResponse getJob(@PathVariable Long id) {
        return jobService.getJob(id);
    }

    //  GET /api/jobs - Public: View all jobs
    @GetMapping
    public List<JobResponse> getAllJobs() {
        return jobService.getAllJobs();
    }
}
