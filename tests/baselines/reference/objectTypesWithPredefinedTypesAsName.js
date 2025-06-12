//// [tests/cases/conformance/types/specifyingTypes/predefinedTypes/objectTypesWithPredefinedTypesAsName.ts] ////

//// [objectTypesWithPredefinedTypesAsName.ts]
// it is an error to use a predefined type as a type name

class any { }

class number { }

class boolean { }
class bool { } // not a predefined type anymore

class string { }




//// [objectTypesWithPredefinedTypesAsName.js]
// it is an error to use a predefined type as a type name
class any {
}
class number {
}
class boolean {
}
class bool {
} // not a predefined type anymore
class string {
}
