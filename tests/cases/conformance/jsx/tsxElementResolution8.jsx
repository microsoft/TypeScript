// Error
var div = 3;
<div />;
// OK
function fact() { return null; }
<fact />;
// Error
function fnum() { return 42; }
<fnum />;
var obj1;
<obj1 />; // OK, prefer construct signatures
var obj2;
<obj2 />; // Error
var obj3;
<obj3 />; // Error
