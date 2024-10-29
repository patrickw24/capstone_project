let api= 'https://jhtgnvxxtcyogorozive.supabase.co/rest/v1/capstone_games'

let token= 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpodGdudnh4dGN5b2dvcm96aXZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg0MzU4NjIsImV4cCI6MjA0NDAxMTg2Mn0.O8nw_GS332iP89quZbi0YZkbEdRrnBYkHd2E4gLy3D8'

let modalPlatform
let selectedPlatforms = []

const createGame = async()=>{
    
    event.preventDefault()
    let title= inputTitle.value
    let genre= catGenre.value
    let rating= catRating.value
    let release_date= inputRelease.value
    


    let game = {
        title,
        genre,
        platforms: selectedPlatforms,
        rating,
        release_date
    }



    let response = await fetch(api,{
        method: 'POST',
        headers:{
            'apikey': token,
            'Authorization': token,
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(game)
    })

    if (response.ok){
        console.log("Game added")
        getGames()
    }else{
        let body = await response.json()
        console.log(body)
    }
}

const getGames = async()=> { 

    let response = await fetch(api,{
        method: 'GET',
        headers:{
            'apikey': token,
            'Authorization': token,
        },
    })

    let body = await response.json()

    if(response.ok){

        let tableLayout=`<tr>
            <th>Title</th>
            <th>Genre</th>
            <th>Platforms</th>
            <th>Rating</th>
            <th>Release Date</th>
        </tr>`

        for(let i = 0; i< body.length; i++){

            tableLayout+=`<tr>
            <td>${body[i].title}</td>
            <td>${body[i].genre}</td>
            <td><button class="btn btn-primary" onclick="tablePlatModal()">For Modal</button> </td>
            <td>${body[i].rating}</td>
            <td>${body[i].release_date}</td>
            </tr>`
        }
        gameTable.innerHTML = tableLayout
    }

}

const showPlatModal = ()=>{
    modalPlatform = new bootstrap.Modal(document.getElementById("platformModal"))

    modalPlatform.show()

}

const tablePlatModal = async()=>{

    tablePlatform = new bootstrap.Modal(document.getElementById("tablePlatModal"))

    tablePlatform.show()

}

const getPlatforms = async(id)=>{

     let url = `${api}?id=eq.${id}`

     
    let response = await fetch(url,{
        method: 'GET',
        headers:{
            'apikey': token,
            'Authorization': token,
        },
    })

    let data = await response.json()

    if(response.ok){
        renderList(data)

    }
}

const renderList = ()=>{

    for(let i=0; i < data.length; i++){
        listLayout += `<li>${data[i].platforms} </li>`
    }
}

const modelForm = ()=>{
    let 
}