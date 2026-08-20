//// [tests/cases/compiler/jsonImportMultipleTopLevelObjects.ts] ////

//// [data.json]
{"a": 1}
{"b": 2}

//// [index.ts]
import data from "./data.json";


//// [index.js]
