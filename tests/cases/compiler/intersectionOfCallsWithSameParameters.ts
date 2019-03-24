// @strict: true

interface One {
    differentParameterType(id: string): { one: number };
    differentNumberOfParameters(id: string): { one: number };
    differentTypeParameterDefault<T = number>(id: string): { one: number };
    differentTypeParameterConstraint<T extends { one: number }>(id: string): { one: number };

    same1(id: string): { one: number };
    same2<T>(id: string): { one: number };
    same3<T extends { one: number }>(id: string): { one: number };
    same4<T = number>(id: string): { one: number };
    same5<T1 extends { one: number }, T2 = number>(id: string): { one: number };
}

interface Two {
    differentParameterType(id: number): { two: number };
    differentNumberOfParameters(id: string, second: string): { two: number };
    differentTypeParameterDefault<T = string>(id: string): { two: number };
    differentTypeParameterConstraint<T extends { two: number }>(id: string): { two: number };

    same1(id: string): { two: number };
    same2<T>(id: string): { two: number };
    same3<T extends { one: number }>(id: string): { two: number };
    same4<T = number>(id: string): { two: number };
    same5<T1 extends { one: number }, T2 = number>(id: string): { two: number };
}

const i: One & Two = <any>{};

// These lines should type check; the return type should be intersected.
const same1: { one: number, two: number } = i.same1('test');
const same2: { one: number, two: number } = i.same2<number>('test');
const same3: { one: number, two: number } = i.same3<{ one:number }>('test');
const same4: { one: number, two: number } = i.same4('test');
const same5: { one: number, two: number } = i.same5<{ one:number }, string>('test');

// These lines should not, because the functions should become overloads rather
// than the return types intersected.
const differentParameterType: { one: number, two: number } = i.differentParameterType('test');
const differentNumberOfParameters: { one: number, two: number } = i.differentNumberOfParameters('test');
const differentTypeParameterDefault: { one: number, two: number } = i.differentTypeParameterDefault('test');
const differentTypeParameterConstraint: { one: number, two: number } = i.differentTypeParameterConstraint<{ one: number }>('test');
