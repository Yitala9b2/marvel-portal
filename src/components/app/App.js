
// eslint-disable-next-line import/no-extraneous-dependencies
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MainPage, ComicsPage, Page404 } from '../pages';
// eslint-disable-next-line import/extensions
import AppHeader from '../appHeader/AppHeader';

const App = () => (
    <Router>
        <div className="app">
            <AppHeader />
            <main>
                <Routes>
                    <Route path="/marvel-portal" element={<MainPage/>}/>
                    <Route path="/marvel-portal/comics" element={<ComicsPage/>}/>
                    <Route path="*" element={<Page404 />} />
                </Routes>
            </main >
        </div >
    </Router>
);

export default App;