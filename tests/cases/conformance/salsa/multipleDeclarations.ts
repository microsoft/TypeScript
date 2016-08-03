// @filename: input.js
// @out: output.js
// @allowJs: true

function C() {
    this.m = null;
}
C.prototype.m = function() {
    this.nothing();
}

class X {
    constructor() {
        this.m = this.m.bind(this);
        this.mistake = 'frankly, complete nonsense';
    }
    m() {
    }
    mistake() {
    }
}
let x = new X();
X.prototype.mistake = false;
x.m();
x.mistake;
