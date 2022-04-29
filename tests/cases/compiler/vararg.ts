module M {
    export class C {
        public f(x:string,...rest:number[]) {
            var sum=0;
            for (var i=0;i<rest.length;i++) {
                sum+=rest[i];
            }
            result+=(x+": "+sum);
            return result;
        }

        public fnope(x:string,...rest:number) {
    
        }

        public fonly(...rest:string[]) {
            builder="";
            for (var i=0;i<rest.length;i++) {
                builder+=rest[i];
            }
            return builder;
        }
    }
}

var x=new M.C();
var result="";
result+=x.f(x,3,3); // bad first param
result+=x.f(3,"hello",3); // bad second param
result+=x.f("hello",3,3,3,3,3); // ok
result+=x.f("hello"); // ok varargs length 0
result+=x.fonly(3); // ok conversion
result+=x.fonly(x); // bad param
result+=x.fonly("a"); // ok 
result+=x.fonly("a","b","c","d"); //ok 


