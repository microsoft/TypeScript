//// [tests/cases/compiler/switchComparableCompatForBrands.ts] ////

//// [switchComparableCompatForBrands.ts]
class MyBrand
{
    private _a: number;
}

function test(strInput: string & MyBrand) {
    switch(strInput)
    {
        case "a":
        return 1;
    }
    return 0;
}


//// [switchComparableCompatForBrands.js]
class MyBrand {
    _a;
}
function test(strInput) {
    switch (strInput) {
        case "a":
            return 1;
    }
    return 0;
}
