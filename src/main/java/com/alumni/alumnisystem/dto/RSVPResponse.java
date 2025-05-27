package com.alumni.alumnisystem.dto;

import com.alumni.alumnisystem.model.RSVPStatus;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RSVPResponse {
    private String alumniName;
    private String email;
    private RSVPStatus status;
}
