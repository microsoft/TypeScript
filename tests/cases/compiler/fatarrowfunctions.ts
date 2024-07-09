
function foo(x:any) {
	return x();
}


foo((x:number,y,z)=>{return x+y+z;});
foo((x,y,z)=>{return x+y+z;});
foo((x,y:number,z)=>{return x+y+z;});
foo((x,y:number,z:number)=>{return x+y+z;});
foo((x,y,z:number)=>{return x+y+z;});
foo(()=>{return 0;});

foo((x:number,y,z)=>x+y+z);
foo((x,y,z)=>x+y+z);
foo((x,y:number,z)=>{return x+y+z;});
foo((x,y:number,z:number)=>{return x+y+z;});
foo((x,y,z:number)=>{return x+y+z;});
foo(()=>{return 0;});


foo(((x) => x));

foo(x => x*x);

var y = x => x*x;
var z = (x:number) => x*x;

var w = () => 3;

function ternaryTest(isWhile:boolean) {

                var f = isWhile ? function (n) { return n > 0; } : function (n) { return n === 0; };

}

declare function setTimeout(expression: any, msec?: number, language?: any): number;

var messenger = {
    message: "Hello World",
    start: function() {
        setTimeout(() => { this.message.toString(); }, 3000);
    }
};
