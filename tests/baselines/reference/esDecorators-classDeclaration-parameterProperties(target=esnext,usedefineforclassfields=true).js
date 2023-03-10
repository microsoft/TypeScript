//// [esDecorators-classDeclaration-parameterProperties.ts]
declare var bound: any;

class C {
    constructor(private message: string) {}

    @bound speak() {
    }
}


//// [esDecorators-classDeclaration-parameterProperties.js]
class C {
    message;
    constructor(message) {
        this.message = message;
    }
    @bound
    speak() {
    }
}
