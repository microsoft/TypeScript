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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, Promise, generator) {
    return new Promise(function (resolve, reject) {
        generator = generator.call(thisArg, _arguments);
        function cast(value) { return value instanceof Promise && value.constructor === Promise ? value : new Promise(function (resolve) { resolve(value); }); }
        function onfulfill(value) { try { step("next", value); } catch (e) { reject(e); } }
        function onreject(value) { try { step("throw", value); } catch (e) { reject(e); } }
        function step(verb, value) {
            var result = generator[verb](value);
            result.done ? resolve(result.value) : cast(result.value).then(onfulfill, onreject);
        }
        step("next", void 0);
    });
};
// async function without return type annotation - error
function f1() {
    return __awaiter(this, void 0, Promise, function* () {
    });
}
let x = function () {
    return __awaiter(this, void 0, Promise, function* () {
    });
};
// async function with which promised type is void - return can be omitted
function f2() {
    return __awaiter(this, void 0, Promise, function* () {
    });
}
function f3(x) {
    return __awaiter(this, void 0, Promise, function* () {
        if (x)
            return 10;
    });
}
function f4() {
    return __awaiter(this, void 0, Promise, function* () {
    });
}
function voidFunc() {
}
function calltoVoidFunc(x) {
    if (x)
        return voidFunc();
}
let x1 = () => { use("Test"); };
