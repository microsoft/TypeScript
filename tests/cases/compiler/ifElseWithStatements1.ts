// @allowUnreachableCode: true

if (true)
    f();
else
    f();

function foo(): boolean {
    if (true)
        return true;
    else
        return false;
}
