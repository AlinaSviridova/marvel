class MarvelService {
    __apiBase = 'https://gateway.marvel.com:443/v1/public/';
    __apiKey = 'apikey=7e218a62ee6da0dcd851c113e2e277eb'

    getResource = async (url) => { 
        let res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Couldn't fetch ${url}, status: ${res.status}`)
        }
        return await res.json()
    }

    getAllCharacters = async () => {
        const res = await this.getResource(`${this.__apiBase}characters?limit=9&offset=210&${this.__apiKey}`)
        return res.data.results.map(this._transformCharacter)
    }
    getCharacter = async (id) => {  
        const res = await this.getResource(`${this.__apiBase}characters/${id}?${this.__apiKey}`)
        return this._transformCharacter( res.data.results[0]);
    }

    _transformCharacter = (char) => {
        return{
            name: char.name,
            description: char.description,
            thumbnailPath: char.thumbnail.path,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url 
        }
    }
}


export default MarvelService;