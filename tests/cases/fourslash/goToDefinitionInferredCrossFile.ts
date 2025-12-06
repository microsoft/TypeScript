/// <reference path='fourslash.ts' />

// Test that inference works across multiple files

// @Filename: types.ts
////export interface /*interfaceDefinition*/User {
////    name: string;
////    age: number;
////}

// @Filename: namespace.ts
////export namespace /*namespaceDefinition*/User {
////    export const defaultUser = { name: "Anonymous", age: 0 };
////    export function create(name: string): User {
////        return { name, age: 0 };
////    }
////}

// @Filename: usage.ts
////import { User } from "./types";
////import { User as UserNS } from "./namespace";
////
////// Type position - should go to interface in types.ts
////function greet(user: /*typeUsage*/User): void {
////    console.log(`Hello, ${user.name}`);
////}
////
////// Value position - need to use the namespace import
////const defaultU = /*valueUsage*/UserNS.defaultUser;

goTo.marker("typeUsage");
verify.goToDefinitionInferredIndex("interfaceDefinition");

goTo.marker("valueUsage");
verify.goToDefinitionInferredIndex("namespaceDefinition");
