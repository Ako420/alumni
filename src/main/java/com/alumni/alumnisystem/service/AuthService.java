package com.alumni.alumnisystem.service;

import com.alumni.alumnisystem.dto.*;
import com.alumni.alumnisystem.model.*;
import com.alumni.alumnisystem.repository.AlumniProfileRepository;
import com.alumni.alumnisystem.repository.UserRepository;
import com.alumni.alumnisystem.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final AlumniProfileRepository alumniProfileRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email already exists");
        }

        // Create user account
        User user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.alumni) // default role
                .build();
        userRepository.save(user);

        // Create basic alumni profile
        AlumniProfile profile = AlumniProfile.builder()
                .user(user)
                .fullName(request.getName())
                .graduationYear(0) // can be updated later
                .course("Not set") // placeholder
                .build();
        alumniProfileRepository.save(profile);

        // Generate JWT token
        return new AuthResponse(jwtUtil.generateToken(user.getEmail()));
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Invalid credentials"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Invalid credentials");
        }

        return new AuthResponse(jwtUtil.generateToken(user.getEmail()));
    }
}
