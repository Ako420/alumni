package com.alumni.alumnisystem.dto;

import com.alumni.alumnisystem.model.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponse {
    private  User user;
    private String token;
}
