import decl = require("../decl");

declare function fail();

export function call()
{
    var str = decl.call();



    if (str !== "success")
    {
        fail();
    }
}