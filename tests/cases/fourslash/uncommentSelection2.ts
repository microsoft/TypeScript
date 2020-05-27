// Common uncomment jsx cases

//@Filename: file.tsx
//// const a = <MyContainer>
////     {/*<MyF[|irstComponent />*/}
////     {/*<MySec|]ondComponent />*/}
//// </MyContainer>;
//// 
//// const b = <div>
////     {/*[|<div>*/}
////         SomeText
////     {/*</div>|]*/}
//// </div>;
//// 
//// const c = <MyContainer>
////     [||]{/*<MyFirstComponent />*/}
//// </MyContainer>;


verify.uncommentSelection(
    `const a = <MyContainer>
    <MyFirstComponent />
    <MySecondComponent />
</MyContainer>;

const b = <div>
    <div>
        SomeText
    </div>
</div>;

const c = <MyContainer>
    <MyFirstComponent />
</MyContainer>;`);