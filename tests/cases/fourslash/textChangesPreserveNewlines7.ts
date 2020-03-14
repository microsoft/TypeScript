/// <reference path="fourslash.ts" />

// @Filename: /index.tsx

////[|function Foo({ label }: { label: string }) {
////  return (
////      <div
////          id="time-label-top-container">
////          <div
////              id="time-label-container"
////              style={{
////                  marginRight: '10px',
////                  border: 'none',
////              }}
////          >
////              <div className="currentTimeLabel">{label}</div>
////          </div>
////      </div>
////  );
////}|]

verify.moveToNewFile({
  newFileContents: {
    "/index.tsx": "",
    "/Foo.tsx":
`function Foo({ label }: { label: string; }) {
    return (
        <div
            id="time-label-top-container">
            <div
                id="time-label-container"
                style={{
                    marginRight: '10px',
                    border: 'none',
                }}
            >
                <div className="currentTimeLabel">{label}</div>
            </div>
        </div>
    );
}
`
  }
});
