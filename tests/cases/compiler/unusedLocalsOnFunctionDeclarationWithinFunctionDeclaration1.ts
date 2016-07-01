//@noUnusedLocals:true
//@noUnusedParameters:true

function greeter(person: string, person2: string) {
    var unused = 20;
    function maker(child: string): void {
        var unused2 = 22;
    }
    person2 = "dummy value";
}