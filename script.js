
const userName = ()=>{
    event.preventDefault()

    let username= inputUser.value
    window.localStorage.setItem('username',username)

    window.location = "games.html"

}