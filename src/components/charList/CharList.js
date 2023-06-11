import './charList.scss';
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';

const CharList = (props) => {
    const [chars, setChars] = useState([]);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(false);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [charEnded, setCharEnded] = useState(false);


    const itemRefs = useRef([]);

    // setRef = (ref) => {
    //    this.itemRefs.push(ref);
    // };

    const focusOnItem = (id) => {
        itemRefs.current.forEach((item) => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    };


    // const marvelService = useMarvelService();
    const { loading, error, getAllCharacters } = useMarvelService();


    useEffect(() => {
        onRequestHandler(offset, true);
    }, []);


    // componentDidMount() {
    //    this.onRequestHandler();
    // }

    /* const onCharsLoading = () => {
        setLoading(true);
        // this.setState({ loading: true });
    };


    const onError = () => {
        setError(true);
        setLoading(false);

        // this.setState({
        //    loading: false,
        //    error: true,
        // });
    }; */



    // eslint-disable-next-line no-shadow
    const onRequestHandler = (offset, initial) => {
        initial ? onCharListLoading(false) : onCharListLoading(true);
        getAllCharacters(offset)
            .then(onCharsLoaded);
        // .catch(onError);
    };


    // при клике на показать еще меняется state newItemLoading
    const onCharListLoading = (bool) => {
        setNewItemLoading(bool);
        // this.setState({
        //    newItemLoading: true,
        // });
    };



    const onCharsLoaded = (newChars) => {
        let ended = false;
        if (newChars.length < 9) {
            ended = true;
        }
        // eslint-disable-next-line no-shadow
        setChars((chars) => [...chars, ...newChars]);
        // setLoading(false);
        setNewItemLoading(false);
        // eslint-disable-next-line no-shadow
        setOffset((offset) => offset + 9);
        setCharEnded(ended);

        // this.setState(({ offset, chars }) => ({
        //    chars: [...chars, ...newChars],
        //    loading: false,
        //    newItemLoading: false,
        //    offset: offset + 9,
        //    charEnded: ended,
        // }));
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
                <li className="char__item" key={item.id}
                    // eslint-disable-next-line arrow-parens, no-return-assign
                    ref={el => itemRefs.current[i] = el}
                    onClick={() => {
                        focusOnItem(i);
                        props.onCharSelect(item.id);
                    }}>
                    <img src={item.thumbnail} alt={item.name} style={imgStyle} />
                    <div className="char__name">{item.name}</div>
                </li>
            );
        });
        return (
            <ul className="char__grid">
                {items}
            </ul>
        );
    };




    // const { chars, loading, error, newItemLoading, offset, charEnded } = this.state;
    const items = renderItems(chars);

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading && !newItemLoading ? <Spinner /> : null;
    // const content = !(loading || error) ? items : null;
    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            {items}
            <button className="button button__main button__long"
                disabled={newItemLoading}
                style={{ display: charEnded ? 'none' : 'block' }}
                onClick={() => onRequestHandler(offset)}
            >
                <div className="inner">показать еще</div>
            </button>
        </div>
    );
};


CharList.propTypes = {
    onCharSelect: PropTypes.func,
};

export default CharList;