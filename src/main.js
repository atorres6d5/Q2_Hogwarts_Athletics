let devPath = 'http://localhost:3000/hogwarts'
let gryffCap = document.getElementById('gryffCap')

let captains = () => {
  axios.get(`${devPath}/teams/captains`)
  .then(result=>{
    // This wouldn't have worked because the variable name was wrong
    gryffCap.innerHTML = result
  })
}
