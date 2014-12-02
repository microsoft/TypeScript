//// [async.ts]
declare class Promise<T> {
    constructor(init: (resolve: (value?: T | IPromise<T>) => void, reject: (reason?: any) => void) => void);
    then<TResult>(onfulfilled?: (value: T) => TResult | IPromise<TResult>, onrejected?: (reason: any) => TResult | IPromise<TResult>): Promise<TResult>;
}

async function asyncFunc(): Promise<void> {
    return;
}

var asyncFuncExpr = async function(): Promise<void> {
    return;
}

var asyncLambdaBody = async (): Promise<void> => { return; };
var asyncLambdaExpr = async (): Promise<void> => null;

class Class {
    public static async asyncStaticMethod(): Promise<void> {
        return;
    }

    public async asyncMethod(): Promise<void> {
        return;
    }
}

var ObjectLiteral = {
    asyncProperty: async function(): Promise<void> {
        return;
    },

    async asyncMethod(): Promise<void> {
        return;
    }
};


//// [async.js]
var __awaiter = __awaiter || function (g) {
    function n(r, t) {
        while (true) {
            if (r.done) return r.value;
            if (r.value && typeof (t = r.value.then) === "function")
                return t.call(r.value, function(v) { return n(g.next(v)) }, function(v) { return n(g["throw"](v)) });
            r = g.next(r.value);
        }
    }
    return n(g.next());
};
var __generator = __generator || function (m) {
    var d, i = [], f, g, s = { label: 0 };
    function n(c) {
        if (f) throw new TypeError("Generator is already executing.");
        switch (d && c[0]) {
            case "next": return { value: undefined, done: true };
            case "return": return { value: c[1], done: true };
            case "throw": throw c[1];
        }
        while (true) {
            f = false;
            switch (!(g = s.trys && s.trys[s.trys.length - 1]) && c[0]) {
                case "throw": i.length = 0; d = true; throw c[1];
                case "return": i.length = 0; d = true; return { value: c[1], done: true };
            }
            switch (c[0]) {
                case "yield": s.label++; return { value: c[1], done: false };
                case "next": s.sent = c[1]; break;
                case "endfinally": c = i.pop(); continue;
                default:
                    if (c[0] === "break" && (!g || (c[1] >= g[0] && c[1] < g[3]))) { s.label = c[1]; break; }
                    if (c[0] === "throw" && s.label < g[1]) { s.error = c[1]; s.label = g[1]; break; }
                    s.trys.pop(), i.push(c);
                    if (s.label < g[2]) { s.label = g[2]; break; }
                    continue;
                }
                f = true;
                try {
                    c = m(s);
                } catch (e) {
                    c = ["throw", e];
                }
            }
        }
        return {
            next: function (v) { return n(["next", v]); },
            "throw": function (v) { return n(["throw", v]); },
            "return": function (v) { return n(["return", v]); },
        };
    };
function asyncFunc() {
    return new Promise(function (__resolve) {
        __resolve(__awaiter(__generator(function (__state) {
            switch (__state.label) {
                case 0:
                    return ["return"];
            }
        })));
    });
}
var asyncFuncExpr = function () {
    return new Promise(function (__resolve) {
        __resolve(__awaiter(__generator(function (__state) {
            switch (__state.label) {
                case 0:
                    return ["return"];
            }
        })));
    });
};
var asyncLambdaBody = function () {
    return new Promise(function (__resolve) {
        __resolve(__awaiter(__generator(function (__state) {
            switch (__state.label) {
                case 0:
                    return ["return"];
            }
        })));
    });
};
var asyncLambdaExpr = function () {
    return new Promise(function (__resolve) {
        __resolve(__awaiter(__generator(function (__state) {
            switch (__state.label) {
                case 0:
                    return ["return", null];
            }
        })));
    });
};
var Class = (function () {
    function Class() {
    }
    Class.asyncStaticMethod = function () {
        return new Promise(function (__resolve) {
            __resolve(__awaiter(__generator(function (__state) {
                switch (__state.label) {
                    case 0:
                        return ["return"];
                }
            })));
        });
    };
    Class.prototype.asyncMethod = function () {
        return new Promise(function (__resolve) {
            __resolve(__awaiter(__generator(function (__state) {
                switch (__state.label) {
                    case 0:
                        return ["return"];
                }
            })));
        });
    };
    return Class;
})();
var ObjectLiteral = {
    asyncProperty: function () {
        return new Promise(function (__resolve) {
            __resolve(__awaiter(__generator(function (__state) {
                switch (__state.label) {
                    case 0:
                        return ["return"];
                }
            })));
        });
    },
    asyncMethod: function () {
        return new Promise(function (__resolve) {
            __resolve(__awaiter(__generator(function (__state) {
                switch (__state.label) {
                    case 0:
                        return ["return"];
                }
            })));
        });
    }
};
