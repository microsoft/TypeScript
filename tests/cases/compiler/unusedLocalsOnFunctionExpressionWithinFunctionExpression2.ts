//@noUnusedLocals:true
//@noUnusedParameters:true

var greeter = function (person: string, person2: string) {
    var unused = 20;
    var maker = function (child: string): void {
        var unused2 = 22;
    }
    var maker2 = function (child2: string): void {
        var unused3 = 23;
    }
    maker2(person2);
}