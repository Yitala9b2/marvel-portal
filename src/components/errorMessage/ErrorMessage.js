import img from './error.gif';

const ErrorMessage = () => (
    // чтобы взять из папки public:  <img src={`${process.env.PUBLIC_URL}/error.gif`} />
    <img style = {{ display: 'block', width: '250px', height: '250px', objectFit: 'contain', margin: '0 auto' }} src={img} alt = 'Ошибка'/>
);

export default ErrorMessage;
