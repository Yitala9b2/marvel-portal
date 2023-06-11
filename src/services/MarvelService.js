/* eslint-disable no-underscore-dangle */
// 1009150
import useHttp from '../hooks/http.hook';

const useMarvelService = () => {
    const { loading, request, error, clearError } = useHttp();
    // разделение API
    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';

    const _apiKey = 'apikey=97f5a52a2a73fdc86ffa7ea3c6417008';

    const _baseOffset = 0;

    // eslint-disable-next-line class-methods-use-this
    // getResource = async (url) => {
    //    const res = await fetch(url);
    //    if (!res.ok) {
    //        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    //    }

    //    return res.json();
    // };

    // берем всех персонажей
    // eslint-disable-next-line no-underscore-dangle
    const getAllCharacters = async (offset = _baseOffset) => {
        // eslint-disable-next-line no-underscore-dangle
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        // eslint-disable-next-line no-underscore-dangle
        return res.data.results.map(_transformCharacter);
    };

    const getAllComics = async (offset = 50) => {
        const res = await request(`${_apiBase}comics?orderBy=issueNumber&limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComics);
    };

    // берем одного персонажа
    const getCharacter = async (id) => {
        // eslint-disable-next-line no-underscore-dangle
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        // eslint-disable-next-line no-underscore-dangle
        return _transformCharacter(res.data.results[0]);
    };

    // eslint-disable-next-line class-methods-use-this
    const _transformCharacter = (char) => ({
        id: char.id,
        name: char.name,
        description: char.description,
        thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
        homepage: char.urls[0].url,
        wiki: char.urls[1].url,
        comics: char.comics.items,
    });
    const _transformComics = (comics) => ({
        id: comics.id,
        title: comics.title,
        description: comics.description || 'There is no description',
        pageCount: comics.pageCount
            ? `${comics.pageCount} p.`
            : 'No information about the number of pages',
        thumbnail: `${comics.thumbnail.path}.${comics.thumbnail.extension}`,
        language: comics.textObjects[0]?.language || 'en-us',
        // optional chaining operator
        price: comics.prices[0].price
            ? `${comics.prices[0].price}$`
            : 'not available',
    });
    return { loading, error, getAllCharacters, getCharacter, clearError, getAllComics };
};

export default useMarvelService;