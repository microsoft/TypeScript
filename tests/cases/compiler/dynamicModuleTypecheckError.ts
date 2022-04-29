//@module: commonjs
export var x = 1;
 
for(var i = 0; i < 30; i++) {
 
    x = i * 1000; // should not be an error here
 
}
