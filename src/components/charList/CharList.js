import './charList.scss';
import { Component } from 'react';

import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';

class CharList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chars: [],
            loading: true,
            error: false,
            newItemLoading: false,
            offset: 0,
        };
    }

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
            error: true });
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



    updateChars = () => {
        this.onCharsLoading();
        this.marvelService
            .getAllCharacters()
            .then(this.onCharsLoaded)
            .catch(this.onError);
    };

    onCharsLoaded = (newChars) => {
        this.setState(({ offset, chars }) => ({
            chars: [...chars, ...newChars],
            loading: false,
            newItemLoading: false,
            offset: offset + 9,
        }));
    };



    // eslint-disable-next-line class-methods-use-this
    renderItems = (arr) => {
        // eslint-disable-next-line arrow-body-style
        const items = arr.map((item) => {
            // eslint-disable-next-line keyword-spacing
            let imgStyle;
            if (item.thumbnail.indexOf('image_not_available') !== -1) {
                imgStyle = { objectFit: 'fill' };
            } else {
                imgStyle = { objectFit: 'cover' };
            }
            return (
                <li className="char__item" key={item.id}
                    onClick = {() => this.props.onCharSelect(item.id)}>
                    <img src={item.thumbnail} alt={item.name} style = {imgStyle}/>
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
        const { chars, loading, error, newItemLoading, offset } = this.state;
        const items = this.renderItems(chars);
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? items : null;
        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button className="button button__main button__long"
                    disabled = { newItemLoading }
                    onClick = { () => this.onRequestHandler(offset) }
                >
                    <div className="inner">показать еще</div>
                </button>
            </div>
        );
    }
}

export default CharList;