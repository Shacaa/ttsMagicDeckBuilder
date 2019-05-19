
const gm = require('gm');


exports.buildImgGrid = destPath => buildImgGrid(destPath);



function buildImgGrid(destPath) {
	gm('templates/1.png')
		.montage('templates/[2-4].png')
		.geometry('+511+714+0+0')
		.tile('2x2')
		.write(destPath, err => {
			if(err){console.error(err)}
			console.log('GRID IMG BUILDED');
		});
}