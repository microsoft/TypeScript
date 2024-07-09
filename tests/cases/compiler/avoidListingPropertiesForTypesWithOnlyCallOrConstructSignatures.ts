interface Dog {
    barkable: true
}

declare function getRover(): Dog
    
export let x:Dog = getRover;
// export let x: Dog = getRover; 