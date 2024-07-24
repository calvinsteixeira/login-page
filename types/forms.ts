interface ILoginForm {
  email: string;
  password: string;
}

interface IRegisterForm {
  email: string;
  name: string;
  username: string;
  password: string;

}

export type { ILoginForm, IRegisterForm }