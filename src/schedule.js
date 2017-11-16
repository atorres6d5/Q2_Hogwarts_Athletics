let devPath = 'http://localhost:3000/hogwarts'

let tableBody = document.querySelector('#allData')
let newMatchButton = document.querySelector('#makeNewMatch')
let delButton = document.querySelector('#delButton')

let schedule = () =>{
  console.log('scheule is up to date!');
  axios.get(`${devPath}/Matches`)
  .then(result=>{
  tableBody.innerHTML = makeTableBody(result.data)
  })
}
schedule()
let datetime = document.querySelector('#dateTime').value
console.log(dateTime.value);


let makeTableBody = (data)=>{
  let html = ''
  data.forEach(row=>{
    html += `<tr><th scope="row">${row.id}</th><td>${row.home_team}</td><td>${row.away_team}</td><td>${row.match_date}</td><td>${row.winner}</td></tr>`
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
