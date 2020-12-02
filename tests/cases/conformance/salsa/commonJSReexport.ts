// #41422, based on prettier's exports
// @noEmit: true
// @checkJS: true

// @filename: first.js
const hardline = { type: "hard" }
module.exports = {
  hardline
}


// @filename: second.js
module.exports = {
  nested: require('./first')
};

// @filename: main.js
const { hardline } = require('./second').nested;
hardline
