//@module: commonjs
// @Filename: jquery.d.ts
interface JQueryEventObjectTest {
    data: any;
    which: number;
    metaKey: any;
}

// @Filename: app.ts
///<reference path='jquery.d.ts' />
interface SecondEvent {
    data: any;
}
interface Third extends JQueryEventObjectTest, SecondEvent {}
