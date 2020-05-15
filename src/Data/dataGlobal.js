export async function globalData() {
    let res = await fetch('https://api.covid19api.com/summary');
    let response = await res.json();
    const allData = [
        response.Global.NewConfirmed,
        response.Global.NewDeaths,
        response.Global.NewRecovered,
        response.Global.TotalDeaths,
        response.Global.TotalRecovered,
    ];
    const allLabels = [
        'Nuevos casos',
        'Nuevos recuperados',
        'Nuevos fallecidos',
        'Total fallecidos',
        'Total recuperados'
    ]
    const data = {
        labels: allLabels,
        datasets: [{
                label: 'Datos globales',
                data: allData,
                backgroundColor: [
                    '#dd52ba56',
                    '#3cc80056',
                    '#D3003956',
                    '#2a2a2a56',
                    '#0a429a56'
                ],
                borderColor: [
                    '#dd52ba',
                    '#3cc800',
                    '#D30039',
                    '#2a2a2a',
                    '#0a429a'
                ],
                borderWidth: 2
            }]
    };
    // allResponse ={labels:arrayDate, datasets:dataSet}
    // console.log(data);
    return data;
}