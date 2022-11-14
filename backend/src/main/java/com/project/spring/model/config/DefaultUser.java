package com.project.spring.model.config;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DefaultUser {
    private String username;
    private String password;
    private List<String> roles;
}
