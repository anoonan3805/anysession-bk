module.exports = function(app) {

	function deleteEverything() {
		var showcaseData = ['Building', 'Office', 'Session'];
		for (var i in showcaseData) {
			app.models[showcaseData[i]].destroyAll();
			// console.log('../../common/Testing_Data/' + showcaseData[i] + '.json');
			// app.models[showcaseData[i]].upsert(require('../../common/Testing_Data/' + showcaseData[i] + '.json'), function(err, record) {
			// 	if (err) return console.log(err);
			// });
		}
	}
	// to delete the data base uncomment this function then restart the backend
	//make sure to comment it back out after you use it
	
	// deleteEverything()
};
