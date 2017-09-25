// @module: commonjs
// @allowJs: true
// @checkJs: true
// @noEmit: true

// @Filename: /a.js
exports.x = 0;
exports.x;

// Works nested
{
    // 'exports' does not provide a contextual type to a function-class
    exports.Cls = function() {
        this.x = 0;
    }
}

const instance = new exports.Cls();
