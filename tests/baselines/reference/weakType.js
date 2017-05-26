//// [weakType.ts]
interface Settings {
    timeout?: number;
    onError?(): void;
}

function getDefaultSettings() {
    return { timeout: 1000 };
}

function doSomething(settings: Settings) { /* ... */ }

// forgot to call `getDefaultSettings`
// but it is not caught because we don't check for call signatures
doSomething(getDefaultSettings);

// this is an oddly popular way of defining settings
// this example is from services/textChanges.ts
type ConfigurableStart = { useStart?: boolean }
type ConfigurableEnd = { useEnd?: boolean }
type ConfigurableStartEnd = ConfigurableStart & ConfigurableEnd
interface InsertOptions {
    prefix?: string
    suffix?: string
}
type ChangeOptions = ConfigurableStartEnd & InsertOptions;

function del(options: ConfigurableStartEnd = {},
             error: { error?: number } = {}) {
    let changes: ChangeOptions[];
    changes.push(options);
    changes.push(error);
}

class K {
    constructor(s: string) { }
}
// Ctor isn't a weak type because it has a construct signature
interface Ctor {
    new (s: string): K
    n?: number
}
let ctor: Ctor = K

type Spoiler = { nope?: string }
type Weak = {
    a?: number
    properties?: {
        b?: number
    }
}
declare let unknown: {
    properties: {
        wrong: string
    }
}
let weak: Weak & Spoiler = unknown


//// [weakType.js]
function getDefaultSettings() {
    return { timeout: 1000 };
}
function doSomething(settings) { }
// forgot to call `getDefaultSettings`
// but it is not caught because we don't check for call signatures
doSomething(getDefaultSettings);
function del(options, error) {
    if (options === void 0) { options = {}; }
    if (error === void 0) { error = {}; }
    var changes;
    changes.push(options);
    changes.push(error);
}
var K = (function () {
    function K(s) {
    }
    return K;
}());
var ctor = K;
var weak = unknown;
