// primitive types are identical to themselves so these overloads will all cause errors

function foo1(x: number);
function foo1(x: number);
function foo1(x: any) { }

function foo2(x: string);
function foo2(x: string);
function foo2(x: any) { }

function foo3(x: boolean);
function foo3(x: boolean);
function foo3(x: any) { }

function foo4(x: any);
function foo4(x: any);
function foo4(x: any) { }

function foo5(x: 'a');
function foo5(x: 'a');
function foo5(x: string);
function foo5(x: any) { }

enum E { A }
function foo6(x: E);
function foo6(x: E);
function foo6(x: any) { }

function foo7(x: void);
function foo7(x: void);
function foo7(x: any) { }