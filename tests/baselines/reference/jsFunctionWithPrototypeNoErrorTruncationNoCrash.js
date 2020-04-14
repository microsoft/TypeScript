//// [index.js]
function Color(obj) {
    this.example = true
};
Color.prototype = {
	negate: function () {return this;},
	lighten: function (ratio) {return this;},
	darken: function (ratio) {return this;},
	saturate: function (ratio) {return this;},
	desaturate: function (ratio) {return this;},
	whiten: function (ratio) {return this;},
	blacken: function (ratio) {return this;},
	greyscale: function () {return this;},
	clearer: function (ratio) {return this;},
	toJSON: function () {return this.rgb();},
};

//// [index.js]
function Color(obj) {
    this.example = true;
}
;
Color.prototype = {
    negate: function () { return this; },
    lighten: function (ratio) { return this; },
    darken: function (ratio) { return this; },
    saturate: function (ratio) { return this; },
    desaturate: function (ratio) { return this; },
    whiten: function (ratio) { return this; },
    blacken: function (ratio) { return this; },
    greyscale: function () { return this; },
    clearer: function (ratio) { return this; },
    toJSON: function () { return this.rgb(); }
};
