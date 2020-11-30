import { downloadDeck } from './src/services/imageDownloadService.js';
import { buildImgGrid } from './src/templateBuilder/gridBuilder.js';
import { CARD_IMAGES_PATH, TOTAL_CARDS, LAYOUT_63,  LAYOUT_16 } from './src/utils/constants.js';
import { validateDeck } from './src/services/validationService.js';
import fs from 'fs';
import rimraf from 'rimraf';


if(!fs.existsSync(CARD_IMAGES_PATH)) {
	fs.mkdirSync(CARD_IMAGES_PATH);
}else {
	console.log(`Cleaning ${CARD_IMAGES_PATH} folder...`);
	rimraf.sync(CARD_IMAGES_PATH, () => console.log(`${CARD_IMAGES_PATH} folder cleaned`));
}


const buildDeckGrid = async (deckFilePath, destPath, cardBackPath) => {
	const totalCards = await validateDeck(deckFilePath);
	if(totalCards) {
		const layout = totalCards === 60 ? LAYOUT_63 : LAYOUT_16;
		await downloadDeck(deckFilePath, CARD_IMAGES_PATH, cardBackPath, layout);
		await buildImgGrid(CARD_IMAGES_PATH, destPath, layout);
	}
};

buildDeckGrid('deck.txt', 'deck.png', 'cardBack.png')
	.then(result => console.log(''))
	.catch(error => console.error(error));

