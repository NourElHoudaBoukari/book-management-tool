export class Book {
    public created_at: Date;
constructor(
    public userId : string,
    public title : string,
    public author : string,
    public publicDate : Date,
    public genres : string[]
){}

}
