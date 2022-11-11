export class User {
  constructor(
    public user_id: string,
    public user_email: string,
    public password: string,
    public first_name: string,
    public last_name: string
  ) {}
}
