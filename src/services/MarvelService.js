// 1009150

class MarvelService {
    // разделение API
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

    // берем всех персонажей
    getAllCharacters = async () => {
        // eslint-disable-next-line no-underscore-dangle
        const res = await this.getResource(`${this._apiBase}characters?limit=9&${this._apiKey}`);
        // eslint-disable-next-line no-underscore-dangle
        return res.data.results.map(this._transformCharacter);
    };

    // берем одного персонажа
    getCharacter = async (id) => {
        // eslint-disable-next-line no-underscore-dangle
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
        // eslint-disable-next-line no-underscore-dangle
        return this._transformCharacter(res.data.results[0]);
    };

    // eslint-disable-next-line class-methods-use-this
    _transformCharacter = (char) => ({
        name: char.name,
        description: char.description,
        thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
        homepage: char.urls[0].url,
        wiki: char.urls[1].url,
    });
}

export default MarvelService;