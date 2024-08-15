// User model
export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
}

// API response model
export interface ApiResponse {
  data: User[];
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
}
