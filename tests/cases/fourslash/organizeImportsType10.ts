/// <reference path="fourslash.ts" />

////import {
////    type Type1,
////    type Type2,
////    func4,
////    type Type3,
////    type Type4,
////    type Type5,
////    type Type7,
////    type Type8,
////    type Type9,
////    func1,
////    func2,
////    type Type6,
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
    type Type1,
    type Type2,
    type Type3,
    type Type4,
    type Type5,
    type Type6,
    type Type7,
    type Type8,
    type Type9,
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
console.log(func1, func2, func3, func4, func5, func6, func7, func8, func9);`,
/*mode*/ undefined,
{ organizeImportsIgnoreCase: true });
