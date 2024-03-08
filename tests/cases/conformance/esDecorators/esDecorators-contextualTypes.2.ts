// @target: esnext
// @module: esnext

class C {
    @boundMethodLogger("Yadda", /*bound*/ true)
    foo() {
        this.fooHelper();
    }

    fooHelper() {
        console.log("Behold! The actual method implementation!")
    }
};
export { C };

function boundMethodLogger<This, Args extends any[], Return>(source: string, bound = true) {
    return function loggedDecorator(
        target: (this: This, ...args: Args) => Return,
        context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Return>
    ): ((this: This, ...args: Args) => Return) {

        if (bound) {
            context.addInitializer(function () {
                (this as any)[context.name] = (this as any)[context.name].bind(this);
            });
        }

        return function (this, ...args) {
            console.log(`<${source}>: I'm logging stuff from ${context.name.toString()}!`);
            return target.apply(this, args);
        }
    }
}