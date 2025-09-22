//// [tests/cases/compiler/ambientStatement1.ts] ////

//// [ambientStatement1.ts]
    declare namespace M1 {
    	while(true);
    
    	export var v1 = () => false;
    }

//// [ambientStatement1.js]
