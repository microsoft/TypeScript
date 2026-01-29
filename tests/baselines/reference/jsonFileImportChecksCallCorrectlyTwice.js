//// [tests/cases/compiler/jsonFileImportChecksCallCorrectlyTwice.ts] ////

//// [index.ts]
import data from "./data.json";

interface Foo {
  str: string;
}

fn(data.foo);
fn(data.foo); // <-- shouldn't error!

function fn(arg: Foo[]) { }
//// [data.json]
{
    "foo": [
      {
        "bool": true,
        "str": "123"
      }
    ]
}

//// [data.json]
{
    "foo": [
        {
            "bool": true,
            "str": "123"
        }
    ]
}
//// [index.js]
import data from "./data.json";
fn(data.foo);
fn(data.foo); // <-- shouldn't error!
function fn(arg) { }
