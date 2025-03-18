//// [tests/cases/conformance/classes/members/privateNames/privateNameInLhsReceiverExpression.ts] ////

//// [privateNameInLhsReceiverExpression.ts]
class Test {
    #y = 123;
    static something(obj: { [key: string]: Test }) {
        obj[(new class { #x = 1; readonly s = "prop"; }).s].#y = 1;
        obj[(new class { #x = 1; readonly s = "prop"; }).s].#y += 1;
    }
}



//// [privateNameInLhsReceiverExpression.js]
class Test {
    #y = 123;
    static something(obj) {
        obj[(new class {
            #x = 1;
            s = "prop";
        }).s].#y = 1;
        obj[(new class {
            #x = 1;
            s = "prop";
        }).s].#y += 1;
    }
}
