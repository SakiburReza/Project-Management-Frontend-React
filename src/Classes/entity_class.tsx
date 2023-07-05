export class User{
    id?: number;
    username?: string;
    email?: string;
    password?:string;
}

export class Project{
    id?: number;
    name?: string;
    intro?: string;
    status?: number;
    owner?: User;
    startDateTime?: Date;
    endDateTime?: Date;
}

export class User_Project{
    id?: number;
    project?: Project;
    user?: User;
}

export function showSnackbar(enqueueSnackbar, data, onSuccess = () => {}) {
    data.message &&
      enqueueSnackbar(data.message, {
        variant: data.success ? "success" : "error",
      });
    data.success && onSuccess();
  }