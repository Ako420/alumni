package com.alumni.alumnisystem.repository;

import com.alumni.alumnisystem.model.JobOpportunity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface JobOpportunityRepository extends JpaRepository<JobOpportunity, Long> {

    @Query("SELECT j FROM JobOpportunity j " +
           "WHERE (:title IS NULL OR LOWER(j.title) LIKE LOWER(CONCAT('%', :title, '%'))) " +
           "AND (:company IS NULL OR LOWER(j.company) LIKE LOWER(CONCAT('%', :company, '%'))) " +
           "AND (:location IS NULL OR LOWER(j.location) LIKE LOWER(CONCAT('%', :location, '%')))")
    List<JobOpportunity> searchJobs(String title, String company, String location);
}
