// @declaration: true

interface a { a }
interface b { b }
interface c { c }

type T1 = ([a, b, c]);
type F1 = ([a, b, c]) => void;

type T2 = ({ a });
type F2 = ({ a }) => void;

type T3 = ([{ a: b }, { b: a }]);
type F3 = ([{ a: b }, { b: a }]) => void;

type T4 = ([{ a: [b, c] }]);
type F4 = ([{ a: [b, c] }]) => void;

type C1 = new ([{ a: [b, c] }]) => void;

var v1 = ([a, b, c]) => "hello";
var v2: ([a, b, c]) => string;
