//// [tests/cases/conformance/types/rest/objectRest2.ts] ////

//// [objectRest2.ts]
// test for #12203
declare function connectionFromArray(objects: number, args: any): {};
function rootConnection(name: string) {
  return {
    resolve: async (context, args) => {
        const { objects } = await { objects: 12 };
      return {
        ...connectionFromArray(objects, args)
      };
    }
  };
}
rootConnection('test');


//// [objectRest2.js]
function rootConnection(name) {
    return {
        resolve: async (context, args) => {
            const { objects } = await { objects: 12 };
            return {
                ...connectionFromArray(objects, args)
            };
        }
    };
}
rootConnection('test');
