//@filename: file.tsx
//@jsx: react
declare module JSX {
	interface Element { }
	interface IntrinsicElements {
		[s: string]: any;
	}
}
declare var React: any;

// THIS FILE HAS TEST-SIGNIFICANT LEADING/TRAILING
// WHITESPACE, DO NOT RUN 'FORMAT DOCUMENT' ON IT

var p = 0;
// Emit "   "
<div>   </div>;
// Emit "  ", p, "   "
<div>  {p}    </div>;
// Emit only p
<div>  
      {p}    
      </div>;

// Emit only p
<div>
  {p}
    </div>;

// Emit "  3"
<div>  3  
  </div>;

// Emit "  3  "
<div>  3  </div>;

// Emit "3"
<div>   
   3    
   </div>;

// Emit no args
<div>   
   </div>;

// Emit "foo bar"
<div>  

   foo

 bar   

  </div>;

// Emit "hello\\ world"
<div>

    hello\

world
</div>;

// Emit "  a b  c d  "
<div>  a
    b  c
    d  </div>;
