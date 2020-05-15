export async function byCountry (country) {
    let allResponse = {};
    let res = await fetch('https://api.covid19api.com//dayone/country/'+country);
    let data = await res.json();
    let nameCountry = data[0].Country;
    let arrayActivos = [];
    let arrayConfirmados = [];
    let arrayDate = [];
    let arrayMuertos = [];
    let arrayRecuperados = [];
    
    data.map(item => {
        arrayActivos.push(item.Active);
        arrayConfirmados.push(item.Confirmed);
        arrayDate.push(new Intl.DateTimeFormat('es-MX', {month:'long', day: 'numeric'}).format(new Date(item.Date)));
        arrayMuertos.push(item.Deaths);
        arrayRecuperados.push(item.Recovered);
        return ''
    })
    const dataSet = [
        {
            label:'Confirmados en '+nameCountry,
            borderColor:'#3864CB',
            data:arrayConfirmados
        },
        {
            label:'Activos en '+nameCountry,
            borderColor:'#5acf00',
            data:arrayActivos
        },
        {
            label:'Recuperados en '+nameCountry,
            borderColor:'#e02b91',
            data:arrayRecuperados
        },
        {
            label: "Fallecidos en "+nameCountry,
            borderColor: '#7a7a7a',
            data:arrayMuertos,
        }        
    ];
    allResponse ={labels:arrayDate, datasets:dataSet}
    return allResponse
}

export function searchCountry () {
    let nombres_paises = [
        "Spain", "France", "Mexico", "Brazil", "Belgium", 
        "Germany","Italy", "China", "United States of America",
        "Netherlands", "Croatia", "Colombia", "Bolivia", 
        "Costa Rica", "Panama", "Paraguay", "Uruguay", 
        "Ecuador","Nicaragua", "El Salvador", "Guatemala"];    
    return nombres_paises;
}