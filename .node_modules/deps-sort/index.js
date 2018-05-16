var through = require('through2');
var shasum = require('shasum');

module.exports = function (opts) {
    if (!opts) opts = {};
    var rows = [];
    return through.obj(write, end);
    
    function write (row, enc, next) { rows.push(row); next() }
    
    function end () {
        var tr = this;
        rows.sort(cmp);
        sorter(rows, tr, opts);
    }
};

function sorter (rows, tr, opts) {
    var expose = opts.expose || {};
    if (Array.isArray(expose)) {
        expose = expose.reduce(function (acc, key) {
            acc[key] = true;
            return acc;
        }, {});
    }
    
    var hashes = {}, deduped = {};
    var sameDeps = depCmp();
    
    if (opts.dedupe) {
        rows.forEach(function (row) {
            var h = shasum(row.source);
            sameDeps.add(row, h);
            if (hashes[h]) {
                hashes[h].push(row);
            } else {
                hashes[h] = [row];
            }
        });
        Object.keys(hashes).forEach(function (h) {
            var rows = hashes[h];
            while (rows.length > 1) {
                var row = rows.pop();
                row.dedupe = rows[0].id;
                row.sameDeps = sameDeps.cmp(rows[0].deps, row.deps);
                deduped[row.id] = rows[0].id;
            }
        });
    }
    
    if (opts.index) {
        var index = {};
        var offset = 0;
        rows.forEach(function (row, ix) {
            if (has(expose, row.id)) {
                row.index = row.id;
                offset ++;
                if (expose[row.id] !== true) {
                    index[expose[row.id]] = row.index;
                }
            }
            else {
                row.index = ix + 1 - offset;
            }
            index[row.id] = row.index;
        });
        rows.forEach(function (row) {
            row.indexDeps = {};
            Object.keys(row.deps).forEach(function (key) {
                var id = row.deps[key];
                row.indexDeps[key] = index[id];
            });
            if (row.dedupe) {
                row.dedupeIndex = index[row.dedupe];
            }
            tr.push(row);
        });
    }
    else {
        rows.forEach(function (row) { tr.push(row) });
    }
    tr.push(null);
}

function cmp (a, b) {
    return a.id + a.hash < b.id + b.hash ? -1 : 1;
}

function has (obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key);
}

function depCmp () {
    var deps = {}, hashes = {};
    return { add: add, cmp: cmp }
    
    function add (row, hash) {
        deps[row.id] = row.deps;
        hashes[row.id] = hash;
    }
    function cmp (a, b, limit) {
        if (!a && !b) return true;
        if (!a || !b) return false;
        
        var keys = Object.keys(a);
        if (keys.length !== Object.keys(b).length) return false;

        for (var i = 0; i < keys.length; i++) {
            var k = keys[i], ka = a[k], kb = b[k];
            var ha = hashes[ka];
            var hb = hashes[kb];
            var da = deps[ka];
            var db = deps[kb];

            if (ka === kb) continue;
            if (ha !== hb || (!limit && !cmp(da, db, 1))) {
                return false;
            }
        }
        return true;
    }
}
