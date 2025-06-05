package com.alumni.alumnisystem.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RSVPResponse {
    private String name;
    private String email;
    private String status;
}
