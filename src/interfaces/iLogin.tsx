export interface iLogin {
  message: string;
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}
