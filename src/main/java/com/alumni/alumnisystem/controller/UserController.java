package com.alumni.alumnisystem.controller;

import com.alumni.alumnisystem.model.User;
import com.alumni.alumnisystem.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserRepository userRepo;

    public UserController(UserRepository userRepo) {
        this.userRepo = userRepo;
    }

    @PostMapping("/test")
    public User createUser() {
        User user = User.builder()
                .name("Jane Doe")
                .email("jane@example.com")
                .build();
        return userRepo.save(user);
    }
}
