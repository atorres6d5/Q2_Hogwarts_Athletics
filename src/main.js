console.log('sanity check')
let devPath = 'http://localhost:3000/hogwarts'
let gryffCap = document.getElementById('gryffCap')

let captains = () =>{
  axios.get(`${devPath}/teams/captains`)
  .then(result=>{
    gryffCap.innerHTML=reslut
    //console.log(result)
    //gryffCap.innerHTML = `${result.data[0]}`
  })
}

// let teamCap = (data)=>{
//   let something = ''
//   data.
//
// }



//  let oneTeam =(id)=>{
//   axios.get(`${devPath}/teams/${id}`)
//   .then(result=>{
//     let thisThing = document.getElementById('players')
//     thisThing.innerHTML = players(result.data)
//     //console.log(result.data)
//   })
//  }
//
// //oneTeam(1)
//
// let players = (teamData)=>{
//   let something = ''
//   teamData.forEach(player=>{
//      something += `<p>${player.player_name}</p>`
//   })
//   return something
// }
//
//
// // let players = (teamData)=>{
// //   console.log(teamData)
// // }
//
// oneTeam(1)
