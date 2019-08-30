const fs = require('fs');
const babelConfig = JSON.parse(fs.readFileSync('./.babelrc'));
require('babel-core/register')(babelConfig);
require('./src/bin/www')