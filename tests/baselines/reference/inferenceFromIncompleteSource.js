//// [tests/cases/compiler/inferenceFromIncompleteSource.ts] ////

//// [inferenceFromIncompleteSource.ts]
// Repro from #42030

interface ListProps<T, K extends keyof T> {
  items: T[];
  itemKey: K;
  prop: number;
}

declare const Component: <T, K extends keyof T>(x: ListProps<T, K>) => void;

Component({items: [{name:' string'}], itemKey: 'name' });


//// [inferenceFromIncompleteSource.js]
"use strict";
// Repro from #42030
Component({ items: [{ name: ' string' }], itemKey: 'name' });
