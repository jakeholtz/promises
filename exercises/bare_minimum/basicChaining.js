/*
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 */

var fs = require('fs');
var Promise = require('bluebird');


var pluckFirstLineFromFileAsync = require('./promiseConstructor').pluckFirstLineFromFileAsync;
var getGitHubProfileAsync = require('./promisification').getGitHubProfileAsync;
var writeFileAsync = Promise.promisify(fs.writeFile);

// or Promise.promisifyAll(fs) then user fs.writeFileAsync

var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  return pluckFirstLineFromFileAsync(readFilePath)
    .then(getGitHubProfileAsync)
    .then(function(profile) {
      return writeFileAsync(writeFilePath, JSON.stringify(profile));
    });
};

module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
