
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



//Tamaño del array
// console.log(Object.keys(objeto.data).length);

export async function setPeopleData(data){
    const objeto = await getPeopleData();

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authorization
        },
        body: JSON.stringify(data)
    };
    fetch(proxyUrl+ruta, requestOptions)
        .then(response => response.json())
        .then(data => console.log(data));
}

