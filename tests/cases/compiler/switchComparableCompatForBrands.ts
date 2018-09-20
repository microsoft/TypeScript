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
