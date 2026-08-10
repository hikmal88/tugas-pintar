"use client";

export default function Error({ reset }: { reset: () => void }) {
  return <main style={{padding:40,fontFamily:"system-ui",textAlign:"center"}}><h1>Ada masalah.</h1><button onClick={reset}>Cuba lagi</button></main>;
}
