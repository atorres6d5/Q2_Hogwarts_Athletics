let devPath = 'http://localhost:3000/hogwarts'

let tableBody = document.querySelector('#allData')
let newMatchButton = document.querySelector('#makeNewMatch')
let delButton = document.querySelector('#delButton')
let winButt
let winVal
let schedule = () =>{
  console.log('scheule is up to date!');
  axios.get(`${devPath}/Matches`)
  .then(result=>{
    tableBody.innerHTML = makeTableBody(result.data)
    winButt = document.querySelectorAll('.winner')
    //winVal = document.querySelector('#winVal')
    console.log(winButt)
    winButt.forEach(button=>{button.addEventListener('click', (event)=>{
      let id= event.target.id
      winVal = document.querySelector(`#winVal${id}`)
      console.log(id);
      axios.patch(`${devPath}/matches/${id}`, {winner:winVal.value}).then(result=>{
        schedule()
      })
    })})
  })
}
schedule()
let datetime = document.querySelector('#dateTime').value



let makeTableBody = (data)=>{
  //console.log(data)
  let html = ''
  data.forEach(row=>{
    if(row.winner===null){
      row.winner="TBD"
      html+= `<tr><th scope="row">${row.id}</th><td>${row.home_team}</td><td>${row.away_team}</td><td>${row.match_date}</td><td>${row.winner}</td><td><select id="winVal${row.id}"><option value=${row.homeTeamId}>${row.home_team}</option><option value=${row.awayTeamId}>${row.away_team}</option></select><br><button type="button" name="updateWinner" class="winner" id="${row.id}">Input Winner</button></td></tr>`
    }
    else{
      html += `<tr><th scope="row">${row.id}</th><td>${row.home_team}</td><td>${row.away_team}</td><td>${row.match_date}</td><td>${row.winner}</td><td></td></tr>`}
  })
  //console.log(stuff);
  return html
}

newMatchButton.addEventListener('click', ()=>{

  let home = document.querySelector('.homeTeam').value
  let away = document.querySelector('.awayTeam').value
  let datetime = document.querySelector('#dateTime').value
  let input = {
    home_team:home,
    away_team:away,
    match_date: dateTime.value
  }

  axios.post(`${devPath}/matches`, input)
  .then(result=> schedule())

})

delButton.addEventListener('click', ()=>{
  let matchID= document.querySelector('#matchID').value
  axios.delete(`${devPath}/matches/${matchID}`)
  .then(result=> schedule())
})
