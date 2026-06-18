export interface CommentModel {
    id?: number,
    postId: number,
    username: String | null,
    text: String,
    duration: String
}