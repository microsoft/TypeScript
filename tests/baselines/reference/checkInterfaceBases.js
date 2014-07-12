//// [app.ts]
///<reference path='jquery.d.ts' />
interface SecondEvent {
    data: any;
}
interface Third extends JQueryEventObjectTest, SecondEvent {}


//// [app.js]
///<reference path='jquery.d.ts' />
