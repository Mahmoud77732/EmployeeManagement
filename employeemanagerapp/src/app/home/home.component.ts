import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  public employees : Employee[] = [];
  public updatedEmployee? : Employee;
  public deletedEmployee? : Employee;

  addForm : FormGroup = new FormGroup({
    "name" : new FormControl(null, [Validators.required]),
    "email" : new FormControl(null, [Validators.required]),
    "jobTitle" : new FormControl(null, [Validators.required]),
    "phone" : new FormControl(null, [Validators.required]),
    "imageUrl" : new FormControl(null, [Validators.required])
  });

  editForm : FormGroup = new FormGroup({
    "id" : new FormControl(null, [Validators.required]),
    "employeeCode" : new FormControl(null, [Validators.required]),
    "name" : new FormControl(null, [Validators.required]),
    "email" : new FormControl(null, [Validators.required]),
    "jobTitle" : new FormControl(null, [Validators.required]),
    "phone" : new FormControl(null, [Validators.required]),
    "imageUrl" : new FormControl(null, [Validators.required])
  });

  constructor(private employeeService : EmployeeService){

  }

  ngOnInit(): void {
    this.getEmployees();
  }

  public getEmployees() : void{
    this.employeeService.getEmployee().subscribe({
      next : (res : Employee[]) => {
        this.employees = res;
      },
      error : (err : HttpErrorResponse) => {
        alert(err.message);
      },
      complete : () => {}
    });
  }

  public addEmployee() : void{
    if(this.addForm.invalid){
      return;
    }
    document.getElementById("add-employee-form")?.click();
    this.employeeService.addEmployee(this.addForm.value).subscribe(
      {
        next: (response : Employee) => {
          this.getEmployees();
          this.addForm.reset();
        },
        error: (error : HttpErrorResponse) => {
          alert(error.message);
          this.addForm.reset();
        }
      }
      );
    }

    public updateEmployee(employee : Employee) : void{
    if(this.editForm.invalid){
      return;
    }
    this.employeeService.updateEmployee(employee).subscribe(
      {
        next: (response : Employee) => {
          this.getEmployees();
        },
        error: (error : HttpErrorResponse) => {
          alert(error.message);
        },
        complete: () => {
          document.getElementById("update-employee-form")?.click();
        }
      }
    );
  }

  public deleteEmployee(employeeId : number) : void{
    if(this.editForm.invalid){
      return;
    }
    this.employeeService.deleteEmployee(employeeId).subscribe(
      {
        next: (response : void) => {
          this.getEmployees();
        },
        error: (error : HttpErrorResponse) => {
          alert(error.message);
        },
        complete: () => {
          document.getElementById("delete-employee-form")?.click();
        }
      }
    );
  }

  public searchEmployee(key : string) : void{
    const results : Employee[] = [];
    for(const employee of this.employees){
      if(employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1){
        results.push(employee);
      }
    }
    this.employees = results;
    if(results.length === 0 || !key){
      this.getEmployees();
    }
  }


  /*
  <!-- Button trigger modal -->
  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addingModal">
    Add Employee
  </button>
  */
  public onOpenModal(employee? : Employee, mode? : string) : void{
    const container = document.getElementById("main-container");
    const button = document.createElement("button");
    button.type = "button";
    button.style.display = "none";
    button.setAttribute("data-bs-toggle", "modal");
    if(mode === 'add'){
      button.setAttribute("data-bs-target", "#addEmployeeModal");
    }
    else if(mode === 'edit'){
      this.updatedEmployee = employee;
      this.editForm = new FormGroup({
        "id" : new FormControl(employee?.id, [Validators.required]),
        "employeeCode" : new FormControl(employee?.employeeCode, [Validators.required]),
        "name" : new FormControl(employee?.name, [Validators.required]),
        "email" : new FormControl(employee?.email, [Validators.required]),
        "jobTitle" : new FormControl(employee?.jobTitle, [Validators.required]),
        "phone" : new FormControl(employee?.phone, [Validators.required]),
        "imageUrl" : new FormControl(employee?.imageUrl, [Validators.required])
      });
      button.setAttribute("data-bs-target", "#updateEmployeeModal");
    }
    else if(mode === 'delete'){
      this.deletedEmployee = employee;
      this.editForm = new FormGroup({
        "id" : new FormControl(employee?.id, [Validators.required]),
        "employeeCode" : new FormControl(employee?.employeeCode, [Validators.required]),
        "name" : new FormControl(employee?.name, [Validators.required]),
        "email" : new FormControl(employee?.email, [Validators.required]),
        "jobTitle" : new FormControl(employee?.jobTitle, [Validators.required]),
        "phone" : new FormControl(employee?.phone, [Validators.required]),
        "imageUrl" : new FormControl(employee?.imageUrl, [Validators.required])
      });
      button.setAttribute("data-bs-target", "#deleteEmployeeModal");
    }
    container?.appendChild(button);
    button.click();
  }

}
