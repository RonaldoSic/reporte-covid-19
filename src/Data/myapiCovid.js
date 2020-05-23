
// const url2 = 'https://jsonplaceholder.typicode.com/users';
export async function searchPeople(pais){
const url = `http://127.0.0.1:4000/api/personas/'${pais}'`;        
let res = await fetch(url);
let data = await res.json();
return data;
}

export async function searchWithBody(query){
    // const url = `http://127.0.0.1:4000/api/personas/`;
    const url = `https://mysterious-sea-15774.herokuapp.com/api/personas`
    let consulta = await fetch(url, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({            
            "edadMin": query.edadMin,
            'edadMax': query.edadMax,
            'buscarEsto' : query.buscarEsto,
            'opcionNum': query.opcionNum
        }),
        cache: 'no-cache'
    });
    let data = await consulta.json()
    return data; 
}
