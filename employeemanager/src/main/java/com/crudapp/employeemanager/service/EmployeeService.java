/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.crudapp.employeemanager.service;

import com.crudapp.employeemanager.entity.Employee;
import com.crudapp.employeemanager.exception.UserNotFoundException;
import com.crudapp.employeemanager.repo.EmployeeRepo;
import java.util.List;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author mm887
 */
@Service
public class EmployeeService {
    
    private final EmployeeRepo employeeRepo;

    @Autowired
    public EmployeeService(EmployeeRepo employeeRepo) {
        this.employeeRepo = employeeRepo;
    }
    
    public Employee addEmployee(Employee employee){
        employee.setEmployeeCode(UUID.randomUUID().toString());
        return employeeRepo.save(employee);
    }
    
    public List<Employee> findAllEmployees(){
        return employeeRepo.findAll();
    }
    
    public Employee updateEmployee(Employee employee){
        return employeeRepo.save(employee);
    }
    
    public Employee findEmployeeById(Long id){
        return employeeRepo.findEmployeeById(id)
                .orElseThrow(() -> new UserNotFoundException("User by id " + id + " was not found."));
    }
    
    public void deleteEmployee(Long id){
        // employeeRepo.deleteEmployeeById(id);
        employeeRepo.deleteById(id);
    }
    
}
