/// <reference path='fourslash.ts' />

////var o1 : {
////    __proto__: number;
////    p: number;
////} = {
////        /*1*/
////    };
////var o2: {
////    __proto__: number;
////    p: number;
////} = {
////        /*2*/
////    };
////var o3: {
////    "__proto__": number;
////    p: number;
////} = {
////        /*3*/
////    };
////var o4: {
////    "__proto__": number;
////    p: number;
////} = {
////        /*4*/
////    };
////var o5: {
////    __proto__: number;
////    ___proto__: string;
////    p: number;
////} = {
////        /*5*/
////    };
////var o6: {
////    __proto__: number;
////    ___proto__: string;
////    p: number;
////} = {
////        /*6*/
////    };

const tripleProto: FourSlashInterface.ExpectedCompletionEntry = { name: "___proto__", text: "(property) ___proto__: string" };
const proto: FourSlashInterface.ExpectedCompletionEntry = { name: "__proto__", text: "(property) __proto__: number" };
const protoQuoted: FourSlashInterface.ExpectedCompletionEntry = { name: "__proto__", text: '(property) "__proto__": number' };
const p: FourSlashInterface.ExpectedCompletionEntry = { name: "p", text: "(property) p: number" };

verify.completions({ marker: "1", exact: completion.sorted([proto, p]) });
edit.insert('__proto__: 10,');
verify.completions({ exact: p });

verify.completions({ marker: "2", exact: completion.sorted([proto, p]) });
edit.insert('"__proto__": 10,');
verify.completions({ exact: p });

verify.completions({ marker: "3", exact: completion.sorted([protoQuoted, p]) })
edit.insert('__proto__: 10,');
verify.completions({ exact: p });

verify.completions({ marker: "4", exact: completion.sorted([protoQuoted, p]) });
edit.insert('"__proto__": 10,');
verify.completions({ exact: p });

verify.completions({ marker: "5", exact: completion.sorted([proto, tripleProto, p]) });
edit.insert('__proto__: 10,');
verify.completions({ exact: completion.sorted([tripleProto, p]) });
edit.insert('"___proto__": "10",');
verify.completions({ exact: p });

verify.completions({ marker: "6", exact: completion.sorted([proto, tripleProto, p]) });
edit.insert('___proto__: "10",');
verify.completions({ exact: completion.sorted([proto, p]) });
edit.insert('"__proto__": 10,');
verify.completions({ exact: p });
