const fs = require('fs');

//reads the contents of chrome_path.txt file and
//sets up the pathToChrome variable

function getChromePath(callback) {
  fs.readFile('chrome_path.txt', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      callback(err);
      return;
    }
    const lines = data.split('\n');
    const pathToChrome = lines[0].trim();
    callback(null, pathToChrome);
  });
}

module.exports = getChromePath;

