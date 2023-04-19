import './randomChar.scss';
import { Component } from 'react';
import mjolnir from '../../resources/img/mjolnir.png';
import MarvelService from '../../services/MarvelService';

class RandomChar extends Component {
    constructor(props) {
        super(props);
        this.updateChar();
        this.state = {
            char: {},
        };
    }


    marvelService = new MarvelService();

    // обновляется состояние
    onCharLoaded = (char) => {
        if (char.description === '') { // если описания не существует оно заменяется
            // eslint-disable-next-line no-param-reassign
            char.description = 'Пока нет описания этого героя ';
        }
        this.shortString(char);
        this.setState({ char });
    };

    // если строка больше 230 символов она обрезается
    // eslint-disable-next-line class-methods-use-this
    shortString = (char) => {
        // eslint-disable-next-line no-unused-expressions, no-param-reassign
        char.description.length > 230 ? char.description = `${char.description.substring(0, 230)}...` : char.description;
    };

    updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000); // берем рандомного персонажа
        this.marvelService
            .getCharacter(id)
            .then(this.onCharLoaded);
    };


    render() {
        const { char: { name, description, thumbnail, homepage, wiki } } = this.state;
        return (
            <div className="randomchar">
                <div className="randomchar__block">
                    <img src={thumbnail} alt="Random character" className="randomchar__img"/>
                    <div className="randomchar__info">
                        <p className="randomchar__name">{name}</p>
                        <p className="randomchar__descr">
                            {description}
                        </p>
                        <div className="randomchar__btns">
                            <a href= {homepage} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="randomchar__static">
                    <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                    Or choose another one
                    </p>
                    <button onClick = {this.updateChar} className="button button__main">
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>);
    }
}

export default RandomChar;