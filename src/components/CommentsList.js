import styles from './styles/commentsList.module.css';

import CommentsItem from "./CommentsItem";

const CommentsList = (props) => {
    const {comments} = props;

    const items = comments.map(comment => (<CommentsItem  key = {comment.key} {...comment}/>))
    return (
        <div className={styles.container}> {items}</div>
    )

}

export default CommentsList;