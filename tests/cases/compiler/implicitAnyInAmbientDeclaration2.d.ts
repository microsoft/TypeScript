//@noimplicitany: true
declare function foo(x);  // this should be an error
declare var bar;  // this should be be an erro
declare class C {
    public publicMember;  // this should be an error
    private privateMember;  // this should not be an error

    public publicFunction(x);  // this should be an error
    private privateFunction(privateParam);  // this should not be an error
    private constructor(privateParam);  // this should not be an error
}

declare class D {
    public constructor(publicConsParam, int: number);  // this should be an error
}