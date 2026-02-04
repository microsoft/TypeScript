//// [tests/cases/compiler/inlineSources2.ts] ////

//// [a.ts]
var a = 0;
console.log(a);

//// [b.ts]
var b = 0;
console.log(b);


//// [out.js]
"use strict";
var a = 0;
console.log(a);
var b = 0;
console.log(b);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYS50cyIsImIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNWLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7QUNEZixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDVixPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGEgPSAwO1xuY29uc29sZS5sb2coYSk7XG4iLCJ2YXIgYiA9IDA7XG5jb25zb2xlLmxvZyhiKTtcbiJdfQ==