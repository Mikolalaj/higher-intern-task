import './MyImage.css';

type MyImageProps = {
    id: number;
    imageURL: string;
    author: string;
};

function MyImage({ id, imageURL, author }: MyImageProps): JSX.Element {

    function changeURL(imageURL: string): string {
        return imageURL.replace('https://unsplash.com/photos/', 'http://source.unsplash.com/')
    }

    return (
        <div className='image-box'>
            <img className='image' src={changeURL(imageURL)} alt={`By ${author}`} />
            <p className='description'>{author} ({id})</p>
        </div>
    );
}

export default MyImage;
