console.log('sanity check')

 let oneTeam =(id)=>{
  axios.get(`${devPath}/teams/${id}`)
  .then(result=>{
    let teamPlayers = document.getElementById('players')
    teamPlayers.innerHTML = players(result.data)
    //console.log(result.data)
  })
 }

//oneTeam(1)

let players = (teamData)=>{
  let something = ''
  teamData.forEach(player=>{
     something += `<p>${player.player_name}</p>`
  })
  return something
}


// let players = (teamData)=>{
//   console.log(teamData)
// }

oneTeam(1)
