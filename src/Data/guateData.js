export async function guateData () {
    let allResponse = {};
    let res = await fetch('https://api.covid19api.com/dayone/country/guatemala');
    let data = await res.json();
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
            label:'Confirmados',
            borderColor:'#e94C00',
            data:arrayConfirmados
        },
        {
            label:'Activos',
            borderColor:'#25c4AE',
            data:arrayActivos
        },
        {
            label:'Recuperados',
            borderColor:'#54a2cf',
            data:arrayRecuperados
        },
        {
            label: "Fallecidos",
            borderColor: '#e91100',
            data:arrayMuertos,
        }        
    ];
    allResponse ={labels:arrayDate, datasets:dataSet}
    // console.log(allResponse)
    return allResponse
}