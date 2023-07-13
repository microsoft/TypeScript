//// [tests/cases/compiler/spyComparisonChecking.ts] ////

//// [spyComparisonChecking.ts]
interface Spy {
    (...params: any[]): any;

    identity: string;
    and: Function;
    mostRecentCall: { args: any[]; };
    argsForCall: any[];
}

type SpyObj<T> = T & {
    [k in keyof T]: Spy;
}

declare function createSpyObj<T>(
    name: string, names: Array<keyof T>): SpyObj<T>;

function mock<T>(spyName: string, methodNames: Array<keyof T>): SpyObj<T> {
    const spyObj = createSpyObj<T>(spyName, methodNames);
    for (const methodName of methodNames) {
        spyObj[methodName].and.returnValue(1);
    }
    return spyObj;
}

//// [spyComparisonChecking.js]
function mock(spyName, methodNames) {
    var spyObj = createSpyObj(spyName, methodNames);
    for (var _i = 0, methodNames_1 = methodNames; _i < methodNames_1.length; _i++) {
        var methodName = methodNames_1[_i];
        spyObj[methodName].and.returnValue(1);
    }
    return spyObj;
}
