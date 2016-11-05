module.exports = function(app) {
	var showcaseData = ['building', 'Office', 'Session']; 
	for(var i in showcaseData) {
		app.models[showcaseData[i]].destroyAll();
		// console.log('../../common/Testing_Data/' + showcaseData[i] + '.json');
		app.models[showcaseData[i]].upsert(require('../../common/Testing_Data/' + showcaseData[i] + '.json'), function(err, record) {
			if (err) return console.log(err);
		});
	}
};