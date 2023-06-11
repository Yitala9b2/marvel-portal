
import React, { useState, useEffect } from 'react';

import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';



import './comicsList.scss';

const ComicsList = () => {
    const [comics, setComics] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(50);
    const [comicsEnded, setComicsEnded] = useState(false);

    const { loading, error, getAllComics } = useMarvelService();

    useEffect(() => {
        onRequestHandler(offset, true);
    }, []);

    // eslint-disable-next-line no-shadow
    const onRequestHandler = (offset, initial) => {
        initial ? onComicsListLoading(false) : onComicsListLoading(true);
        getAllComics(offset)
            .then(onComicsLoaded);
    };

    const onComicsListLoading = (bool) => {
        setNewItemLoading(bool);
    };

    const onComicsLoaded = (newComics) => {
        let ended = false;
        if (newComics.length < 8) {
            ended = true;
        }
        // eslint-disable-next-line no-shadow
        setComics([...comics, ...newComics]);
        setNewItemLoading(false);
        // eslint-disable-next-line no-shadow
        setOffset(offset + 8);
        setComicsEnded(ended);
    };



    const renderItems = (arr) => {
        const items = arr.map((item, i) => {
            let imgStyle;
            if (item.thumbnail.indexOf('image_not_available') !== -1) {
                imgStyle = { objectFit: 'fill' };
            } else {
                imgStyle = { objectFit: 'cover' };
            }

            return (

                <li className="comics__item"
                    key={i}
                    // eslint-disable-next-line no-return-assign
                >
                    <a href="#">
                        <img src={item.thumbnail} alt={item.title} style={imgStyle} className="comics__item-img" />
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </a>
                </li>
            );
        });
        return (
            <ul className="comics__grid">
                {items}
            </ul>
        );
    };

    const items = renderItems(comics);

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading && !newItemLoading ? <Spinner /> : null;


    return (
        <div className="comics__list">
            {errorMessage}
            {spinner}
            {items}
            <button className="button button__main button__long"
                disabled={newItemLoading}
                style={{ display: comicsEnded ? 'none' : 'block' }}
                onClick={() => onRequestHandler(offset)}
            >
                <div className="inner">Показать еще</div>
            </button>
        </div>
    );
};
export default ComicsList;