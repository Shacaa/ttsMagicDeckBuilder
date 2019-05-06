
const encodeUrl = require('encodeurl');
const axios = require('axios');
const scryfall = axios.create({
	baseURL: "https://api.scryfall.com",
	timeout: 1000
});


exports.getCardImgUri = name => {
	return new Promise((resolve, reject) => getCardImgUri(name, resolve, reject));
};


function getCardImgUri(name, resolve, reject){
	let cardName = (name.toLowerCase()).split("'").join("");
	scryfall.get(`/cards/search?exact=${encodeUrl(cardName)}`)
		.then(response => {
			let cardResponse = (response.data.name.toLowerCase()).split("'").join("");
			if(cardResponse !== cardName){
				reject && reject(new Error(`Requested card \"${cardName}\" but got \"${cardResponse}\"`));
			}else{
				resolve && resolve(response.data.image_uris.png);
			}
		})
		.catch(error => {
			console.error(error.message);
			reject && reject(error);
		});
}