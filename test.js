//test.js
const parsons = require('./parsons.js');
const prompt = require('prompt');

prompt.start();

prompt.get(['parsonsCode', 'startingNote'], function (err, result) {
    if (err) { return onErr(err); }
	parsons.parsonsToPitches(result.parsonsCode, result.startingNote);
});

function onErr(err) {
    console.log(err);
    return 1;
}
