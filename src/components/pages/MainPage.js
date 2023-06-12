import { useState } from 'react';
import RandomChar from '../randomChar/RandomChar';
import CharList from '../charList/CharList';
import CharInfo from '../charInfo/CharInfo';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import decoration from '../../resources/img/vision.png';



const MainPage = () => {
    const [selectedChar, setChar] = useState(null);


    // подъем состояния id наверх
    const onCharSelectedHandler = (id) => {
        setChar(id);
    };

    return (
        <>
            <ErrorBoundary>
                <RandomChar />
            </ErrorBoundary>
            <div className="char__content">
                {/* забираем id */}
                <ErrorBoundary>
                    <CharList onCharSelect={onCharSelectedHandler} />
                </ErrorBoundary>
                {/* передаем id */}
                <ErrorBoundary>
                    <CharInfo charId={selectedChar} />
                </ErrorBoundary>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision" />
        </>
    );
};

export default MainPage;
