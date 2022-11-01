import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './styles/app.module.css';
import SearchForm from './SearchForm';
import YotubePlay from './YotubePlay';
import PreviewList from './PreviewList';
import CommentsList from './CommentsList';
import CommentsAdd from './CommentsAdd';
import moment from 'moment/moment';
import useIsMibile from './hocks/useIsMobile';

const YoutubeApp = () => {
    const [videos, setVideos] = useState(null);
    const [videoIfMobile, setVideoIfMobile] = useState(null);
    const [activeVideoId, setActiveVideoId] = useState(null);
    const [comments, setComments] = useState([]);

    const isMobile = useIsMibile();

    useEffect(() => {
        const videos = JSON.parse(localStorage.getItem('videos'));
        const activeVideoId = JSON.parse(localStorage.getItem('activeVideoId'));
        const videoIfMobile = JSON.parse(localStorage.getItem('videoIfMobile'));
        if (videos) {
            setVideos(videos);
        }
        if (activeVideoId) {
            setActiveVideoId(activeVideoId);
        }

        if (videoIfMobile) {
            setVideoIfMobile(videoIfMobile);
        }
    }, []);

    const searchVideo = (seacrhPhrase) => {
        if (seacrhPhrase) {
            axios
                .get(
                    `https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyCvUSMcl9hcQdurrhvDUPlmjBTeLovOSTY&q=${seacrhPhrase}&type=video`
                )
                .then((response) => {
                    const videos = response.data;
                    const firstVideo = videos.items[0].id.videoId;
                    const videoIfMobile = JSON.parse(JSON.stringify(videos));

                    setVideos(videos);
                    setActiveVideoId(firstVideo);
                    setVideoIfMobile(videoIfMobile.items.splice(3));
                    console.log(videoIfMobile);
                    console.log(videos);
                    localStorage.setItem('videos', JSON.stringify(videos));
                    localStorage.setItem(
                        'activeVideoId',
                        JSON.stringify(firstVideo)
                    );
                    localStorage.setItem(
                        'videoIfMobile',
                        JSON.stringify(videoIfMobile)
                    );
                });
        } else {
            alert('Вы ещё ничего не ввели');
        }
    };

    const selectVideo = (videoId) => {
        setActiveVideoId(videoId);
    };

    const resetLocalStorage = () => {
        localStorage.clear();
    };

    const commentsAdd = (textComment) => {
        const data = moment().format('lll');
        const key = moment().format();
        const comment = { text: textComment, data: data, key: key };
        setComments((comments) => [...comments, comment]);
    };

    return (
        <>
            <SearchForm onSubmit={searchVideo} />
            {videos && (
                <div className={styles.mainBlcok}>
                    <YotubePlay videoId={activeVideoId} />
                    {comments && <CommentsList comments={comments} />}
                    <CommentsAdd onSubmit={commentsAdd} />

                    <PreviewList
                        videos={isMobile ? videoIfMobile : videos}
                        onClick={selectVideo}
                    />
                    <button
                        className={styles.ressetLocal}
                        onClick={resetLocalStorage}
                    >
                        Сброс
                    </button>
                </div>
            )}
        </>
    );
};

export default YoutubeApp;
