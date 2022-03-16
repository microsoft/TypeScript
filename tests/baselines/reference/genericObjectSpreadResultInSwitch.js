//// [genericObjectSpreadResultInSwitch.ts]
type Params = {
    foo: string;
} & ({ tag: 'a'; type: number } | { tag: 'b'; type: string });

const getType = <P extends Params>(params: P) => {
    const {
        // Omit
        foo,

        ...rest
    } = params;

    return rest;
};

declare const params: Params;

switch (params.tag) {
    case 'a': {
        // TS 4.2: number
        // TS 4.3: string | number
        const result = getType(params).type;

        break;
    }
    case 'b': {
        // TS 4.2: string
        // TS 4.3: string | number
        const result = getType(params).type;

        break;
    }
}

//// [genericObjectSpreadResultInSwitch.js]
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var getType = function (params) {
    var 
    // Omit
    foo = params.foo, rest = __rest(params, ["foo"]);
    return rest;
};
switch (params.tag) {
    case 'a': {
        // TS 4.2: number
        // TS 4.3: string | number
        var result = getType(params).type;
        break;
    }
    case 'b': {
        // TS 4.2: string
        // TS 4.3: string | number
        var result = getType(params).type;
        break;
    }
}
