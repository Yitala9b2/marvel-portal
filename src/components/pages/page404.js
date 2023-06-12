import { Link } from 'react-router-dom';
import ErrorMessage from '../errorMessage/ErrorMessage';



const Page404 = () => (
    <div>
        <ErrorMessage />
        <p style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '24px' }}>Такой страницы не существует</p>
        <Link style={{ display: 'block', textAlign: 'center', fontWeight: 'bold', fontSize: '24px', marginTop: '30px' }}
            to="/marvel-portal">Вернуться на главную страницу</Link>
    </div>

);

export default Page404;
