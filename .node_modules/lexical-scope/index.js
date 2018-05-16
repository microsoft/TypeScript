var astw = require('astw');

module.exports = function (src) {
    var locals = {};
    var implicit = {};
    var exported = {};
    var implicitProps = {};
    
    if (typeof src === 'string') {
        src = String(src).replace(/^#![^\n]*\n/, '');
    }
    if (src && typeof src === 'object'
    && typeof src.copy === 'function' && typeof src.toString === 'function') {
        src = src.toString('utf8');
    }
    var walk = astw(src);
    
    walk(function (node) {
        if (node.type === 'VariableDeclaration') {
            // take off the leading `var `
            var id = getScope(node);
            for (var i = 0; i < node.declarations.length; i++) {
                var d = node.declarations[i];
                locals[id][d.id.name] = d;
            }
        }
        else if (node.type === 'CatchClause') {
            var id = getScope(node);
            locals[id][node.param.name] = node.param
        }
        else if (isFunction(node)) {
            var id = getScope(node.parent);
            if (node.id) locals[id][node.id.name] = node;
            var nid = node.params.length && getScope(node);
            if (nid && !locals[nid]) locals[nid] = {};
            for (var i = 0; i < node.params.length; i++) {
                var p = node.params[i];
                locals[nid][p.name] = p;
            }
        }
    });
    
    walk(function (node) {
        if (node.type === 'Identifier'
        && lookup(node) === undefined) {
            if (node.parent.type === 'Property'
            && node.parent.key === node) return;
            if (node.parent.type === 'MemberExpression'
            && node.parent.property === node) return;
            if (isFunction(node.parent)) return;
            if (node.parent.type === 'LabeledStatement') return;
            if (node.parent.type === 'ContinueStatement') return;
            if (node.parent.type === 'BreakStatement') return;
         
            if (node.parent.type === 'AssignmentExpression') {
                var isLeft0 = node.parent.left.type === 'MemberExpression'
                    && node.parent.left.object === node.name
                ;
                var isLeft1 = node.parent.left.type === 'Identifier'
                    && node.parent.left.name === node.name
                ;
                if (isLeft0 || isLeft1) {
                    exported[node.name] = keyOf(node).length;
                }
            }
            if (!exported[node.name]
            || exported[node.name] < keyOf(node).length) {
                implicit[node.name] = keyOf(node).length;
                if (!implicitProps[node.name]) implicitProps[node.name] = {};
                if (node.parent && node.parent.type === 'MemberExpression'
                && node.parent.property.type === 'Identifier') {
                    implicitProps[node.name][node.parent.property.name] = true;
                }
                else if (node.parent && node.parent.type === 'CallExpression'
                && node.parent.callee === node) {
                    implicitProps[node.name]['()'] = true;
                }
                else {
                    implicitProps[node.name]['*'] = true;
                }
            }
        }
    });
    
    var localScopes = {};
    var lks = objectKeys(locals);
    for (var i = 0; i < lks.length; i++) {
        var key = lks[i];
        localScopes[key] = objectKeys(locals[key]);
    }

    var props = {};
    var pkeys = objectKeys(implicitProps);
    for (var i = 0; i < pkeys.length; i++) {
        props[pkeys[i]] = objectKeys(implicitProps[pkeys[i]]);
    }
    return {
        locals: localScopes,
        globals: {
            implicit: objectKeys(implicit),
            implicitProperties: props,
            exported: objectKeys(exported)
        }
    };
    
    function lookup (node) {
        for (var p = node; p; p = p.parent) {
            if (isFunction(p) || p.type === 'Program') {
                var id = getScope(p);
                if (locals[id][node.name]) {
                    return id;
                }
            }
        }
        return undefined;
    }
    
    function getScope (node) {
        for (
            var p = node;
            !isFunction(p) && p.type !== 'Program';
            p = p.parent
        );
        var id = idOf(p);
        if (!locals[id]) locals[id] = {};
        return id;
    }
    
};

function isFunction (x) {
    return x.type === 'FunctionDeclaration'
        || x.type === 'FunctionExpression'
    ;
}

function idOf (node) {
    var id = [];
    for (var n = node; n.type !== 'Program'; n = n.parent) {
        var key = keyOf(n).join('.');
        id.unshift(key);
    }
    return id.join('.');
}

function keyOf (node) {
    if (node.lexicalScopeKey) return node.lexicalScopeKey;
    var p = node.parent;
    var ks = objectKeys(p);
    var kv = { keys : [], values : [], top : [] };
    
    for (var i = 0; i < ks.length; i++) {
        var key = ks[i];
        kv.keys.push(key);
        kv.values.push(p[key]);
        kv.top.push(undefined);
        
        if (isArray(p[key])) {
            var keys = objectKeys(p[key]);
            kv.keys.push.apply(kv.keys, keys);
            kv.values.push.apply(kv.values, p[key]);
            
            var nkeys = [];
            for (var j = 0; j < keys.length; j++) nkeys.push(key);
            kv.top.push.apply(kv.top, nkeys);
        }
    }
    var ix = indexOf(kv.values, node);
    var res = [];
    if (kv.top[ix]) res.push(kv.top[ix]);
    if (kv.keys[ix]) res.push(kv.keys[ix]);
    if (node.parent.type === 'CallExpression') {
        res.unshift.apply(res, keyOf(node.parent.parent));
    }
    return node.lexicalScopeKey = res;
}

var isArray = Array.isArray || function (xs) {
    return Object.prototype.toString.call(xs) === '[object Array]';
};

var objectKeys = Object.keys || function (obj) {
    var keys = [];
    for (var key in obj) keys.push(key);
    return keys;
};

function indexOf (xs, x) {
    if (xs.indexOf) return xs.indexOf(x);
    for (var i = 0; i < xs.length; i++) {
        if (x === xs[i]) return i;
    }
    return -1;
}
