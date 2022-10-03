class Foo {

    try {

        public bar = someInitThatMightFail();

    } catch(e) {}



    public baz() {

        return this.bar; // doesn't get rewritten to Foo.bar.

    }

}

