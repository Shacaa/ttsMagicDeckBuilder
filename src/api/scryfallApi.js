/*
* Scryfall API.
*/

const stringParser = require('../utils/stringParser');
const fs = require('fs');
const encodeUrl = require('encodeurl');
const axios = require('axios');
const scryfall = axios.create({
	baseURL: "https://api.scryfall.com",
	timeout: 1000
});


exports.getCardImgUri = name => {
	return new Promise((resolve, reject) => getCardImgUri(name, resolve, reject));
};

exports.downloadImg = (url, destPath) => {
	return new Promise((resolve, reject) => downloadImg(url, destPath, resolve, reject));
};



function getCardImgUri(name, resolve, reject) {
	let cardName = (name.toLowerCase()).split("'").join("");
	scryfall.get(`/cards/search?q=${encodeUrl(cardName)}`)
		.then(response => {
			const card = response.data.data[0];
			if(!stringParser.areCardNamesEqual(cardName, card.name)){
				reject && reject(new Error(`Requested card \"${cardName}\" but got \"${card.name}\"`));
			}else{
				resolve && resolve(card.card_faces ? card.card_faces[0].image_uris.png : card.image_uris.png);
			}
		})
		.catch(error => {
			console.error(error.message);
			reject && reject(error);
		});
}


function downloadImg(url, destPath, resolve, reject) {
	axios.get(url, {responseType: 'arraybuffer'})
		.then(response => {
			fs.writeFileSync(destPath, response.data, error => {
				reject && reject(error);
			});
			resolve && resolve('IMG DOWNLOADED');
		})
		.catch(error => {reject && reject(error)});
}