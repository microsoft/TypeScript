//// [externalModuleReferenceDoubleUnderscore1.ts]
declare module 'timezonecomplete' {
    import basics = require("__timezonecomplete/basics");
    export import TimeUnit = basics.TimeUnit;
}

declare module '__timezonecomplete/basics' {
    export enum TimeUnit {
        Second = 0,
        Minute = 1,
        Hour = 2,
        Day = 3,
        Week = 4,
        Month = 5,
        Year = 6,
    }
}

//// [externalModuleReferenceDoubleUnderscore1.js]
