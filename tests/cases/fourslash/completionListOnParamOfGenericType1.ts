/// <reference path='fourslash.ts'/>

////export class List<T> {
////    public next: List<T>;
////    public prev: List<T>;
////    public pushEntry(entry: List<T>): void {
////        entry./*1*/
////    }
////}

const exact = ["next", "prev", "pushEntry"];
verify.completions({ marker: "1", exact });
edit.insert('next.');
verify.completions({ exact });
edit.insert('prev.');
verify.completions({ exact });
