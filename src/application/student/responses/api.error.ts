export enum ERROR {
  PAGINATION_WAS_NOT_PROVIDED,
  STUDENT_NOT_FOUND,
  STUDENT_EXISTS,
}

export interface Error {
  code: number;
  error: string;
}

export function GET_ERROR(error): Error {
  switch (error) {
    case ERROR.PAGINATION_WAS_NOT_PROVIDED:
      return { code: 1, error: 'Paginación no proporcionada!' };
    case ERROR.STUDENT_NOT_FOUND:
      return { code: 2, error: 'Estudiante no encontrado!' };
    case ERROR.STUDENT_EXISTS:
      return { code: 3, error: 'Estudiante ya se encuentra registrado!' };
  }
}
