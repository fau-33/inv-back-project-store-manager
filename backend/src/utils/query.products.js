const snakeize = require('snakeize');

const handleColumns = (obj) => Object.keys(snakeize(obj)).join(', ');

const handlePlaceholders = (obj) => Object.keys(obj).map(() => '?').join(', ');

module.exports = {
  handleColumns,
  handlePlaceholders,
};