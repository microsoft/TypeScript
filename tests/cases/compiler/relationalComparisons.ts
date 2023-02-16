// @strict: true
// @noEmit: true

type Moment = {
    valueOf(): number;
};

declare const m1: Moment, m2: Moment;
declare const d1: Date, d2: Date;

if (m1 > 0) { }
if (m1 > m2) { }
if (0 > m2) { }

if (d1 > d2) { }

declare const arr1: any[], arr2: any[];
if (arr1 > arr2) { }
