import { useState } from 'react';
import styles from './styles/form.module.css';

const SearchForm = (props) => {
    const { onSubmit } = props;
    const [searchFielValue, setSearchFielValue] = useState('');

    const handleChange = (e) => {
        const { value } = e.target;
        setSearchFielValue(value);
    };

    const submitForm = (e) => {
        e.preventDefault();
        onSubmit(searchFielValue.trim()); // отсекает пробелы спереди и сзади trim

        e.target.reset();
    };

    return (
        <form className={styles.findVideo} onSubmit={submitForm}>
            <input
                type="text"
                name="textarea"
                placeholder="Что будем искать"
                className={styles.searchField}
                autoComplete="off" // чтобы не подтягивала старые
                onChange={handleChange}
            />
            <button className={styles.searchBtn}>Поиск</button>
        </form>
    );
};

export default SearchForm;
