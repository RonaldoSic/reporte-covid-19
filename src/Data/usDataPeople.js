export async function getPeopleData() {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';    
    const ruta = 'https://whispering-crag-35590.herokuapp.com/api/v1/cov19';
    let response = await fetch(proxyUrl+ruta ,{
        method: 'GET',
        headers:{
            Authorization: 'Token 35d6b5cafec322b8792f4b5cfec55df900d5dd35'
        }
    });
    let res = await response.json();
    const arrayData = res.results;  
    // console.log(arrayData);
    return arrayData;    
}