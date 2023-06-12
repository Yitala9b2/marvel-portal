import './appHeader.scss';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Link, NavLink } from 'react-router-dom';

const AppHeader = () => (
    <header className="app__header">
        <h1 className="app__title">
            <Link to="/marvel-portal">
                <span>Марвел</span> информационный портал
            </Link>
        </h1>
        <nav className="app__menu">
            <ul>
                <li><NavLink
                    end
                    // style={({ isActive }) => ({ color: isActive ? '#9f0013' : 'inherit' })}
                    to="/marvel-portal">Персонажи</NavLink></li>
                /
                <li><NavLink
                    end
                    // style={({ isActive }) => ({ color: isActive ? '#9f0013' : 'inherit' })}
                    to="/marvel-portal/comics">Комиксы</NavLink></li>
            </ul>
        </nav>
    </header>
);

export default AppHeader;