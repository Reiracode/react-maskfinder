const api = "https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json"

export const getData = () => {
    return new Promise(resolve => {
        fetch(api)
            .then(res => res.json())
            .then(json => {
                resolve(json.features)
            })
            .catch(err => console.log(err))
    })
}