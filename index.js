



function getAnimalData(url){
    fetch(url).then((data)=>{
        
        data.json().then((finalData)=>{
            console.log(finalData)
        })
        
    })
}

async function getAnimalData2(url){
    const response = await fetch(url)
    const final = await response.json();
    console.log(final)
}
getAnimalData2('https://fakerapi.com/api/v1/45767/userData')
