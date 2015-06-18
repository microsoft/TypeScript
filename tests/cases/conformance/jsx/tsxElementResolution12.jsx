var obj1;
<obj1 x={10}/>; // OK
var obj2;
<obj2 x={10}/>; // OK
var obj3;
<obj3 x={10}/>; // Error
var obj4;
<obj4 x={10}/>; // OK
<obj4 x={'10'}/>; // Error
