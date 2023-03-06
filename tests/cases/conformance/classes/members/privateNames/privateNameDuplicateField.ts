// @strict: true
// @target: es6

function Field() {

    // Error
    class A_Field_Field {
        #foo = "foo";
        #foo = "foo";
    }

    // Error
    class A_Field_Method {
        #foo = "foo";
        #foo() { }
    }

    // Error
    class A_Field_Getter {
        #foo = "foo";
        get #foo() { return ""}
    }

    // Error
    class A_Field_Setter {
        #foo = "foo";
        set #foo(value: string) { }
    }

    // Error
    class A_Field_StaticField {
        #foo = "foo";
        static #foo = "foo";
    }

    // Error
    class A_Field_StaticMethod {
        #foo = "foo";
        static #foo() { }
    }

    // Error
    class A_Field_StaticGetter {
        #foo = "foo";
        static get #foo() { return ""}
    }

    // Error
    class A_Field_StaticSetter {
        #foo = "foo";
        static set #foo(value: string) { }
    }
}

function Method() {
    // Error
    class A_Method_Field {
        #foo() { }
        #foo = "foo";
    }

    // Error
    class A_Method_Method {
        #foo() { }
        #foo() { }
    }

    // Error
    class A_Method_Getter {
        #foo() { }
        get #foo() { return ""}
    }

    // Error
    class A_Method_Setter {
        #foo() { }
        set #foo(value: string) { }
    }

    // Error
    class A_Method_StaticField {
        #foo() { }
        static #foo = "foo";
    }

    // Error
    class A_Method_StaticMethod {
        #foo() { }
        static #foo() { }
    }

    // Error
    class A_Method_StaticGetter {
        #foo() { }
        static get #foo() { return ""}
    }

    // Error
    class A_Method_StaticSetter {
        #foo() { }
        static set #foo(value: string) { }
    }
}


function Getter() {
    // Error
    class A_Getter_Field {
        get #foo() { return ""}
        #foo = "foo";
    }

    // Error
    class A_Getter_Method {
        get #foo() { return ""}
        #foo() { }
    }

    // Error
    class A_Getter_Getter {
        get #foo() { return ""}
        get #foo() { return ""}
    }

    //OK
    class A_Getter_Setter {
        get #foo() { return ""}
        set #foo(value: string) { }
    }

    // Error
    class A_Getter_StaticField {
        get #foo() { return ""}
        static #foo() { }
    }

    // Error
    class A_Getter_StaticMethod {
        get #foo() { return ""}
        static #foo() { }
    }

    // Error
    class A_Getter_StaticGetter {
        get #foo() { return ""}
        static get #foo() { return ""}
    }

    // Error
    class A_Getter_StaticSetter {
        get #foo() { return ""}
        static set #foo(value: string) { }
    }
}

function Setter() {
    // Error
    class A_Setter_Field {
        set #foo(value: string) { }
        #foo = "foo";
    }

    // Error
    class A_Setter_Method {
        set #foo(value: string) { }
        #foo() { }
    }

    // OK
    class A_Setter_Getter {
        set #foo(value: string) { }
        get #foo() { return ""}
    }

    // Error
    class A_Setter_Setter {
        set #foo(value: string) { }
        set #foo(value: string) { }
    }

    // Error
    class A_Setter_StaticField {
        set #foo(value: string) { }
        static #foo = "foo";
    }

    // Error
    class A_Setter_StaticMethod {
        set #foo(value: string) { }
        static #foo() { }
    }

    // Error
    class A_Setter_StaticGetter {
        set #foo(value: string) { }
        static get #foo() { return ""}
    }

    // Error
    class A_Setter_StaticSetter {
        set #foo(value: string) { }
        static set #foo(value: string) { }
    }
}

function StaticField() {
    // Error
    class A_StaticField_Field {
        static #foo = "foo";
        #foo = "foo";
    }

    // Error
    class A_StaticField_Method {
        static #foo = "foo";
        #foo() { }
    }

    // Error
    class A_StaticField_Getter {
        static #foo = "foo";
        get #foo() { return ""}
    }

    // Error
    class A_StaticField_Setter {
        static #foo = "foo";
        set #foo(value: string) { }
    }

    // Error
    class A_StaticField_StaticField {
        static #foo = "foo";
        static #foo = "foo";
    }

    // Error
    class A_StaticField_StaticMethod {
        static #foo = "foo";
        static #foo() { }
    }

    // Error
    class A_StaticField_StaticGetter {
        static #foo = "foo";
        static get #foo() { return ""}
    }

    // Error
    class A_StaticField_StaticSetter {
        static #foo = "foo";
        static set #foo(value: string) { }
    }
}

function StaticMethod() {
    // Error
    class A_StaticMethod_Field {
        static #foo() { }
        #foo = "foo";
    }

    // Error
    class A_StaticMethod_Method {
        static #foo() { }
        #foo() { }
    }

    // Error
    class A_StaticMethod_Getter {
        static #foo() { }
        get #foo() { return ""}
    }

    // Error
    class A_StaticMethod_Setter {
        static #foo() { }
        set #foo(value: string) { }
    }

    // Error
    class A_StaticMethod_StaticField {
        static #foo() { }
        static #foo = "foo";
    }

    // Error
    class A_StaticMethod_StaticMethod {
        static #foo() { }
        static #foo() { }
    }

    // Error
    class A_StaticMethod_StaticGetter {
        static #foo() { }
        static get #foo() { return ""}
    }

    // Error
    class A_StaticMethod_StaticSetter {
        static #foo() { }
        static set #foo(value: string) { }
    }
}

function StaticGetter() {

    // Error
    class A_StaticGetter_Field {
        static get #foo() { return ""}
        #foo = "foo";
    }

    // Error
    class A_StaticGetter_Method {
        static get #foo() { return ""}
        #foo() { }
    }

    // Error
    class A_StaticGetter_Getter {
        static get #foo() { return ""}
        get #foo() { return ""}
    }

    // Error
    class A_StaticGetter_Setter {
        static get #foo() { return ""}
        set #foo(value: string) { }
    }

    // Error
    class A_StaticGetter_StaticField {
        static get #foo() { return ""}
        static #foo() { }
    }

    // Error
    class A_StaticGetter_StaticMethod {
        static get #foo() { return ""}
        static #foo() { }
    }

    // Error
    class A_StaticGetter_StaticGetter {
        static get #foo() { return ""}
        static get #foo() { return ""}
    }
    // OK
    class A_StaticGetter_StaticSetter {
        static get #foo() { return ""}
        static set #foo(value: string) { }
    }
}

function StaticSetter() {
    // Error
    class A_StaticSetter_Field {
        static set #foo(value: string) { }
        #foo = "foo";
    }

    // Error
    class A_StaticSetter_Method {
        static set #foo(value: string) { }
        #foo() { }
    }


    // Error
    class A_StaticSetter_Getter {
        static set #foo(value: string) { }
        get #foo() { return ""}
    }

    // Error
    class A_StaticSetter_Setter {
        static set #foo(value: string) { }
        set #foo(value: string) { }
    }

    // Error
    class A_StaticSetter_StaticField {
        static set #foo(value: string) { }
        static #foo = "foo";
    }

    // Error
    class A_StaticSetter_StaticMethod {
        static set #foo(value: string) { }
        static #foo() { }
    }

    // OK
    class A_StaticSetter_StaticGetter {
        static set #foo(value: string) { }
        static get #foo() { return ""}
    }

    // Error
    class A_StaticSetter_StaticSetter {
        static set #foo(value: string) { }
        static set #foo(value: string) { }
    }
}
