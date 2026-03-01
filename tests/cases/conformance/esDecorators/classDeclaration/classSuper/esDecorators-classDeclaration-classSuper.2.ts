// @target: es2022
// @noEmitHelpers: true
// @noTypesAndSymbols: true

declare var dec: any;

// class expression in extends should not get an assigned name
@dec
class C1 extends class { } {
    static {
        super.name;
    }
}

// function expression in extends should not get an assigned name
@dec
class C2 extends (function() {} as any) {
    static {
        super.name;
    }
}

// arrow function in extends should not get an assigned name
@dec
class C3 extends ((() => {}) as any) {
    static {
        super.name;
    }
}
