import './randomChar.scss';
import { Component } from 'react';
import mjolnir from '../../resources/img/mjolnir.png';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';

class RandomChar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            char: {},
            loading: true,
            error: false,
            imgStyle: { objectFit: 'cover' },
        };
    }


    componentDidMount() {
        this.updateChar();
    }

    marvelService = new MarvelService();

    // обновляется состояние
    onCharLoaded = (char) => {
        if (char.description === '') { // если описания не существует оно заменяется
            // eslint-disable-next-line no-param-reassign
            char.description = 'Пока нет описания этого героя ';
        }
        if (char.thumbnail.indexOf('image_not_available') !== -1) {
            this.setState({ imgStyle: { objectFit: 'fill' } });
        } else { this.setState({ imgStyle: { objectFit: 'cover' } }); }

        this.shortString(char);
        this.setState({ char, loading: false });
    };

    onCharLoading = () => {
        this.setState({ loading: true });
    };


    onError = () => {
        this.setState({
            loading: false,
            error: true });
    };

    // если строка больше 230 символов она обрезается
    // eslint-disable-next-line class-methods-use-this
    shortString = (char) => {
        // eslint-disable-next-line no-unused-expressions, no-param-reassign
        char.description.length > 200 ? char.description = `${char.description.substring(0, 200)}...` : char.description;
    };

    updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000); // берем рандомного персонажа
        this.onCharLoading();
        this.marvelService
            .getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError);
    };




    render() {
        const { char, loading, error, imgStyle } = this.state;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? <View imgStyle = {imgStyle} char = { char }/> : null;
        return (
            <div className="randomchar">
                { errorMessage }
                { spinner }
                { content }
                <div className="randomchar__static">
                    <p className="randomchar__title">
                    Генератор случайного персонажа!<br/>
                    Хотите узнать о нем больше?
                    </p>
                    <p className="randomchar__title">
                    Или выбрать другого
                    </p>
                    <button onClick = {this.updateChar} className="button button__main">
                        <div className="inner">Попробуйте</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        );
    }
}

const View = ({ char, imgStyle }) => {
    const { name, description, thumbnail, homepage, wiki } = char;
    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className="randomchar__img" style= { imgStyle }/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description}
                </p>
                <div className="randomchar__btns">
                    <a href= {homepage} className="button button__main">
                        <div className="inner">Перейти</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Вики</div>
                    </a>
                </div>
            </div>
        </div>
    );
};
export default RandomChar;