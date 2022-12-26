/// <reference path="fourslash.ts" />

////import {
////    Type1,
////    Type2,
////    func4,
////    Type3,
////    Type4,
////    Type5,
////    Type7,
////    Type8,
////    Type9,
////    func1,
////    func2,
////    Type6,
////    func3,
////    func5,
////    func6,
////    func7,
////    func8,
////    func9,
////} from "foo";
////interface Use extends Type1, Type2, Type3, Type4, Type5, Type6, Type7, Type8, Type9 {}
////console.log(func1, func2, func3, func4, func5, func6, func7, func8, func9);

verify.organizeImports(
`import {
    Type1,
    Type2,
    Type3,
    Type4,
    Type5,
    Type6,
    Type7,
    Type8,
    Type9,
    func1,
    func2,
    func3,
    func4,
    func5,
    func6,
    func7,
    func8,
    func9,
} from "foo";
interface Use extends Type1, Type2, Type3, Type4, Type5, Type6, Type7, Type8, Type9 {}
console.log(func1, func2, func3, func4, func5, func6, func7, func8, func9);`
);

verify.organizeImports(
`import {
    func1,
    func2,
    func3,
    func4,
    func5,
    func6,
    func7,
    func8,
    func9,
    Type1,
    Type2,
    Type3,
    Type4,
    Type5,
    Type6,
    Type7,
    Type8,
    Type9,
} from "foo";
interface Use extends Type1, Type2, Type3, Type4, Type5, Type6, Type7, Type8, Type9 {}
console.log(func1, func2, func3, func4, func5, func6, func7, func8, func9);`,
/*mode*/ undefined,
{ organizeImportsIgnoreCase: true });
