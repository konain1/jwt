

let url = 'https://fakerapi.com/api/v1/45767/userData'
function getAnimalData(){
    fetch(url).then((data)=>{
        
        data.json().then((finalData)=>{
            console.log(finalData)
        })
        
    })
}

getAnimalData()
