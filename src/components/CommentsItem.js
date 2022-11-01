import styles from './styles/commentsItem.module.css';

const CommentsItem = (props) => {
    const { text, data } = props;

    return (
        <div className={styles.comment}>
            <p>{text}</p>
            <span>{data}</span>
        </div>
    );
};

export default CommentsItem;
