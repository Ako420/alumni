package com.alumni.alumnisystem.service;

import com.alumni.alumnisystem.dto.*;
import com.alumni.alumnisystem.model.*;
import com.alumni.alumnisystem.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GroupService {

    private final AlumniGroupRepository groupRepo;
    private final UserRepository userRepo;

    public void createGroup(GroupRequest request, UserDetails userDetails) {
        User creator = userRepo.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (creator.getRole() != Role.alumni && creator.getRole() != Role.admin) {
            throw new RuntimeException("Only alumni or admins can create groups.");
        }

        AlumniGroup group = AlumniGroup.builder()
                .name(request.getName())
                .description(request.getDescription())
                .members(new HashSet<>(List.of(creator))) // auto-join creator
                .build();

        groupRepo.save(group);
    }

    public List<GroupResponse> getAllGroups() {
        return groupRepo.findAll().stream()
                .map(g -> GroupResponse.builder()
                        .id(g.getId())
                        .name(g.getName())
                        .description(g.getDescription())
                        .memberCount(g.getMembers().size())
                        .build())
                .collect(Collectors.toList());
    }

    public void joinGroup(Long groupId, UserDetails userDetails) {
        User user = getUser(userDetails);
        AlumniGroup group = getGroup(groupId);
        group.getMembers().add(user);
        groupRepo.save(group);
    }

    public void leaveGroup(Long groupId, UserDetails userDetails) {
        User user = getUser(userDetails);
        AlumniGroup group = getGroup(groupId);
        group.getMembers().remove(user);
        groupRepo.save(group);
    }

    public List<String> getGroupMembers(Long groupId, UserDetails userDetails) {
        AlumniGroup group = getGroup(groupId);
        User user = getUser(userDetails);

        if (!group.getMembers().contains(user) && user.getRole() != Role.admin) {
            throw new RuntimeException("Access denied: You must be a member or admin to view members.");
        }

        return group.getMembers().stream()
                .map(User::getEmail)
                .collect(Collectors.toList());
    }

    private AlumniGroup getGroup(Long id) {
        return groupRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Group not found"));
    }

    private User getUser(UserDetails userDetails) {
        return userRepo.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
    public void addMemberToGroup(Long groupId, Long userId, UserDetails adminUser) {
    User admin = getUser(adminUser);
    if (admin.getRole() != Role.admin) {
        throw new RuntimeException("Only admins can add members to groups.");
    }

    AlumniGroup group = getGroup(groupId);
    User userToAdd = userRepo.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));

    group.getMembers().add(userToAdd);
    groupRepo.save(group);
}

public void removeMemberFromGroup(Long groupId, Long userId, UserDetails adminUser) {
    User admin = getUser(adminUser);
    if (admin.getRole() != Role.admin) {
        throw new RuntimeException("Only admins can remove members from groups.");
    }

    AlumniGroup group = getGroup(groupId);
    User userToRemove = userRepo.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));

    group.getMembers().remove(userToRemove);
    groupRepo.save(group);
}

}
