// @allowJs: true
// @checkJs: true
// @target: es5
// @resolveJsonModule: true
// @outDir: ./out
// @declaration: true
// @filename: index.js
const j = require("./obj.json");
module.exports = j;
// @filename: obj.json
{
    "x": 12,
    "y": 12,
    "obj": {
        "items": [{"x": 12}, {"x": 12, "y": 12}, {"x": 0}, {"x": -1, "err": true}]
    }
}