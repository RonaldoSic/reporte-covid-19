
const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
const ruta = 'https://whispering-crag-35590.herokuapp.com/api/v1/cov19';
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
    // console.log(arrayData);
    return arrayData;    
}

export async function setPeopleData(data){

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authorization
        },
        body: data
    };
    fetch(proxyUrl+ruta, requestOptions)
        .then(response => response.json())
        .then(data => console.log(data));
}

