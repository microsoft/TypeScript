var Splicer = require('stream-splicer');
var inherits = require('inherits');
var isarray = require('isarray');

module.exports = Labeled;
inherits(Labeled, Splicer);

module.exports.obj = function (streams, opts) {
    if (!opts) opts = {};
    opts.objectMode = true;
    return new Labeled(streams, opts);
};

function Labeled (streams, opts) {
    if (!(this instanceof Labeled)) return new Labeled(streams, opts);
    Splicer.call(this, [], opts);
    
    var reps = [];
    for (var i = 0; i < streams.length; i++) {
        var s = streams[i];
        if (typeof s === 'string') continue;
        if (isarray(s)) {
            s = new Labeled(s, opts);
        }
        if (i >= 0 && typeof streams[i-1] === 'string') {
            s.label = streams[i-1];
        }
        reps.push(s);
    }
    if (typeof streams[i-1] === 'string') {
        reps.push(new Labeled([], opts));
    }
    this.splice.apply(this, [0,0].concat(reps));
}

Labeled.prototype.indexOf = function (stream) {
    if (typeof stream === 'string') {
        for (var i = 0; i < this._streams.length; i++) {
            if (this._streams[i].label === stream) return i;
        }
        return -1;
    }
    else {
        return Splicer.prototype.indexOf.call(this, stream);
    }
};

Labeled.prototype.get = function (key) {
    if (typeof key === 'string') {
        var ix = this.indexOf(key);
        if (ix < 0) return undefined;
        return this._streams[ix];
    }
    else return Splicer.prototype.get.call(this, key);
};

Labeled.prototype.splice = function (key) {
    var ix;
    if (typeof key === 'string') {
        ix = this.indexOf(key);
    }
    else ix = key;
    var args = [ ix ].concat([].slice.call(arguments, 1));
    return Splicer.prototype.splice.apply(this, args);
};
