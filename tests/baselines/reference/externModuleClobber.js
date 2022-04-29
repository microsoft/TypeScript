//// [externModuleClobber.ts]
declare module EM {
	export class Position { }

	export class EC {
		public getPosition() : EM.Position;
	}
}

var x:EM.Position;
var ec:EM.EC = new EM.EC();

x = ec.getPosition();


//// [externModuleClobber.js]
var x;
var ec = new EM.EC();
x = ec.getPosition();
