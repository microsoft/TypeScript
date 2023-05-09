export class WithMethods {
    returnsStringParenthesized() {
        return ((("A")))
    }

    returnsNumber() {
        return 1
    }

    returnsObject() {
        return {
            foo: ""
        };
    }

    returnsObjectUnion() {
        if(Math.random() > 0) {
            return {
                foo: "",
                bar: 1,
            };
        }
        return {
            foo: ""
        };
    }

    returnsUnionPrimitive() {
        if(Math.random() > 0) {
            return "A";
        }
        return "B";
    }
}