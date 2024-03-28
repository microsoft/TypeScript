//// [tests/cases/compiler/substitutionTypeNoMergeOfAssignableType.ts] ////

//// [substitutionTypeNoMergeOfAssignableType.ts]
interface Entry {
    comment?: string;
 }
 
 interface Entity {
     fields: {[key: string]: Entry};
 }
 
 type Fields<E extends Entity> = {
     [P in keyof E["fields"]]: E["fields"][P]
 };
 
 type Nodes<T = any> = {
     [P in keyof T]: T[P] extends Entity
         ? Fields<T[P]>
         : T[P]
 };
 
 function makeEntityStore<T extends Record<string, Entity>>(config: T): Nodes<T> {
     return {} as Nodes<T>
 }
 
 const myTest = makeEntityStore({ test: { fields: { id: {} } } });
 myTest.test
 

//// [substitutionTypeNoMergeOfAssignableType.js]
function makeEntityStore(config) {
    return {};
}
var myTest = makeEntityStore({ test: { fields: { id: {} } } });
myTest.test;
