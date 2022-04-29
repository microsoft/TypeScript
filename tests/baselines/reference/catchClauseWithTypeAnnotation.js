//// [catchClauseWithTypeAnnotation.ts]
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
    try { } catch ({ x }: unknown) { console.log(x); } // should be OK
    try { } catch ({ x }: unknown1) { console.log(x); } // should be OK
    try { } catch ({ x }: object) { } // error in the type
    try { } catch ({ x }: Error) { } // error in the type
}


//// [catchClauseWithTypeAnnotation.js]
function fn(x) {
    // no type annotation allowed other than `any` and `unknown`
    try { }
    catch (x) { } // should be OK
    try { }
    catch (x) { } // should be OK
    try { }
    catch (x) { } // should be OK
    try { }
    catch (x) { } // should be OK
    try { }
    catch (x) { } // should be OK
    try { }
    catch (x) {
        x.foo;
    } // should be OK
    try { }
    catch (x) {
        x.foo;
    } // should be OK
    try { }
    catch (x) {
        x.foo;
    } // should be OK
    try { }
    catch (x) {
        console.log(x);
    } // should be OK
    try { }
    catch (x) {
        console.log(x);
    } // should be OK
    try { }
    catch (x) {
        x.foo;
    } // error in the body
    try { }
    catch (x) {
        x.foo;
    } // error in the body
    try { }
    catch (x) { } // error in the type
    try { }
    catch (x) { } // error in the type
    try {
        console.log();
    }
    // @ts-ignore
    catch (e) { // e should not be a `number`
        console.log(e.toLowerCase());
    }
    // minor bug: shows that the `catch` argument is skipped when checking scope
    try { }
    catch (x) {
        var x_1;
    }
    try { }
    catch (x) {
        var x;
    }
    try { }
    catch (x) {
        var x;
    }
    try { }
    catch (_a) {
        var x_2 = _a.x;
    } // should be OK
    try { }
    catch (_b) {
        var x_3 = _b.x;
        x_3.foo;
    } // should be OK
    try { }
    catch (_c) {
        var x_4 = _c.x;
        x_4.foo;
    } // should be OK
    try { }
    catch (_d) {
        var x_5 = _d.x;
        console.log(x_5);
    } // should be OK
    try { }
    catch (_e) {
        var x_6 = _e.x;
        console.log(x_6);
    } // should be OK
    try { }
    catch (_f) {
        var x_7 = _f.x;
    } // error in the type
    try { }
    catch (_g) {
        var x_8 = _g.x;
    } // error in the type
}
