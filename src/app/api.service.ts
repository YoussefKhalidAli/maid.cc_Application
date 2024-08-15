import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, User } from './models/models';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly usersApiUrl = 'https://reqres.in/api/users?page=';
  private readonly detailsApiUrl = 'https://reqres.in/api/users/';

  constructor(private http: HttpClient) {}

  // Fetch users for a specific page
  getUsers(page: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.usersApiUrl}${page}`);
  }

  // Fetch user details by ID
  getUserDetails(userId: number): Observable<{ data: User }> {
    return this.http.get<{ data: User }>(`${this.detailsApiUrl}${userId}`);
  }
}
