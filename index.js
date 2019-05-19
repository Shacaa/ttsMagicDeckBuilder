
const scryfall = require('./src/api/scryfallApi');
const gridBuilder = require('./src/templateBuilder/gridBuilder');
const destPath = 'templates/4.png';
const gridDestPath = 'templates/grid.png';

function main(){
	console.log('---- started ----');
	scryfall.getCardImgUri('lightning bolt')
		.then(response => {
			console.log(`imgUrl: ${response}`);
			scryfall.downloadImg(response, destPath)
				.then(response => console.log(response))
				.catch(error => console.error(error));
		})
		.catch(error => {console.error(error)});
}

function buildGrid() {
	console.log('---- started ----');
	gridBuilder.buildImgGrid(gridDestPath);
}


// main();

buildGrid();