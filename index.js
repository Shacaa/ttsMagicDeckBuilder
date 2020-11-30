import { downloadDeck } from './src/services/imageDownloadService.js';
import { buildImgGrid } from './src/templateBuilder/gridBuilder.js';
import { CARD_IMAGES_PATH } from './src/utils/constants.js';
import fs from 'fs';

if(!fs.existsSync(CARD_IMAGES_PATH)) {
	fs.mkdirSync(CARD_IMAGES_PATH);
}


const buildDeckGrid = async (deckFilePath, destPath, cardBackPath) => {
	await downloadDeck(deckFilePath, CARD_IMAGES_PATH, cardBackPath);
	await buildImgGrid(CARD_IMAGES_PATH, destPath);
};

buildDeckGrid('deck.txt', 'deck.png', 'cardBack.png')
	.then(result => console.log(''))
	.catch(error => console.error(error));
