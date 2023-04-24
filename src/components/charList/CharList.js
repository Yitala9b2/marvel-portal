import './charList.scss';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';

class CharList extends Component {
    state = {
        chars: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 0,
        charEnded: false,
    };

    itemRefs = [];

    setRef = (ref) => {
        this.itemRefs.push(ref);
    };

    focusOnItem = (id) => {
        this.itemRefs.forEach((item) => item.classList.remove('char__item_selected'));
        this.itemRefs[id].classList.add('char__item_selected');
        this.itemRefs[id].focus();
    };


    marvelService = new MarvelService();

    componentDidMount() {
        this.onRequestHandler();
    }

    onCharsLoading = () => {
        this.setState({ loading: true });
    };


    onError = () => {
        this.setState({
            loading: false,
            error: true,
        });
    };



    onRequestHandler = (offset) => {
        this.onCharListLoading();
        this.marvelService
            .getAllCharacters(offset)
            .then(this.onCharsLoaded)
            .catch(this.onError);
    };


    // при клике на показать еще меняется state newItemLoading
    onCharListLoading = () => {
        this.setState({
            newItemLoading: true,
        });
    };



    onCharsLoaded = (newChars) => {
        let ended = false;
        if (newChars.length < 9) {
            ended = true;
        }
        this.setState(({ offset, chars }) => ({
            chars: [...chars, ...newChars],
            loading: false,
            newItemLoading: false,
            offset: offset + 9,
            charEnded: ended,
        }));
    };



    renderItems = (arr) => {
        const items = arr.map((item, i) => {
            let imgStyle;
            if (item.thumbnail.indexOf('image_not_available') !== -1) {
                imgStyle = { objectFit: 'fill' };
            } else {
                imgStyle = { objectFit: 'cover' };
            }
            return (
                <li className="char__item" key={item.id}
                    // eslint-disable-next-line no-return-assign
                    ref={this.setRef}
                    onClick={() => {
                        this.focusOnItem(i);
                        this.props.onCharSelect(item.id);
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



    render() {
        const { chars, loading, error, newItemLoading, offset, charEnded } = this.state;
        const items = this.renderItems(chars);
        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || error) ? items : null;
        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button className="button button__main button__long"
                    disabled={newItemLoading}
                    style={{ display: charEnded ? 'none' : 'block' }}
                    onClick={() => this.onRequestHandler(offset)}
                >
                    <div className="inner">показать еще</div>
                </button>
            </div>
        );
    }
}


CharList.propTypes = {
    onCharSelect: PropTypes.func,
};

export default CharList;