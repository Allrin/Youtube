import styles from './styles/commentsAdd.module.css';
import { useState } from 'react';

const CommentsAdd = (props) => {
    const { onSubmit } = props;
    const [commentValue, setCommentValue] = useState('');

    const handleChange = (e) => {
        const { value } = e.target;
        setCommentValue(value);
    };

    const submitComment = (e) => {
        e.preventDefault();
        onSubmit(commentValue.trim());
        e.target.reset();
    };

    return (
        <form className={styles.form} onSubmit={submitComment}>
            <input
                className={styles.commentsAdd}
                type="text"
                placeholder="Ваш комментарий"
                name="comment"
                autoComplete="off"
                onChange={handleChange}
            />
            <button className={styles.addBtn}>Отправить</button>
        </form>
    );
};

export default CommentsAdd;
