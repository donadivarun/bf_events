export class Event {
  constructor(
    public title: string,
    public id: string,
    public description: string,
    public location: string,
    public image: string,
    public likes: number,
    public date: Date,
    public isLiked: boolean,
    public user_id: string
  ) {}
}
