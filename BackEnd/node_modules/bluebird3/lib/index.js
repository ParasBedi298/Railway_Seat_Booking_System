/*
 * bluebird3 module
 * Exports Bluebird promise library v3.x
 */

// load bluebird
var makeBluebird = require('bluebird/js/release/promise'),
    bluebirdVersion = require('bluebird/package.json').version;

/**
 * Returns a new independent instance of Bluebird.
 * @returns {Function} Bluebird - new Bluebird instance
 */
var getNewLibraryCopy = function() {
    var Bluebird = makeBluebird();

    // NB Bluebird.getNewLibraryCopy is overwritten due to incorrect value for `Promise.version` in v3.4.1
    //if (!Bluebird.getNewLibraryCopy) Bluebird.getNewLibraryCopy = getNewLibraryCopy;
    Bluebird.getNewLibraryCopy = getNewLibraryCopy;

    // NB Bluebird.version is overwritten due to incorrect value in v3.4.1
    //if (!Bluebird.version) Bluebird.version = bluebirdVersion;
    Bluebird.version = bluebirdVersion;
    return Bluebird;
};

// export Bluebird with added properties
module.exports = getNewLibraryCopy();
