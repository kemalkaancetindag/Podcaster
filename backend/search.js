const axios = require('axios')
const {convertString, getAuthToken} = require('./helpers')



const ITUNES_BASE = 'https://itunes.apple.com/search?'
const SPOTIFY_BASE = 'https://api.spotify.com/v1/search?type=episode'


const makeRequest = async (url, headers, params) => {
    console.log(params)
    console.log(headers)

    try{
        if (!headers) {
            const searchResult = await axios.get(url, { params: params })
            return searchResult
        }
    
        const searchResult = await axios.get(url, { headers: headers, params: params })
        return searchResult
    }
    catch(err){
        console.log(err)
    }
    

}


const searchItunes = async (term, lang, limit) => {
    try {
        if (!term) {
            console.log('bad call no term')
            return
        }
        

        params = {
            term: (term ? convertString(term.split(' ').join('+')) : ''),
            lang: (lang ? lang : 'tr_tr'),
            limit: (limit ? limit : '20'),
            entity: 'podcast'
        }

        searchData = await makeRequest(ITUNES_BASE, null, params)
        console.log(searchData)
        console.log(convertString(term.split(' ').join('+')))
       

    } catch (err) {
        return err
    }

}

const searchSpotify = async (query, limit, market) => {
    try {
        const authToken = await getAuthToken()
        if(!authToken){
            console.log('no token provided')
            return
        }

        if (!query) {
            console.log('bad call no query')
            return
        }

        

        headers = {
            Authorization: 'Bearer ' + authToken
        }
        params = {
            q: query,
            limit: limit ? limit : '20',
            market: market ? market : 'TR'
        }
        const result = await makeRequest(SPOTIFY_BASE, headers, params)
        console.log(result.data.episodes.items)
        

    }
    catch (err) {
        console.log(err)
    }
}







//searchItunes('world war')
searchSpotify('makine')
