// @target: es2015
// @allowJs: true
// @checkJs: true
// @noEmit: true
// @filename: index.js
var chrome = {}
Object.defineProperty(chrome, 'devtools', { value: {}, enumerable: true })
chrome.devtools.inspectedWindow = {}