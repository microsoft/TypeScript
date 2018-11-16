// @noEmit: true
// @allowJs: true
// @checkJs: true
// @Filename: axios.js
class Axios {
    constructor() {
    }
    m() { }
}
var axios = new Axios();
// none of the 3 references should have a use-before-def error
axios.m()
module.exports = axios;
module.exports.default = axios;
