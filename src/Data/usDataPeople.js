export async function getPeopleData() {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';    
    const ruta = 'https://whispering-crag-35590.herokuapp.com/api/v1/cov19/';
    let response = await fetch(proxyUrl+ruta ,{
        method: 'GET',
        headers:{
            Authorization: 'Token 568dfc805a989b7c9e02d7b54bc7a56b5fba27af'
        }
    });
    let res = await response.json();
    const arrayData = res.results;  
    // console.log(arrayData);
    return arrayData;    
}