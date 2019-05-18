
const scryfall = require('./src/api/scryfallApi.js');
const destPath = 'templates/downloaded.png';

function main(){
	console.log('---- started ----');
	scryfall.getCardImgUri('thing in the ice')
		.then(response => {
			console.log(`imgUrl: ${response}`);
			scryfall.downloadImg(response, destPath)
				.then(response => console.log(response))
				.catch(error => console.error(error));
		})
		.catch(error => {console.error(error)});
}


main();