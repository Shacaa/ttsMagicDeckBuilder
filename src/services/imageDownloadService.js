import { LAYOUT_63, LAYOUT_16, LAYOUT_6, DOWNLOAD_COOLDOWN,DOWNLOADS_BEFORE_COOLDOWN } from '../utils/constants.js';
import { downloadImg, getCardImgUri } from '../api/scryfallApi.js';
import sleep from '../utils/sleep.js';
import fs from 'fs';
import readline from 'readline';


const  downloadDeck = async (deckFilePath, destPath, cardBackPath, layout = LAYOUT_63) => {
	let downloaded = 0;
	let actualsDownloads = 0;
	const fileStream = fs.createReadStream(deckFilePath);
	const rl = readline.createInterface({
		input: fileStream,
		crlfDelay: Infinity
	});
	for await (const line of rl) {
		console.log(line);
		let lineParts = line.split(' ');
		const amount = parseInt(lineParts.shift());
		const previousCard = downloaded;
		let imageUrl = null;
		while(imageUrl === null) {
			try {
				imageUrl = await getCardImgUri(lineParts.join(' '), layout === LAYOUT_6);
			}catch(error) {
				console.error('Error getting image uri');
				console.error(error.message);
				console.log('Download cooldown to not hit scryfall download limit...');
				await sleep(DOWNLOAD_COOLDOWN);
			}
		}
		for(let i = 0; i < amount; i++) {
			console.log(`${previousCard === downloaded ? 'Downloading' : 'Copying'} image ${downloaded}...`);
			let success = false;
			while(!success) {
				try {
					if(previousCard === downloaded) {
						await downloadImg(imageUrl, `${destPath}/${downloaded}.png`);
						actualsDownloads++;
					}else {
						fs.copyFileSync(`${destPath}/${downloaded - 1}.png`, `${destPath}/${downloaded}.png`);
					}
					downloaded++;
					success = true;
				}catch(error) {
					console.error(`Error ${previousCard === downloaded ? 'downloading' : 'copying'} image`);
					console.error(error.message);
					if(previousCard === downloaded) {
						console.log('Download cooldown to not hit scryfall download limit...');
						await sleep(DOWNLOAD_COOLDOWN);
					}
				}
			}
			if(actualsDownloads % DOWNLOADS_BEFORE_COOLDOWN === 0) {
				console.log('Download cooldown to not hit scryfall download limit...');
				actualsDownloads++;
				await sleep(DOWNLOAD_COOLDOWN);
			}
		}
	}
	console.log('Adding back card images to grid...');
	let limit = 5;
	if(layout === LAYOUT_63) limit = 62;
	if(layout === LAYOUT_16) limit = 15;
	while(downloaded < limit) {
		fs.copyFileSync(cardBackPath, `${destPath}/${downloaded}.png`);
		downloaded++;
	}
};

export { downloadDeck };