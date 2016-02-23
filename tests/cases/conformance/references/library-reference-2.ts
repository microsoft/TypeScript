// @noImplicitReferences: true

// package.json in a primary reference can refer to another file

// @filename: typings/jquery/package.json
{
	"typings": "jquery.d.ts"
}

// @filename: typings/jquery/jquery.d.ts
declare var $: { foo(): void };


// @filename: consumer.ts
/// <reference library="jquery" />
$.foo();
