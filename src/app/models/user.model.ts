export class User {
  constructor(
    public username: string | undefined,
    public email: string,
    public first_name: string,
    public last_name: string,
    public uid: string | undefined
  ) {}
}
