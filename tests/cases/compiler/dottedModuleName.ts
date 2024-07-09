module M {
    export module N {
	export function f(x:number)=>2*x;
	export module X.Y.Z {
	    export var v2=f(v);
	}
    }
}



module M.N {
    export module X {
	export module Y.Z {
	    export var v=f(10);
	}
    }
}
