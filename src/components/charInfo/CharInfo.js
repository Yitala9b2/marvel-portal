import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './charInfo.scss';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/spinner';
import Skeleton from '../skeleton/Skeleton';
import useMarvelService from '../../services/MarvelService';


const CharInfo = (props) => {
    const [char, setChar] = useState(null);
    // const [loading, setLoading] = useState(false);
    // const [error, setError] = useState(false);
    const [imgStyle, setImgStyle] = useState({ objectFit: 'cover' });

    // state = {
    //     char: null,
    //     loading: false,
    //     error: false,
    //     imgStyle: { objectFit: 'cover' },
    // };

    // const marvelService = new MarvelService();
    const { loading, error, getCharacter, clearError } = useMarvelService();

    useEffect(() => {
        updateChar();
    }, [props.charId]);

    // componentDidMount() {
    //    this.updateChar();
    // }

    // componentDidUpdate(prevProps, prevState) {
    //    if (this.props.charId !== prevProps.charId) {
    //        this.updateChar();
    //    }
    // }


    const updateChar = () => {
        clearError();
        const { charId } = props;
        if (!charId) {
            return;
        }
        // onCharLoading();
        getCharacter(charId)
            .then(onCharLoaded);
        // .catch(onError);
    };

    // eslint-disable-next-line no-shadow
    const onCharLoaded = (char) => {
        if (char.thumbnail.indexOf('image_not_available') !== -1) {
            setImgStyle({ objectFit: 'fill' });
        } else {
            setImgStyle({ objectFit: 'cover' });
        }
        setChar(char);
        // setLoading(false);
        // this.setState({
        //    char,
        //    loading: false,
        // });
    };

    /* const onError = () => {
        setLoading(false);
        setError(true);

        //  this.setState({
        //        loading: false,
        //        error: true });
    };

    const onCharLoading = () => {
        setLoading(true);
        // this.setState({ loading: true });
    }; */

    const skeleton = char || loading || error ? null : <Skeleton />;
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !char) ? <View imgStyle={imgStyle} char={char} /> : null;

    return (
    // const { char, loading, error, imgStyle } = this.state;
    // const skeleton = char || loading || error ? null : <Skeleton/>;
    // const errorMessage = error ? <ErrorMessage/> : null;
    // const spinner = loading ? <Spinner/> : null;
    // const content = !(loading || error || !char) ? <View imgStyle = {imgStyle} char = { char }/> : null;

        <div className="char__info">
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </div>
    );
};

// eslint-disable-next-line arrow-body-style
const View = ({ char, imgStyle }) => {
    const { name, description, thumbnail, homepage, wiki, comics } = char;
    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt="abyss" style={imgStyle} />
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
                            <li key={i} className="char__comics-item">
                                {item.name}
                            </li>
                        );
                    })
                }
            </ul>
        </>
    );
};

CharInfo.propTypes = {
    charId: PropTypes.number,
};

export default CharInfo;