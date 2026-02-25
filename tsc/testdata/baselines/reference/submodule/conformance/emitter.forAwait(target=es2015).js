//// [tests/cases/conformance/statements/for-await-ofStatements/emitter.forAwait.ts] ////

//// [file1.ts]
async function f1() {
    let y: any;
    for await (const x of y) {
    }
}
//// [file2.ts]
async function f2() {
    let x: any, y: any;
    for await (x of y) {
    }
}
//// [file3.ts]
async function* f3() {
    let y: any;
    for await (const x of y) {
    }
}
//// [file4.ts]
async function* f4() {
    let x: any, y: any;
    for await (x of y) {
    }
}
//// [file5.ts]
// https://github.com/Microsoft/TypeScript/issues/21363
async function f5() {
    let y: any;
    outer: for await (const x of y) {
        continue outer;
    }
}
//// [file6.ts]
// https://github.com/Microsoft/TypeScript/issues/21363
async function* f6() {
    let y: any;
    outer: for await (const x of y) {
        continue outer;
    }
}
//// [file7.ts]
// https://github.com/microsoft/TypeScript/issues/36166
async function* f7() {
    let y: any;
    for (;;) {
        for await (const x of y) {
        }
    }
}

//// [file1.js]
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function f1() {
    return __awaiter(this, void 0, void 0, function* () {
        let y;
        for await (const x of y) {
        }
    });
}
//// [file2.js]
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function f2() {
    return __awaiter(this, void 0, void 0, function* () {
        let x, y;
        for await (x of y) {
        }
    });
}
//// [file3.js]
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function* f3() {
    return __awaiter(this, void 0, void 0, function* () {
        let y;
        for await (const x of y) {
        }
    });
}
//// [file4.js]
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function* f4() {
    return __awaiter(this, void 0, void 0, function* () {
        let x, y;
        for await (x of y) {
        }
    });
}
//// [file5.js]
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// https://github.com/Microsoft/TypeScript/issues/21363
function f5() {
    return __awaiter(this, void 0, void 0, function* () {
        let y;
        outer: for await (const x of y) {
            continue outer;
        }
    });
}
//// [file6.js]
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// https://github.com/Microsoft/TypeScript/issues/21363
function* f6() {
    return __awaiter(this, void 0, void 0, function* () {
        let y;
        outer: for await (const x of y) {
            continue outer;
        }
    });
}
//// [file7.js]
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// https://github.com/microsoft/TypeScript/issues/36166
function* f7() {
    return __awaiter(this, void 0, void 0, function* () {
        let y;
        for (;;) {
            for await (const x of y) {
            }
        }
    });
}
