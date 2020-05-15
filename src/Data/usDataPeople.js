export async function getPeopleData() {
    let response = await fetch('https://shielded-refuge-08342.herokuapp.com/peoples/');
    let res = await response.json()
    console.log(res)
    return res
}