import MyImage from '../MyImage/MyImage'
import fetchAPI from '../../hooks/fetchAPI'
import MyButton from '../common/MyButton/MyButton';
import Loading from '../common/Loading/Loading';
import { useState, useEffect, useMemo } from 'react';
import './ImageListing.css'

type Image = {
    id: number;
    url: string;
    author: string;
}

function ImageListing() {
    const [images, setImages] = useState<Image[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);

    const [state] = fetchAPI('https://picsum.photos/v2/list');

    useEffect(() => {
        if (state.isSuccess) {
            setImages(state.data)
        }
        else if (state.isError) {
            console.log(state.errorMessage)
        }
    }, [state]);

    const imagesCurrentPage = useMemo<Image[]>(() => {
        const pageSize = 3
        const start = (currentPage - 1) * pageSize;
        const end = start + pageSize;
        
        return images.slice(start, end);
    }, [images, currentPage])

    return (
    <div>
        <div className='images-listing'>
            {state.isLoading ? <Loading /> :
            imagesCurrentPage.map((image, index) => (
                <MyImage
                    key={index}
                    id={image.id}
                    imageURL={image.url}
                    author={image.author}
                />
            ))}
        </div>
        <p className='page-count'>Page {currentPage}/{images.length/3}</p>
        <div className='buttons'>
            <MyButton
                text='Previous'
                isDisabled={currentPage === 1}
                handleClick={() => currentPage !== 1 && setCurrentPage(currentPage - 1)}
            />
            <MyButton
                text='Next'
                isDisabled={currentPage === images.length/3}
                handleClick={() => currentPage !== images.length/3 && setCurrentPage(currentPage + 1)}
            />
        </div>
    </div>
    );
}

export default ImageListing;