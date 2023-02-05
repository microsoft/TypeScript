type any1 = any;
type unknown1 = unknown;

function fn(x: boolean) {

    // no type annotation allowed other than `any` and `unknown`
    try { } catch (x) { } // should be OK
    try { } catch (x: any) { } // should be OK
    try { } catch (x: any1) { } // should be OK
    try { } catch (x: unknown) { } // should be OK
    try { } catch (x: unknown1) { } // should be OK
    try { } catch (x) { x.foo; } // should be OK
    try { } catch (x: any) { x.foo; } // should be OK
    try { } catch (x: any1) { x.foo; } // should be OK
    try { } catch (x: unknown) { console.log(x); } // should be OK
    try { } catch (x: unknown1) { console.log(x); } // should be OK
    try { } catch (x: unknown) { x.foo; } // error in the body
    try { } catch (x: unknown1) { x.foo; } // error in the body
    try { } catch (x: Error) { } // error in the type
    try { } catch (x: object) { } // error in the type

    try { console.log(); }
    // @ts-ignore
    catch (e: number) { // e should not be a `number`
        console.log(e.toLowerCase());
    }

    // minor bug: shows that the `catch` argument is skipped when checking scope
    try { } catch (x) { let x: string; }
    try { } catch (x) { var x: string; }
    try { } catch (x) { var x: boolean; }

    try { } catch ({ x }) { } // should be OK
    try { } catch ({ x }: any) { x.foo; } // should be OK
    try { } catch ({ x }: any1) { x.foo;} // should be OK
    try { } catch ({ x }: unknown) { console.log(x); } // error in the destructure
    try { } catch ({ x }: unknown1) { console.log(x); } // error in the destructure
    try { } catch ({ x }: object) { } // error in the type
    try { } catch ({ x }: Error) { } // error in the type
}
