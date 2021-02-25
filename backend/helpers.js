const axios = require('axios')
const querystring = require('querystring')


const convertString = (phrase) => {
        var maxLength = 100;

        var returnString = phrase.toLowerCase();
        //Convert Characters
        returnString = returnString.replace(/ö/g, 'o');
        returnString = returnString.replace(/ç/g, 'c');
        returnString = returnString.replace(/ş/g, 's');
        returnString = returnString.replace(/ı/g, 'i');
        returnString = returnString.replace(/ğ/g, 'g');
        returnString = returnString.replace(/ü/g, 'u');  
       
        // convert multiple spaces and hyphens into one space       
        returnString = returnString.replace(/[\s-]+/g, " ");
        // trims current string
        returnString = returnString.replace(/^\s+|\s+$/g,"");
        // cuts string (if too long)
        if(returnString.length > maxLength)
        returnString = returnString.substring(0,maxLength);
        
        console.log(returnString)
        return returnString
}




const getAuthToken = async () => {

    const headers = {
    headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        }
    };
      
    const data = {
        grant_type: "client_credentials",
        client_id: 'fd46fa87be074569ab131fd62e1865e7',
        client_secret: '4341fb0921334e048e3d8ed12e89ddf5',
    };

    try{
        const result = await axios.post('https://accounts.spotify.com/api/token',  querystring.stringify(data), headers)
        return result.data.access_token

    }
    catch(err){
        console.log(err)
    }
    
}

module.exports = {convertString, getAuthToken}