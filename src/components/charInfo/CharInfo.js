import { Component } from 'react';
import './charInfo.scss';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/spinner';
import Skeleton from '../skeleton/Skeleton';
import MarvelService from '../../services/MarvelService';

class CharInfo extends Component {
    state = {
        char: null,
        loading: false,
        error: false,
        imgStyle: { objectFit: 'cover' },
    };

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar();
        }
    }

    updateChar = () => {
        const { charId } = this.props;
        if (!charId) {
            return;
        }
        this.onCharLoading();
        this.marvelService.getCharacter(charId)
            .then(this.onCharLoaded)
            .catch(this.onError);
    };

    onCharLoaded = (char) => {
        if (char.thumbnail.indexOf('image_not_available') !== -1) {
            this.setState({ imgStyle: { objectFit: 'fill' } });
        } else { this.setState({ imgStyle: { objectFit: 'cover' } }); }
        this.setState({
            char,
            loading: false,
        });
    };

    onError = () => {
        this.setState({
            loading: false,
            error: true });
    };

    onCharLoading = () => {
        this.setState({ loading: true });
    };

    render() {
        const { char, loading, error, imgStyle } = this.state;

        const skeleton = char || loading || error ? null : <Skeleton/>;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error || !char) ? <View imgStyle = {imgStyle} char = { char }/> : null;

        return (
            <div className="char__info">
                {skeleton}
                {errorMessage}
                {spinner}
                {content}
            </div>
        );
    }
}

// eslint-disable-next-line arrow-body-style
const View = ({ char, imgStyle }) => {
    const { name, description, thumbnail, homepage, wiki, comics } = char;
    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt="abyss" style = {imgStyle}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">Перейти</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Вики</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Комиксы:</div>
            <ul className="char__comics-list">
                {comics.length > 0 ? null : 'Комиксов нет'}
                {
                    // eslint-disable-next-line arrow-body-style
                    comics.map((item, i) => {
                        return (
                            <li key = {i} className="char__comics-item">
                                {item.name}
                            </li>
                        );
                    })
                }
            </ul>
        </>
    );
};
export default CharInfo;