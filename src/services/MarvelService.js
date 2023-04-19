

class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';

    _apiKey = 'apikey=97f5a52a2a73fdc86ffa7ea3c6417008';

    // eslint-disable-next-line class-methods-use-this
    getResource = async (url) => {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return res.json();
    };

    // eslint-disable-next-line no-underscore-dangle
    getAllCharacters = () => this.getResource(`${this._apiBase}characters?${this._apiKey}`);

    // eslint-disable-next-line no-underscore-dangle
    getCharacter = (id) => this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
}

export default MarvelService;