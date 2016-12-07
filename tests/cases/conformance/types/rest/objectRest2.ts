// @lib: es2015
// @target: es2015
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
