/*
* For parsing, manipulating, comparing, and validating strings.
*/


const areCardNamesEqual = (nameOne, nameTwo) => {
	if(isDouble(nameOne)){
		const faces = nameOne.split(" // ");
		return (areCardNamesEqual(faces[0], nameTwo) || areCardNamesEqual(faces[1], nameTwo));
	}else if(isDouble(nameTwo)){
		const faces = nameTwo.split(" // ");
		return (areCardNamesEqual(nameOne, faces[0]) || areCardNamesEqual(nameOne, faces[1]));
	}

	const oneParsed = nameOne.toLowerCase().split("'").join("");
	const twoParsed = nameTwo.toLowerCase().split("'").join("");
	return oneParsed === twoParsed;
};

const isDouble = (name) => {
	const faces = name.split(" // ");
	return faces.length === 2;
};

export { areCardNamesEqual, isDouble };
