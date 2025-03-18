//// [tests/cases/compiler/metadataOfClassFromModule.ts] ////

//// [metadataOfClassFromModule.ts]
module MyModule {

    export function inject(target: any, key: string): void { }

    export class Leg { }

    export class Person {
        @inject leftLeg: Leg;
    }

}

//// [metadataOfClassFromModule.js]
var MyModule;
(function (MyModule) {
    function inject(target, key) { }
    MyModule.inject = inject;
    class Leg {
    }
    MyModule.Leg = Leg;
    class Person {
        @inject
        leftLeg;
    }
    MyModule.Person = Person;
})(MyModule || (MyModule = {}));
