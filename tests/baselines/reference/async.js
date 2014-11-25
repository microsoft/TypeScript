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
        while (1) {
            if (r.done) return r.value;
            if (r.value && typeof (t = r.value.then) === "function")
                return t.call(r.value, function(v) { return n(g.next(v)) }, function(v) { return n(g["throw"](v)) });
            r = g.next(r.value);
        }
    }
    return n(g.next());
};
var __generator = __generator || function (m, r) {
    var d, i = [], f, g, s = { label: 0 }, u;
    function n(c) {
        if (f) throw new TypeError("Generator is already executing.");
        switch (d && c[0]) {
            case "next": return { value: u, done: true };
            case "return": return { value: c[1], done: true };
            case "throw": throw c[1];
        }
        i.push(c);
        while (1) {
            switch ((c = i.pop())[0]) {
            case "next": s.sent = c[1]; break;
            case "endfinally": continue;
            case "yield": s.label++; return { value: c[1], done: false };
            default:
                switch (!(g = s.trys && s.trys[s.trys.length - 1]) && c[0]) {
                    case "throw": i.length = 0; d = 1; throw c[1];
                    case "return": i.length = 0; d = 1; return { value: c[1], done: !0 };
                }
                if (c[0] === "break" && (!g || (c[1] >= g[0] && c[1] < g[3]))) { s.label = c[1]; break; }
                if (c[0] === "throw" && s.label < g[1]) { s.error = c[1]; s.label = g[1]; break; }
                s.trys.pop(), i.push(c);
                if (s.label < g[2]) { s.label = g[2]; break; }
                continue;
            }
            f = true;
            try {
                i.push(m(s));
            } catch (e) {
                i.push(["throw", e]);
            } 
            f = false;
        }
    }
    return { 
        next: function(v) { return n(["next", v]); },
        "throw": function(v) { return n(["throw", v]); },
        "return": function(v) { return n(["return", v]); }
    };
};
function asyncFunc() {
    return new Promise(function(__resolve) {
        __resolve(__awaiter(function(__state) {
            switch(__state.label) {
                case 0:
            }
            return ["return"];
        }))
    });
}
var asyncFuncExpr = function () {
    return new Promise(function(__resolve) {
        __resolve(__awaiter(function(__state) {
            switch(__state.label) {
                case 0:
            }
            return ["return"];
        }))
    });
};
var asyncLambdaBody = function () {
    return new Promise(function(__resolve) {
        __resolve(__awaiter(function(__state) {
            switch(__state.label) {
                case 0:
            }
            return ["return"];
        }))
    });
};
var asyncLambdaExpr = function () {
    return new Promise(function(__resolve) {
        __resolve(__awaiter(function(__state) {
            switch(__state.label) {
                case 0:
            }
            return ["return"];
        }))
    });
};
var Class = (function () {
    function Class() {
    }
    Class.asyncStaticMethod = function () {
        return new Promise(function(__resolve) {
            __resolve(__awaiter(function(__state) {
                switch(__state.label) {
                    case 0:
                }
                return ["return"];
            }))
        });
    };
    Class.prototype.asyncMethod = function () {
        return new Promise(function(__resolve) {
            __resolve(__awaiter(function(__state) {
                switch(__state.label) {
                    case 0:
                }
                return ["return"];
            }))
        });
    };
    return Class;
})();
var ObjectLiteral = {
    asyncProperty: function () {
        return new Promise(function(__resolve) {
            __resolve(__awaiter(function(__state) {
                switch(__state.label) {
                    case 0:
                }
                return ["return"];
            }))
        });
    },
    asyncMethod: function () {
        return new Promise(function(__resolve) {
            __resolve(__awaiter(function(__state) {
                switch(__state.label) {
                    case 0:
                }
                return ["return"];
            }))
        });
    }
};
