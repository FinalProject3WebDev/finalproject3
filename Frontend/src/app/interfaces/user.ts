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

  export interface UserCredential {
    accessToken?: string;
    email?:       string;
    role?:        string;
    id?:          number;
}
