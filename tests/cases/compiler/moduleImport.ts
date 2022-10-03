module A.B.C {
	import XYZ = X.Y.Z;
	export function ping(x: number) {
		if (x>0) XYZ.pong (x-1);
	}
}

module X {
	import ABC = A.B.C;
	export function pong(x: number) {
		if (x > 0) ABC.ping(x-1);
	}
}