
// const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
// const ruta = 'http://localhost:4000/api/personas';
const ruta = `https://mysterious-sea-15774.herokuapp.com/api/personas`;

export async function getPeopleData() {
    // const ruta = `http://127.0.0.1:4000/api/personas`;
    const ruta =`https://mysterious-sea-15774.herokuapp.com/api/personas`
    const resp = await fetch(ruta);
    const arrayData = await resp.json();
    return arrayData;    
}

// console.log(getPeopleData())
export async function setPeopleData(data) {    
    fetch(ruta, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body:
            JSON.stringify({            
                "nombres": data.first_name,
                "apellidos": data.last_name,
                "edad": data.age,
                "genero": data.gender,
                "pais": data.country,
                "departamento": data.department,
                "municipio_ciudad": data.city
            })
    })
        .then(response => {
            // console.log(response);
        })
        .catch(err => {
            console.log(err);
        });
}

