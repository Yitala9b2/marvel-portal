import './randomChar.scss';
import { useState, useEffect } from 'react';
import mjolnir from '../../resources/img/mjolnir.png';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';

const RandomChar = () => {
    const [char, setChar] = useState({});

    // комментируем так как это есть в кастомном хуке http.hook.js
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(false);
    const { loading, error, getCharacter, clearError } = useMarvelService();

    const [imgStyle, setimgStyle] = useState({ objectFit: 'cover' });
    // constructor(props) {
    //    super(props);
    //    this.state = {
    //        char: {},
    //        loading: true,
    //        error: false,
    //        imgStyle: { objectFit: 'cover' },
    //    };
    // }
    useEffect(() => {
        updateChar();
    }, []);

    // componentDidMount () {
    //    this.updateChar();
    // }


    // заменили на : const [imgStyle, setimgStyle] = useState({ objectFit: 'cover' });
    // const marvelService = useMarvelService();

    // обновляется состояние
    // eslint-disable-next-line no-shadow
    const onCharLoaded = (char) => {
        if (char.description === '') { // если описания не существует оно заменяется
            // eslint-disable-next-line no-param-reassign
            char.description = 'Пока нет описания этого героя ';
        }
        if (char.thumbnail.indexOf('image_not_available') !== -1) {
            setimgStyle({ objectFit: 'fill' });
            // this.setState({ imgStyle: { objectFit: 'fill' } });
        } else {
            setimgStyle({ objectFit: 'cover' });
            // this.setState({ imgStyle: { objectFit: 'cover' } });
        }

        shortString(char);
        setChar(char);
        // setLoading(false);
        // this.setState({ char, loading: false });
    };

    // убрали потому что есть http.hook
    /* const onCharLoading = () => {
        setLoading(true);
        // this.setState({ loading: true });
    };


    const onError = () => {
        setLoading(false);
        setError(true);
        // this.setState({
        //    loading: false,
        //    error: true });
    }; */

    // если строка больше 230 символов она обрезается
    // eslint-disable-next-line class-methods-use-this , no-shadow
    const shortString = (char) => {
        // eslint-disable-next-line no-unused-expressions, no-param-reassign
        char.description.length > 200 ? char.description = `${char.description.substring(0, 200)}...` : char.description;
    };

    const updateChar = () => {
        clearError();
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000); // берем рандомного персонажа
        // onCharLoading();
        getCharacter(id)
            .then(onCharLoaded);
        // .catch(onError);
    };



    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? <View imgStyle={imgStyle} char={char} /> : null;
    return (
    // const { char, loading, error, imgStyle } = this.state;
    // const errorMessage = error ? <ErrorMessage/> : null;
    // const spinner = loading ? <Spinner/> : null;
    // const content = !(loading || error) ? <View imgStyle = {imgStyle} char = { char }/> : null;

        <div className="randomchar">
            {errorMessage}
            {spinner}
            {content}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Генератор случайного персонажа!<br />
                    Хотите узнать о нем больше?
                </p>
                <p className="randomchar__title">
                    Или выбрать другого
                </p>
                <button onClick={updateChar} className="button button__main">
                    <div className="inner">Попробуйте</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
            </div>
        </div>

    );
};

const View = ({ char, imgStyle }) => {
    const { name, description, thumbnail, homepage, wiki } = char;
    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className="randomchar__img" style={imgStyle} />
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
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