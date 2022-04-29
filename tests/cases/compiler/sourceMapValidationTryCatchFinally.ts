// @sourcemap: true
var x = 10;
try {
    x = x + 1;
} catch (e) {
    x = x - 1;
} finally {
    x = x * 10;
}
try
{
    x = x + 1;
    throw new Error();
}
catch (e)
{
    x = x - 1;
}
finally
{
    x = x * 10;
}