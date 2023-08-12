export enum SUCCESS {
  STUDENT_CREATED,
  STUDENT_FOUND,
  STUDENTS,
  STUDENT_DELETED,
  STUDENT_UPDATED,
}

export interface Success {
  code: number;
  message: string;
}

export function GET_SUCCESS(success): Success {
  switch (success) {
    case SUCCESS.STUDENT_CREATED:
      return {
        code: 1,
        message: 'Estudiante creado exitosamente!',
      };
    case SUCCESS.STUDENT_FOUND:
      return {
        code: 2,
        message: 'Estudiante encontrado!',
      };
    case SUCCESS.STUDENTS:
      return {
        code: 3,
        message: 'Estudiantes encontrados!',
      };
    case SUCCESS.STUDENT_DELETED:
      return { code: 4, message: 'Estudiante eliminado exitosamente!' };
    case SUCCESS.STUDENT_UPDATED:
      return { code: 5, message: 'Estudiante actualizado exitosamente!' };
  }
}
