declare var y:any;

// Below is actually valid JavaScript (see http://es5.github.com/#x8.7 ), even though will always fail at runtime with 'invalid left-hand side'
var x = new y = 5;