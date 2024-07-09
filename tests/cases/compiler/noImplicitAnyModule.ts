//@noImplicitAny: true

declare module Module {
    interface Interface {
        // Should return error for implicit any on return type.
        new ();
    }

    class Class {
        // Should return error for implicit `any` on parameter.
        public f(x): any;
        public g(x: any);

        // Should not return error at all.
        private h(x);
    }

    // Should return error for implicit any on return type.
    function f(x: number);
}
