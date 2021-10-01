// @noTypesAndSymbols: true

declare const o1: ((...args: any[]) => number);
declare const o2: { b: (...args: any[]) => number };
declare const o3: { b: ((...args: any[]) => (...args: any[]) => number) };
declare const o4: { b: ((...args: any[]) => { c: (...args: any[]) => number } ) };

(o1)(o1 ?? 1);
(o2?.b)(o1 ?? 1);
(o3?.b())(o1 ?? 1);
(o4?.b().c)(o1 ?? 1);
