package com.alumni.alumnisystem.dto;

import com.alumni.alumnisystem.model.RSVPStatus;
import lombok.Data;

@Data
public class RSVPRequest {
    private RSVPStatus status; // going, maybe, not_going
}
