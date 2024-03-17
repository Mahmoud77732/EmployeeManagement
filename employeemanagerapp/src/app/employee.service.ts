import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from './employee';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiServerUrl : string = environment.apiBaseUrl;

  constructor(private httpClient : HttpClient) { }

  public getEmployee() : Observable<Employee[]>{
    return this.httpClient.get<Employee[]>(`${this.apiServerUrl}/employee/all`);
  }

  public addEmployee(employee : Employee) : Observable<Employee>{
    return this.httpClient.post<Employee>(`${this.apiServerUrl}/employee/add`, employee);
  }

  public updateEmployee(employee : Employee) : Observable<Employee>{
    return this.httpClient.put<Employee>(`${this.apiServerUrl}/employee/update`, employee);
  }

  public deleteEmployee(employeeId : number) : Observable<void>{
    return this.httpClient.delete<void>(`${this.apiServerUrl}/employee/delete/${employeeId}`);
  }

}
