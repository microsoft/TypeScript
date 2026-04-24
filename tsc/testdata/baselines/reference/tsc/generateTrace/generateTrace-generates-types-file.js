currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/a.ts] *new* 
interface Person {
    name: string;
    age: number;
}
const p: Person = { name: "Alice", age: 30 };
//// [/home/src/workspaces/project/tsconfig.json] *new* 
{
    "compilerOptions": {
        "strict": true,
        "noEmit": true
    }
}

tsgo --generateTrace /home/src/workspaces/project/trace --singleThreaded
ExitStatus:: Success
Output::
//// [/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts] *Lib*
/// <reference no-default-lib="true"/>
interface Boolean {}
interface Function {}
interface CallableFunction {}
interface NewableFunction {}
interface IArguments {}
interface Number { toExponential: any; }
interface Object {}
interface RegExp {}
interface String { charAt: any; }
interface Array<T> { length: number; [n: number]: T; }
interface ReadonlyArray<T> {}
interface SymbolConstructor {
    (desc?: string | number): symbol;
    for(name: string): symbol;
    readonly toStringTag: symbol;
}
declare var Symbol: SymbolConstructor;
interface Symbol {
    readonly [Symbol.toStringTag]: string;
}
declare const console: { log(msg: any): void; };
//// [/home/src/workspaces/project/trace/legend.json] *new* 
[
  {
    "configFilePath": "/home/src/workspaces/project/tsconfig.json",
    "tracePath": "/home/src/workspaces/project/trace/trace.json",
    "typesPath": "/home/src/workspaces/project/trace/types_0.json"
  }
]
//// [/home/src/workspaces/project/trace/trace.json] *new* 
[
{"pid":1,"tid":1,"ph":"M","cat":"__metadata","ts":1,"name":"process_name","args":{"name":"tsgo"}},
{"pid":1,"tid":1,"ph":"M","cat":"__metadata","ts":1,"name":"thread_name","args":{"name":"Main"}},
{"pid":1,"tid":1,"ph":"M","cat":"disabled-by-default-devtools.timeline","ts":1,"name":"TracingStartedInBrowser"},
{"pid":1,"tid":1,"ph":"B","cat":"program","ts":2,"name":"createProgram","args":{"configFilePath":"/home/src/workspaces/project/tsconfig.json"}},
{"pid":1,"tid":1,"ph":"B","cat":"parse","ts":3,"name":"createSourceFile","args":{"path":"/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts"}},
{"pid":1,"tid":1,"ph":"E","cat":"parse","ts":4,"name":"createSourceFile","args":{"path":"/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts"}},
{"pid":1,"tid":1,"ph":"B","cat":"parse","ts":5,"name":"createSourceFile","args":{"path":"/home/src/workspaces/project/a.ts"}},
{"pid":1,"tid":1,"ph":"E","cat":"parse","ts":6,"name":"createSourceFile","args":{"path":"/home/src/workspaces/project/a.ts"}},
{"pid":1,"tid":1,"ph":"E","cat":"program","ts":7,"name":"createProgram","args":{"configFilePath":"/home/src/workspaces/project/tsconfig.json"}},
{"pid":1,"tid":1,"ph":"B","cat":"bind","ts":8,"name":"bindSourceFiles"},
{"pid":1,"tid":1,"ph":"B","cat":"bind","ts":9,"name":"bindSourceFile","args":{"path":"/home/src/workspaces/project/a.ts"}},
{"pid":1,"tid":1,"ph":"E","cat":"bind","ts":10,"name":"bindSourceFile","args":{"path":"/home/src/workspaces/project/a.ts"}},
{"pid":1,"tid":1,"ph":"B","cat":"bind","ts":11,"name":"bindSourceFile","args":{"path":"/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts"}},
{"pid":1,"tid":1,"ph":"E","cat":"bind","ts":12,"name":"bindSourceFile","args":{"path":"/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts"}},
{"pid":1,"tid":1,"ph":"E","cat":"bind","ts":13,"name":"bindSourceFiles"},
{"pid":1,"tid":1,"ph":"B","cat":"check","ts":14,"name":"checkSourceFiles"},
{"pid":1,"tid":1,"ph":"B","cat":"check","ts":15,"name":"checkSourceFile","args":{"path":"/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts"}},
{"pid":1,"tid":1,"ph":"E","cat":"check","ts":16,"name":"checkSourceFile","args":{"path":"/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts"}},
{"pid":1,"tid":1,"ph":"B","cat":"check","ts":17,"name":"checkSourceFile","args":{"path":"/home/src/workspaces/project/a.ts"}},
{"pid":1,"tid":1,"ph":"E","cat":"check","ts":18,"name":"checkSourceFile","args":{"path":"/home/src/workspaces/project/a.ts"}},
{"pid":1,"tid":1,"ph":"E","cat":"check","ts":19,"name":"checkSourceFiles"},
{"pid":1,"tid":1,"ph":"B","cat":"emit","ts":20,"name":"emit"},
{"pid":1,"tid":1,"ph":"B","cat":"emit","ts":21,"name":"emit","args":{"path":"/home/src/workspaces/project/a.ts"}},
{"pid":1,"tid":1,"ph":"E","cat":"emit","ts":22,"name":"emit","args":{"path":"/home/src/workspaces/project/a.ts"}},
{"pid":1,"tid":1,"ph":"E","cat":"emit","ts":23,"name":"emit"}
]

//// [/home/src/workspaces/project/trace/types_0.json] *new* 
[{"id":1,"intrinsicName":"any","recursionId":0,"flags":["Any"]},
{"id":2,"intrinsicName":"any","recursionId":1,"flags":["Any"]},
{"id":3,"intrinsicName":"any","recursionId":2,"flags":["Any"]},
{"id":4,"intrinsicName":"any","recursionId":3,"flags":["Any"]},
{"id":5,"intrinsicName":"error","recursionId":4,"flags":["Any"]},
{"id":6,"intrinsicName":"unresolved","recursionId":5,"flags":["Any"]},
{"id":7,"intrinsicName":"any","recursionId":6,"flags":["Any"]},
{"id":8,"intrinsicName":"intrinsic","recursionId":7,"flags":["Any"]},
{"id":9,"intrinsicName":"unknown","recursionId":8,"flags":["Unknown"]},
{"id":10,"intrinsicName":"undefined","recursionId":9,"flags":["Undefined"]},
{"id":11,"intrinsicName":"undefined","recursionId":10,"flags":["Undefined"]},
{"id":12,"intrinsicName":"undefined","recursionId":11,"flags":["Undefined"]},
{"id":13,"intrinsicName":"null","recursionId":12,"flags":["Null"]},
{"id":14,"intrinsicName":"string","recursionId":13,"flags":["String"]},
{"id":15,"intrinsicName":"number","recursionId":14,"flags":["Number"]},
{"id":16,"intrinsicName":"bigint","recursionId":15,"flags":["BigInt"]},
{"id":17,"recursionId":16,"flags":["BooleanLiteral"],"display":"false"},
{"id":18,"recursionId":17,"flags":["BooleanLiteral"],"display":"false"},
{"id":19,"recursionId":18,"flags":["BooleanLiteral"],"display":"true"},
{"id":20,"recursionId":19,"flags":["BooleanLiteral"],"display":"true"},
{"id":21,"recursionId":20,"unionTypes":[17,19],"flags":["Boolean","Union"],"display":"boolean"},
{"id":22,"intrinsicName":"symbol","recursionId":21,"flags":["ESSymbol"]},
{"id":23,"intrinsicName":"void","recursionId":22,"flags":["Void"]},
{"id":24,"intrinsicName":"never","recursionId":23,"flags":["Never"]},
{"id":25,"intrinsicName":"never","recursionId":24,"flags":["Never"]},
{"id":26,"intrinsicName":"never","recursionId":25,"flags":["Never"]},
{"id":27,"intrinsicName":"never","recursionId":26,"flags":["Never"]},
{"id":28,"intrinsicName":"object","recursionId":27,"flags":["NonPrimitive"]},
{"id":29,"recursionId":28,"unionTypes":[14,15],"flags":["Union"],"display":"string | number"},
{"id":30,"recursionId":29,"unionTypes":[14,15,22],"flags":["Union"],"display":"string | number | symbol"},
{"id":31,"recursionId":30,"unionTypes":[15,16],"flags":["Union"],"display":"number | bigint"},
{"id":32,"recursionId":31,"flags":["TemplateLiteral"],"display":"`${number}`"},
{"id":33,"recursionId":32,"unionTypes":[10,13,14,15,16,17,19],"flags":["Union"],"display":"string | number | bigint | boolean | null | undefined"},
{"id":34,"intrinsicName":"never","recursionId":33,"flags":["Never"]},
{"id":35,"recursionId":34,"flags":["Object"],"display":"{}"},
{"id":36,"recursionId":35,"flags":["Object"],"display":"{}"},
{"id":37,"recursionId":36,"flags":["Object"],"display":"{}"},
{"id":38,"symbolName":"__type","recursionId":37,"flags":["Object"],"display":"{}"},
{"id":39,"recursionId":38,"flags":["Object"],"display":"{}"},
{"id":40,"recursionId":39,"unionTypes":[10,13,39],"flags":["Union"],"display":"{} | null | undefined"},
{"id":41,"recursionId":40,"flags":["Object"],"display":"{}"},
{"id":42,"recursionId":41,"flags":["Object"],"display":"{}"},
{"id":43,"recursionId":42,"flags":["Object"],"display":"{}"},
{"id":44,"recursionId":43,"flags":["Object"],"display":"{}"},
{"id":45,"recursionId":44,"flags":["Object"],"display":"{}"},
{"id":46,"recursionId":45,"flags":["TypeParameter"]},
{"id":47,"recursionId":46,"flags":["TypeParameter"]},
{"id":48,"recursionId":47,"flags":["TypeParameter"]},
{"id":49,"recursionId":48,"flags":["TypeParameter"]},
{"id":50,"recursionId":49,"flags":["TypeParameter"]},
{"id":51,"recursionId":50,"flags":["StringLiteral"],"display":"\"\""},
{"id":52,"recursionId":51,"flags":["NumberLiteral"],"display":"0"},
{"id":53,"recursionId":52,"flags":["BigIntLiteral"],"display":"0n"},
{"id":54,"recursionId":53,"flags":["StringLiteral"],"display":"\"bigint\""},
{"id":55,"recursionId":54,"flags":["StringLiteral"],"display":"\"boolean\""},
{"id":56,"recursionId":55,"flags":["StringLiteral"],"display":"\"function\""},
{"id":57,"recursionId":56,"flags":["StringLiteral"],"display":"\"number\""},
{"id":58,"recursionId":57,"flags":["StringLiteral"],"display":"\"object\""},
{"id":59,"recursionId":58,"flags":["StringLiteral"],"display":"\"string\""},
{"id":60,"recursionId":59,"flags":["StringLiteral"],"display":"\"symbol\""},
{"id":61,"recursionId":60,"flags":["StringLiteral"],"display":"\"undefined\""},
{"id":62,"recursionId":61,"unionTypes":[54,55,56,57,58,59,60,61],"flags":["Union"],"display":"\"bigint\" | \"boolean\" | \"function\" | \"number\" | \"object\" | \"string\" | \"symbol\" | \"undefined\""},
{"id":63,"symbolName":"IArguments","recursionId":62,"firstDeclaration":{"path":"/home/src/tslibs/ts/lib/lib.es2025.full.d.ts","start":{"line":6,"character":1},"end":{"line":6,"character":24}},"flags":["Object"]},
{"id":64,"symbolName":"globalThis","recursionId":63,"flags":["Object"],"display":"typeof globalThis"},
{"id":65,"symbolName":"Array","recursionId":64,"instantiatedType":65,"typeArguments":[66],"firstDeclaration":{"path":"/home/src/tslibs/ts/lib/lib.es2025.full.d.ts","start":{"line":11,"character":1},"end":{"line":11,"character":55}},"flags":["Object"]},
{"id":66,"symbolName":"T","recursionId":65,"firstDeclaration":{"path":"/home/src/tslibs/ts/lib/lib.es2025.full.d.ts","start":{"line":11,"character":17},"end":{"line":11,"character":18}},"flags":["TypeParameter"]},
{"id":67,"symbolName":"Array","recursionId":64,"firstDeclaration":{"path":"/home/src/tslibs/ts/lib/lib.es2025.full.d.ts","start":{"line":11,"character":1},"end":{"line":11,"character":55}},"flags":["TypeParameter"]},
{"id":68,"symbolName":"Object","recursionId":66,"firstDeclaration":{"path":"/home/src/tslibs/ts/lib/lib.es2025.full.d.ts","start":{"line":8,"character":1},"end":{"line":8,"character":20}},"flags":["Object"]},
{"id":69,"symbolName":"Function","recursionId":67,"firstDeclaration":{"path":"/home/src/tslibs/ts/lib/lib.es2025.full.d.ts","start":{"line":3,"character":1},"end":{"line":3,"character":22}},"flags":["Object"]},
{"id":70,"symbolName":"CallableFunction","recursionId":68,"firstDeclaration":{"path":"/home/src/tslibs/ts/lib/lib.es2025.full.d.ts","start":{"line":4,"character":1},"end":{"line":4,"character":30}},"flags":["Object"]},
{"id":71,"symbolName":"NewableFunction","recursionId":69,"firstDeclaration":{"path":"/home/src/tslibs/ts/lib/lib.es2025.full.d.ts","start":{"line":5,"character":1},"end":{"line":5,"character":29}},"flags":["Object"]},
{"id":72,"symbolName":"String","recursionId":70,"firstDeclaration":{"path":"/home/src/tslibs/ts/lib/lib.es2025.full.d.ts","start":{"line":10,"character":1},"end":{"line":10,"character":34}},"flags":["Object"]},
{"id":73,"symbolName":"Number","recursionId":71,"firstDeclaration":{"path":"/home/src/tslibs/ts/lib/lib.es2025.full.d.ts","start":{"line":7,"character":1},"end":{"line":7,"character":41}},"flags":["Object"]},
{"id":74,"symbolName":"Boolean","recursionId":72,"firstDeclaration":{"path":"/home/src/tslibs/ts/lib/lib.es2025.full.d.ts","start":{"line":2,"character":1},"end":{"line":2,"character":21}},"flags":["Object"]},
{"id":75,"symbolName":"RegExp","recursionId":73,"firstDeclaration":{"path":"/home/src/tslibs/ts/lib/lib.es2025.full.d.ts","start":{"line":9,"character":1},"end":{"line":9,"character":20}},"flags":["Object"]},
{"id":76,"symbolName":"Array","recursionId":64,"instantiatedType":65,"typeArguments":[1],"firstDeclaration":{"path":"/home/src/tslibs/ts/lib/lib.es2025.full.d.ts","start":{"line":11,"character":1},"end":{"line":11,"character":55}},"flags":["Object"]},
{"id":77,"symbolName":"Array","recursionId":64,"instantiatedType":65,"typeArguments":[2],"firstDeclaration":{"path":"/home/src/tslibs/ts/lib/lib.es2025.full.d.ts","start":{"line":11,"character":1},"end":{"line":11,"character":55}},"flags":["Object"]},
{"id":78,"symbolName":"ReadonlyArray","recursionId":74,"instantiatedType":78,"typeArguments":[79],"firstDeclaration":{"path":"/home/src/tslibs/ts/lib/lib.es2025.full.d.ts","start":{"line":12,"character":1},"end":{"line":12,"character":30}},"flags":["Object"]},
{"id":79,"symbolName":"T","recursionId":75,"firstDeclaration":{"path":"/home/src/tslibs/ts/lib/lib.es2025.full.d.ts","start":{"line":12,"character":25},"end":{"line":12,"character":26}},"flags":["TypeParameter"]},
{"id":80,"symbolName":"ReadonlyArray","recursionId":74,"firstDeclaration":{"path":"/home/src/tslibs/ts/lib/lib.es2025.full.d.ts","start":{"line":12,"character":1},"end":{"line":12,"character":30}},"flags":["TypeParameter"]},
{"id":81,"symbolName":"ReadonlyArray","recursionId":74,"instantiatedType":78,"typeArguments":[1],"firstDeclaration":{"path":"/home/src/tslibs/ts/lib/lib.es2025.full.d.ts","start":{"line":12,"character":1},"end":{"line":12,"character":30}},"flags":["Object"]},
{"id":82,"symbolName":"Array","recursionId":64,"instantiatedType":65,"typeArguments":[66,67],"firstDeclaration":{"path":"/home/src/tslibs/ts/lib/lib.es2025.full.d.ts","start":{"line":11,"character":1},"end":{"line":11,"character":55}},"flags":["Object"]},
{"id":83,"recursionId":76,"flags":["StringLiteral"],"display":"\"length\""},
{"id":84,"symbolName":"ReadonlyArray","recursionId":74,"instantiatedType":78,"typeArguments":[79,80],"firstDeclaration":{"path":"/home/src/tslibs/ts/lib/lib.es2025.full.d.ts","start":{"line":12,"character":1},"end":{"line":12,"character":30}},"flags":["Object"]},
{"id":85,"symbolName":"SymbolConstructor","recursionId":77,"firstDeclaration":{"path":"/home/src/tslibs/ts/lib/lib.es2025.full.d.ts","start":{"line":13,"character":1},"end":{"line":17,"character":2}},"flags":["Object"]},
{"id":86,"recursionId":78,"unionTypes":[10,14,15],"flags":["Union"],"display":"string | number | undefined"},
{"id":87,"symbolName":"toStringTag","recursionId":79,"firstDeclaration":{"path":"/home/src/tslibs/ts/lib/lib.es2025.full.d.ts","start":{"line":16,"character":5},"end":{"line":16,"character":34}},"flags":["UniqueESSymbol"]},
{"id":88,"symbolName":"Symbol","recursionId":80,"firstDeclaration":{"path":"/home/src/tslibs/ts/lib/lib.es2025.full.d.ts","start":{"line":18,"character":13},"end":{"line":18,"character":38}},"flags":["Object"]},
{"id":89,"symbolName":"__type","recursionId":81,"firstDeclaration":{"path":"/home/src/tslibs/ts/lib/lib.es2025.full.d.ts","start":{"line":22,"character":24},"end":{"line":22,"character":48}},"flags":["Object"],"display":"{ log(msg: any): void; }"},
{"id":90,"symbolName":"Person","recursionId":82,"firstDeclaration":{"path":"/home/src/workspaces/project/a.ts","start":{"line":1,"character":1},"end":{"line":4,"character":2}},"flags":["Object"]},
{"id":91,"recursionId":83,"flags":["StringLiteral"],"display":"\"Alice\""},
{"id":92,"recursionId":84,"flags":["StringLiteral"],"display":"\"Alice\""},
{"id":93,"recursionId":85,"flags":["NumberLiteral"],"display":"30"},
{"id":94,"recursionId":86,"flags":["NumberLiteral"],"display":"30"},
{"id":95,"symbolName":"__object","recursionId":87,"firstDeclaration":{"path":"/home/src/workspaces/project/a.ts","start":{"line":5,"character":19},"end":{"line":5,"character":45}},"flags":["Object"],"display":"{ name: string; age: number; }"}]


