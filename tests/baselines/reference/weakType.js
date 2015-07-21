//// [weakType.ts]
interface Settings {
    timeout?: number;
    onError?(): void;
}

function getDefaultSettings() {
    return { timeout: 1000 };
}

function doSomething(settings: Settings) { /* ... */ }

doSomething(getDefaultSettings);


//// [weakType.js]
function getDefaultSettings() {
    return { timeout: 1000 };
}
function doSomething(settings) { }
doSomething(getDefaultSettings);
