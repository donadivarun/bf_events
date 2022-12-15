export class User {
  constructor(
    public dark_mode: boolean,
    public email: string,
    public first_name: string,
    public last_name: string,
    public username: string | undefined

  ) {}
}
