export interface Review{
    _id?:string,
    articleId?:string;
    reviewId?:string;
    rating?:number;
    comment?:string;
    createdAt?:Date
}