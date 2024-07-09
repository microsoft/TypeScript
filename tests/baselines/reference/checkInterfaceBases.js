//// [tests/cases/compiler/checkInterfaceBases.ts] ////

//// [jquery.d.ts]
interface JQueryEventObjectTest {
    data: any;
    which: number;
    metaKey: any;
}

//// [app.ts]
///<reference path='jquery.d.ts' />
interface SecondEvent {
    data: any;
}
interface Third extends JQueryEventObjectTest, SecondEvent {}


//// [app.js]
///<reference path='jquery.d.ts' />
