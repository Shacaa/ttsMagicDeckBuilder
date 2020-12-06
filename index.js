import { downloadDeck } from './src/services/imageDownloadService.js';
import { buildImgGrid } from './src/templateBuilder/gridBuilder.js';
import { CARD_IMAGES_PATH, TOTAL_CARDS, LAYOUT_63,  LAYOUT_16, LAYOUT_6 } from './src/utils/constants.js';
import { validateDeck } from './src/services/validationService.js';
import fs from 'fs';
import rimraf from 'rimraf';

if(!fs.existsSync(CARD_IMAGES_PATH)) {
	fs.mkdirSync(CARD_IMAGES_PATH);
}else {
	console.log(`Cleaning ${CARD_IMAGES_PATH} folder...`);
	rimraf.sync(CARD_IMAGES_PATH);
	console.log(`${CARD_IMAGES_PATH} folder cleaned`);
	fs.mkdirSync(CARD_IMAGES_PATH);
}

const buildDeckGrid = async (deckFilePath, destPath, cardBackPath) => {
	const totalCards = await validateDeck(deckFilePath);
	if(totalCards) {
		let layout = LAYOUT_6;
		if(totalCards === 60) layout = LAYOUT_63;
		if(totalCards === 15) layout = LAYOUT_16;
		await downloadDeck(deckFilePath, CARD_IMAGES_PATH, cardBackPath, layout);
		await buildImgGrid(CARD_IMAGES_PATH, destPath, layout);
	}
};

buildDeckGrid('deck.txt', 'deck.png', 'cardBack.png')
	.then(result => console.log(''))
	.catch(error => console.error(error));

