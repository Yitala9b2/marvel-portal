import './appBanner.scss';
import avengers from '../../resources/img/Avengers.png';
import avengersLogo from '../../resources/img/Avengers_logo.png';

const AppBanner = () => (
    <div className="app__banner">
        <img src={avengers} alt="Avengers"/>
        <div className="app__banner-text">
                Новые комиксы каждую неделю<br/>
                Stay tuned!
        </div>
        <img src={avengersLogo} alt="Avengers logo"/>
    </div>
);

export default AppBanner;