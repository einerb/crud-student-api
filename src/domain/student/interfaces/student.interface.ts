export interface CreateStudent {
  identification: number;
  name: string;
  lastname: string;
  birthday: Date;
  email: string;
  phone: string;
}

export interface UpdateStudent {
  name: string;
  lastname: string;
  birthday: Date;
  email: string;
  phone: string;
}
