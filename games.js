let api = "https://jhtgnvxxtcyogorozive.supabase.co/rest/v1/capstone_games";

let token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpodGdudnh4dGN5b2dvcm96aXZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg0MzU4NjIsImV4cCI6MjA0NDAxMTg2Mn0.O8nw_GS332iP89quZbi0YZkbEdRrnBYkHd2E4gLy3D8";

let modalPlatform;

const createGame = async () => {
  event.preventDefault();
  let title = inputTitle.value;
  let genre = catGenre.value;
  let rating = catRating.value;
  let release_date = inputRelease.value;
  let added_by = window.localStorage.getItem("username")

  let psInput = document.getElementById("inputPS").checked;
  let xboxInput = document.getElementById("inputXBOX").checked;
  let nsInput = document.getElementById("inputNS").checked;
  let pcInput = document.getElementById("inputPC").checked;
  let mobileInput = document.getElementById("inputMB").checked;
  let otherInput = document.getElementById("inputOther").checked;

  let platforms = [
    { PlayStation: psInput },
    { Xbox: xboxInput },
    { Nintendo_Switch: nsInput },
    { PC: pcInput },
    { Mobile: mobileInput },
    { Other: otherInput },
  ];
  console.log(platforms);
  let game = {
    title,
    genre,
    platforms,
    rating,
    release_date,
    added_by
  };

  let response = await fetch(api, {
    method: "POST",
    headers: {
      apikey: token,
      Authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(game),
  });

  if (response.ok) {
    console.log("Game added");
   
  } else {
    let body = await response.json();
    console.log(body);
  }

  inputTitle.value=""
  catGenre.value= ""
  catRating.value= ""
  inputRelease.value= ""


};

const getGames = async () => {
  let response = await fetch(api, {
    method: "GET",
    headers: {
      apikey: token,
      Authorization: token,
    },
  });

  let body = await response.json();
  


  if (response.ok) {
    let tableLayout = `<tr>
            <th>Title</th>
            <th>Genre</th>
            <th>Platforms</th>
            <th>Rating</th>
            <th>Release Date</th>
            <th>Remove Game</th>
            <th>Added By</th>
        </tr>`;

    for (let i = 0; i < body.length; i++) {
      tableLayout += `<tr>
            <td>${body[i].title}</td>
            <td>${body[i].genre}</td>
            <td><button class="btn btn-primary" onclick="showTablePlatforms(${body[i].id})">Available Platforms</button> </td>
            <td>${body[i].rating}</td>
            <td>${body[i].release_date}</td>
            <td> <button onclick="deleteGame(${body[i].id})" class="btn btn-danger">Delete Game</button></td>
            <td> <p>Added By: ${body[i].added_by}</p> </td>
            </tr>`;
    }
    gameTable.innerHTML = tableLayout;
    
  }
};

const showPlatModal = () => {
  event.preventDefault();
  modalPlatform = new bootstrap.Modal(document.getElementById("platformModal"));

  modalPlatform.show();
};

const tablePlatModal = () => {
  event.preventDefault();
  tablePlatform = new bootstrap.Modal(
    document.getElementById("tablePlatModal")
  );

  tablePlatform.show();
};

const getPlatforms = async (id) => {
  let url = `${api}?id=eq.${id}`;

  console.log(id);
  let response = await fetch(url, {
    method: "GET",
    headers: {
      apikey: token,
      Authorization: token,
    },
  });

  let data = await response.json();

  if (response.ok) {
    let platforms = data[0].platforms;
    renderList(platforms);
  }
};

const renderList = (data) => {
  let listLayout = ``;

  console.log(data);
  if (data[0].PlayStation === true) {
    listLayout += `<li>Playstation</li>`;
  }
  if (data[1].Xbox === true) {
    listLayout += `<li>Xbox</li>`;
  }
  if (data[2].Nintendo_Switch === true) {
    listLayout += `<li>Nintendo Switch</li>`;
  }
  if (data[3].PC === true) {
    listLayout += `<li>PC</li>`;
  }
  if (data[4].Mobile === true) {
    listLayout += `<li>Mobile</li>`;
  }
  if (data[5].Other === true) {
    listLayout += `<li>Other</li>`;
  }

  platformList.innerHTML = listLayout;
  console.log(listLayout);
};

const closePlatModal = () => {
  modalPlatform.hide();
};

const showTablePlatforms = (id) => {
  getPlatforms(id);
  tablePlatModal();
};

const loadUser = () => {
  let username = window.localStorage.getItem("username");

  if (username) {
    userNameWall.innerHTML = `Welcome,${username}!`
    
  }else{
    userNameWall.innerHTML = ``
  }
};


const addTableUser = () =>{

    let username = window.localStorage.getItem("username")

    if (username){
        tableUser.innerHTML= `Added By:${username}`
    }else{
        tableUser.innerHTML= `Added By Guest`
    }
}

const deleteGame = async(id)=>{
    let url = `${api}?id=eq.${id}`;
    
        let response = await fetch(url,{
            method: 'DELETE',
            headers: {
                'apikey': token, 
                'Authorization': token,
            }
        })
    
        if(response.ok){
            getGames()
        }else{
            let responseStatus= await response.json()
            console.log(responseStatus)
        }

}

const contactMessage = ()=>{
    event.preventDefault()
    submitMessage.textContent = `Your message has been sent! Please allow 24-48 hours for a response. We value your feedback!`

    inputName.value= ""
    inputEmail.value= ""
    inputMessage.value= ""
}
