
import ReactDOM from 'react-dom/client';
import App from './components/app/App';
import MarvelService from './services/MarvelService';
import './style/style.scss';


const marvelService = new MarvelService();


marvelService.getCharacter(1010338).then((res) => console.log(res.data.results[0].name));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App/>,
);

