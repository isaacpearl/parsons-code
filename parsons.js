//parsons.js

//TODO: add scales other than C Major + user selectable scales + handle when starting pitch is not in selected scale
// TODO: algorithmically generate scale pitch classes like this:

const scales = {
	"CMaj": ["C", "D", "E", "F", "G", "A", "B"]
}

function isParsons(p) {
	const regex = RegExp("^[*][dru]*$");
	return regex.test(p);	
}

function isPitch(p) {
	const regex = RegExp("^[A-G][#b]?([0-9]|10)$");
	return regex.test(p);
}

//TODO: refactor into helper functions
function parsonsToPitches(parsons, start, scale=scales["CMaj"]) {
	if (isParsons(parsons) && isPitch(start)) {
		let noteInfo = start.split(/([0-9]|10)/);
		const pitchClass = noteInfo[0];
		let register = noteInfo[1];
		let toneInt = scale.indexOf(pitchClass); //0-indexed 'scale degree'
		//TODO: in GUI, allow user to set stepSize in real time as performance, or pass in list of step sizes to iterate through for generative composition
		let stepSize = 1; 
		for (let i = 0; i < parsons.length; i++) {
			let instruction = parsons[i];
			switch(instruction) {
				case 'd':
					toneInt -= stepSize;
					break;
				case 'u':
					toneInt += stepSize;
					break;
				case '*':
				case 'r':
				default:
					break;
			}
			//TODO: increment/decrement register after applying instruction from parsons code
			//TODO: print visual representation (example on wikipedia page)
			console.log(`pitch: ${scale[toneInt % scale.length] + register}`);
		}

	} else {
		console.log(`invalid input: ${parsons}, ${start}`); //TODO: refactor to use try/catch
	}

}

module.exports = {
	parsonsToPitches
}
