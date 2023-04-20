import './charList.scss';
import { Component } from 'react';
import abyss from '../../resources/img/abyss.jpg';
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
        };
    }

    onCharsLoading = () => {
        this.setState({ loading: true });
    };


    onError = () => {
        this.setState({
            loading: false,
            error: true });
    };

    componentDidMount() {
        this.updateChars();
    }

    marvelService = new MarvelService();

    onCharsLoaded = (chars) => {
        this.setState({ chars, loading: false });
    };

    updateChars = () => {
        this.onCharsLoading();
        this.marvelService
            .getAllCharacters()
            .then(this.onCharsLoaded)
            .catch(this.onError);
    };

    // eslint-disable-next-line class-methods-use-this
    renderItems = (arr) => {
        // eslint-disable-next-line arrow-body-style
        const items = arr.map((item) => {
            // eslint-disable-next-line keyword-spacing
            let imgStyle;
            if (item.thumbnail.indexOf('image_not_available') !== -1) {
                imgStyle = { objectFit: 'contain' };
            } else {
                imgStyle = { objectFit: 'cover' };
            }
            return (

                <li className="char__item" key={item.id}>
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
        const { chars, loading, error } = this.state;
        const items = this.renderItems(chars);
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? items : null;
        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        );
    }
}

export default CharList;