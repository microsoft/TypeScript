// OK
<test1 c1={function (x) { return x.length; }}/>; // OK
<test1 data-c1={function (x) { return x.leng; }}/>; // OK
// Errors
<test1 c1={function (x) { return x.leng; }}/>; // Error, no leng on 'string'
