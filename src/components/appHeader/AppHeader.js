import './appHeader.scss';

const AppHeader = () => (
    <header className="app__header">
        <h1 className="app__title">
            <a href="#">
                <span>Марвел</span> информационный портал
            </a>
        </h1>
        <nav className="app__menu">
            <ul>
                <li><a href="#">Люди</a></li>
                    /
                <li><a href="#">Комиксы</a></li>
            </ul>
        </nav>
    </header>
);

export default AppHeader;