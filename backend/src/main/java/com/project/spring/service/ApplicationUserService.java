package com.project.spring.service;

import com.project.spring.model.dto.ApplicationUserDTO;
import com.project.spring.model.dto.CreateUserRequest;

import java.util.List;

public interface ApplicationUserService {
    ApplicationUserDTO addUser(CreateUserRequest request);
    List<ApplicationUserDTO> listUsers();
}
