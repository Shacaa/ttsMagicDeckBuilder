/*
* Scryfall API.
*/
import { areCardNamesEqual, isDouble } from '../utils/stringParser.js';
import fs from 'fs';
import encodeurl from 'encodeurl';
import axios from 'axios';

const scryfall = axios.create({
	baseURL: "https://api.scryfall.com",
	timeout: 10000
});


const getCardImgUri = async (name, backSide = false) => {
	let cardName = (name.toLowerCase()).split("'").join("");
	const response = await scryfall.get(`/cards/search?q=${encodeurl(cardName)}`);
	let uri;
	for(let card of response.data.data) {
		if(areCardNamesEqual(cardName, card.name)){
			if(card.image_uris) {
				uri = card.image_uris.png;
			}else {
				uri = card.card_faces ? card.card_faces[(backSide ? 1 : 0)].image_uris.png : card.image_uris.png;
			}
			break;
		}
	}
	if(uri) {
		return uri;
	}
	throw new Error('No card found with given name');
};


const downloadImg = async (url, destPath) => {
	const response = await axios.get(url, {responseType: 'arraybuffer'});
	fs.writeFileSync(destPath, response.data, error => {
		throw new Error(error.message);
	});
	console.log('Image downloaded');
};

export {getCardImgUri, downloadImg};