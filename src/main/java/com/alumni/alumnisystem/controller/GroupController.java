package com.alumni.alumnisystem.controller;

import com.alumni.alumnisystem.dto.*;
import com.alumni.alumnisystem.service.GroupService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/groups")
@RequiredArgsConstructor
public class GroupController {

    private final GroupService groupService;

    @PostMapping
    public String createGroup(@RequestBody GroupRequest request,
                              @AuthenticationPrincipal UserDetails userDetails) {
        groupService.createGroup(request, userDetails);
        return "Group created successfully";
    }

    @GetMapping
    public List<GroupResponse> listGroups() {
        return groupService.getAllGroups();
    }

    @PostMapping("/{id}/join")
    public String joinGroup(@PathVariable Long id,
                            @AuthenticationPrincipal UserDetails userDetails) {
        groupService.joinGroup(id, userDetails);
        return "Joined group successfully";
    }

    @PostMapping("/{id}/leave")
    public String leaveGroup(@PathVariable Long id,
                             @AuthenticationPrincipal UserDetails userDetails) {
        groupService.leaveGroup(id, userDetails);
        return "Left group successfully";
    }

    @GetMapping("/{id}/members")
    public List<String> viewMembers(@PathVariable Long id,
                                    @AuthenticationPrincipal UserDetails userDetails) {
        return groupService.getGroupMembers(id, userDetails);
    }
    @PostMapping("/{groupId}/members/{userId}/add")
public String addMember(@PathVariable Long groupId,
                        @PathVariable Long userId,
                        @AuthenticationPrincipal UserDetails userDetails) {
    groupService.addMemberToGroup(groupId, userId, userDetails);
    return "User added to group";
}

@DeleteMapping("/{groupId}/members/{userId}/remove")
public String removeMember(@PathVariable Long groupId,
                           @PathVariable Long userId,
                           @AuthenticationPrincipal UserDetails userDetails) {
    groupService.removeMemberFromGroup(groupId, userId, userDetails);
    return "User removed from group";
}

}
