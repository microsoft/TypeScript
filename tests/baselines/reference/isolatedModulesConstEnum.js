//// [tests/cases/compiler/isolatedModulesConstEnum.ts] ////

//// [foo.d.ts]
declare const enum EventName {
    FOO = 1,
    BAR = 2
}

type E1 = {
    [EventName.FOO]: number;
    [EventName.BAR]: string;
};

//// [bar.ts]
type E2 = {
    [EventName.FOO]: number;
    [EventName.BAR]: string;
};


//// [bar.js]
