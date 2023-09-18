//// [tests/cases/compiler/reachabilityChecks7.ts] ////

//// [reachabilityChecks7.ts]
// async function without return type annotation - error
async function f1() {    
}

let x = async function() {
}

// async function with which promised type is void - return can be omitted
async function f2(): Promise<void> {
    
}

async function f3(x) {
    if (x) return 10;
}

async function f4(): Promise<number> {
    
}

function voidFunc(): void {
}

function calltoVoidFunc(x) {
    if (x) return voidFunc();
}

declare function use(s: string): void;
let x1 = () => { use("Test"); }

//// [reachabilityChecks7.js]
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// async function without return type annotation - error
function f1() {
    return __awaiter(this, void 0, void 0, function* () {
    });
}
let x = function () {
    return __awaiter(this, void 0, void 0, function* () {
    });
};
// async function with which promised type is void - return can be omitted
function f2() {
    return __awaiter(this, void 0, void 0, function* () {
    });
}
function f3(x) {
    return __awaiter(this, void 0, void 0, function* () {
        if (x)
            return 10;
    });
}
function f4() {
    return __awaiter(this, void 0, void 0, function* () {
    });
}
function voidFunc() {
}
function calltoVoidFunc(x) {
    if (x)
        return voidFunc();
}
let x1 = () => { use("Test"); };
