package com.project.spring.repository;

import com.project.spring.model.ApplicationUserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ApplicationUserRoleRepository extends JpaRepository<ApplicationUserRole, Long> {
    boolean existsByName(String roleName);
    Optional<ApplicationUserRole> findByName(String roleName);
}
