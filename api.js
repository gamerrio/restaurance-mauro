const API =""

get(API);
async function get(API){
    const x = await fetch(API);
    const y = JSON.parse(await x.text());
    console.log(y);
}