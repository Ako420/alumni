package com.alumni.alumnisystem.dto;

import com.alumni.alumnisystem.model.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class RegisterRequest {

    @NotBlank
    private String name;

    @Email
    @NotBlank
    private String email;

    @NotBlank
    private String password;

    @NotNull(message = "Role is required and must be either 'admin' or 'alumni'")
    private Role role;
}
