
const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
const ruta = 'https://whispering-crag-35590.herokuapp.com/api/v1/cov19/';
let authorization = 'Token 54cff33ba441ec3aeec3d444a6c2cf6ea653a76d';

export async function getPeopleData() {

    let response = await fetch(proxyUrl+ruta ,{
        method: 'GET',
        headers:{
            Authorization: authorization
        }
    });
    let res = await response.json();
    const arrayData = res.results;  
    console.log(arrayData);
    // console.log(typeof(arrayData),'Es ')
    return arrayData;    
}

console.log(getPeopleData())
export async function setPeopleData(data) {
    let taman = 0
    let lengthkey = await getPeopleData()
    lengthkey.map((item, index) => {
        if (index !== undefined) {
            taman = index
        }
        return ''
    })
    console.log(taman)
    fetch(proxyUrl + ruta, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Authorization: authorization
        },
        body:
            JSON.stringify({
                "code": taman + 1,
                "first_name": data.first_name,
                "last_name": data.last_name,
                "age": data.age,
                "gender": data.gender,
                "country": data.country,
                "department": data.department,
                "city": data.city
            })
    })
        .then(response => {
            console.log(response);
        })
        .catch(err => {
            console.log(err);
        });
}

