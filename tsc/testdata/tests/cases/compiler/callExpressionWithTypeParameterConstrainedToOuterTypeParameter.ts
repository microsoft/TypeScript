// @target: es2015
interface I<T> {
    <U extends T>(u: U): U;
}
var i: I<string>;
var y = i(""); // y should be string