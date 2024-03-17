/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.crudapp.employeemanager.repo;

import com.crudapp.employeemanager.entity.Employee;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author mm887
 */
public interface EmployeeRepo extends JpaRepository<Employee, Long> {
    /*
    --> query method
    Spring Data JPA will parse the method name
    Looks for a specific format and pattern
    Creates approperiate query ... behind the scenes
    Spring Data JPA .. Magic!!!
    */
    // void deleteEmployeeById(Long id);
    
    Optional<Employee> findEmployeeById(Long id);
}
