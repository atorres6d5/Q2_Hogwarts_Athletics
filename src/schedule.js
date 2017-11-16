let devPath = 'http://localhost:3000/hogwarts'

let tableBody = document.querySelector('#allData')

console.log(tableBody);

let schedule = () =>{
  axios.get(`${devPath}/Matches`)
  .then(result=>{
  tableBody.innerHTML = makeTableBody(result.data)
  })
}

let makeTableBody = (data)=>{
  let stuff = ''
  data.forEach(row=>{
    stuff += `<tr><th scope="row">${row.id}</th><td>${row.home_team}</td><td>${row.away_team}</td><td>${row.winner}</td></tr>`
  })
  //console.log(stuff);
  return stuff
}

schedule()
