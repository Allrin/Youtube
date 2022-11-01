import PreviewItem from './PreviewItem';

const PreviewList = (props) => {
    const { videos, onClick } = props;

    const items = videos.items.map((video) => (
        <PreviewItem key={video.id.videoId} {...video} onClick={onClick} />
    ));

    return <ul>{items}</ul>;
};

export default PreviewList;
