export class Comment {
  constructor(
    public comment_id: string,
    public u_comment: string,
    public event_id: string,
    public username: string,
    public comment_date: Date
  ) {}
}
