package com.alumni.alumnisystem.service;

import com.alumni.alumnisystem.dto.*;
import com.alumni.alumnisystem.model.*;
import com.alumni.alumnisystem.repository.*;
import com.alumni.alumnisystem.security.JwtUtil;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final AlumniProfileRepository alumniProfileRepository;
    private final AdminProfileRepository adminProfileRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;

    //  REGISTER
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email already exists");
        }

        Role selectedRole = request.getRole() != null ? request.getRole() : Role.alumni;

        // Create user (enabled immediately)
        User user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(selectedRole)
                .enabled(true) //  No email verification
                .build();
        userRepository.save(user);

        // Create profile based on role
        if (selectedRole == Role.alumni) {
            AlumniProfile profile = AlumniProfile.builder()
                    .user(user)
                    .fullName(request.getName())
                    .course("Not set")
                    .graduationYear(0)
                    .build();
            alumniProfileRepository.save(profile);
        } else if (selectedRole == Role.admin) {
            AdminProfile profile = AdminProfile.builder()
                    .user(user)
                    .fullName(request.getName())
                    .build();
            adminProfileRepository.save(profile);
        }

        // Generate token
        String token = jwtUtil.generateToken(user.getEmail());
        return new AuthResponse(token);
    }

    //  LOGIN
    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        String token = jwtUtil.generateToken(user.getEmail());
        return new AuthResponse(token);
    }
}
