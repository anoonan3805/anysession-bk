'use strict';

var findOffices = require('../../custom_APIs/findOffices.js');

module.exports = function(Building) {
    findOffices(Building);
};
