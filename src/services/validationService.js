import fs from 'fs';
import readline from 'readline';
import { TOTAL_CARDS } from '../utils/constants.js';

const validateDeck = async deckFilePath => {
	let isValid = true;
	let totalCards = 0;
	const fileStream = fs.createReadStream(deckFilePath);
	const rl = readline.createInterface({
		input: fileStream,
		crlfDelay: Infinity
	});
	for await (const line of rl) {
		const cardAmount = parseInt(line.split(' ')[0]);
		if(isNaN(cardAmount)) {
			console.error(`First word must be a number: ${line}`);
			isValid = false;
		}else {
			totalCards += cardAmount;
		}
	}
	if(!TOTAL_CARDS.includes(totalCards)) {
		console.error(`Invalid number of total cards, must be one of: ${TOTAL_CARDS}`);
		isValid = false;
	}
	return isValid ? totalCards : false;
};

export { validateDeck };