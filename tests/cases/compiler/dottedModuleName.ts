namespace M {
    export namespace N {
	export function f(x:number)=>2*x;
	export namespace X.Y.Z {
	    export var v2=f(v);
	}
    }
}



namespace M.N {
    export namespace X {
	export namespace Y.Z {
	    export var v=f(10);
	}
    }
}
