export interface User {
    id: number;
    role: string;
    name: string;
    email: string;
    password: string;
    address: string;
    phoneNumber: string | null;
    createdAt: string;
    updatedAt: string;
  }