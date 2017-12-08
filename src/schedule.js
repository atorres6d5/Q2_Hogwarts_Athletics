let devPath = 'http://localhost:3000/hogwarts' // This will not work in production

let tableBody = document.querySelector('#allData')
let newMatchButton = document.querySelector('#makeNewMatch')
let delButton = document.querySelector('#delButton')
let winButt
let winVal

// In general your code spacing is all over the place. It makes it very
// difficult to read what's going on. you will _need_ to get better at
// this (or use some tooling!) before you graduate. You do not need
// to write code exactly like below but it should all be consistent!

// remove dead code and console.log statements!
let schedule = () => {
  axios.get(`${devPath}/Matches`)
  .then(result => {
    tableBody.innerHTML = makeTableBody(result.data)
    winButt = document.querySelectorAll('.winner')
    winButt.forEach(button => {
      button.addEventListener('click', (event) => {
        let id = event.target.id
        winVal = document.querySelector(`#winVal${id}`)
        axios.patch(`${devPath}/matches/${id}`, {winner:winVal.value}).then(result => {
          schedule()
        })
      })
    })
  })
}

schedule()

// this is only going to happen once, when your page loads.
// it doesn't look like you are using this, though?
let datetime = document.querySelector('#dateTime').value

let makeTableBody = (data) => {
  let html = ''
  data.forEach(row => {
    if (row.winner === null) {
      row.winner = "TBD"
      // these long strings can and probably should be in their own file
      html += `<tr><th scope="row">${row.id}</th><td>${row.home_team}</td><td>${row.away_team}</td><td>${row.match_date}</td><td>${row.winner}</td><td><select id="winVal${row.id}"><option value=${row.homeTeamId}>${row.home_team}</option><option value=${row.awayTeamId}>${row.away_team}</option></select><br><button type="button" name="updateWinner" class="winner" id="${row.id}">Input Winner</button></td></tr>`
    } else {
      html += `<tr><th scope="row">${row.id}</th><td>${row.home_team}</td><td>${row.away_team}</td><td>${row.match_date}</td><td>${row.winner}</td><td></td></tr>`
    }
  })
  
  return html
}

newMatchButton.addEventListener('click', () => {
  let home = document.querySelector('.homeTeam').value
  let away = document.querySelector('.awayTeam').value
  let datetime = document.querySelector('#dateTime').value

  let input = {
    home_team: home,
    away_team: away,
    match_date: dateTime.value
  }

  axios.post(`${devPath}/matches`, input)
  .then(result => schedule())
})

delButton.addEventListener('click', () => {
  let matchID = document.querySelector('#matchID').value
  axios.delete(`${devPath}/matches/${matchID}`)
  .then(result => schedule())
})
