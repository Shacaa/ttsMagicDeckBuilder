import { LAYOUT_63 } from '../utils/constants.js';
import gm from 'gm';


const buildImgGrid = (cardImagesPath, destPath, layout = LAYOUT_63) => {
	console.log('Building grid...');
	gm()
		.montage(`${cardImagesPath}/*.png`)
		.montage('cardBack.png')
		.geometry('+511+714+0+0')
		.tile(layout)
		.write(destPath, err => {
			if(err){console.error(err)}
			console.log('Grid builded');
		});
};

export { buildImgGrid };