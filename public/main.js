const update = document.querySelector('#update-button')

update.addEventListener('click', _ => {
    // this fetch triggers the put request because the method is put
    fetch('/quotes', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sets: req.body
      })
    }).then(res => {
        if (res.ok) return res.json()
      })
      .then(response => {
        window.location.reload()
      });
});

const deleteButton = document.querySelector('#delete-button')

deleteButton.addEventListener('click', _ => {

  fetch('/quotes', {
    method: 'delete',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Darth Vadar'
    })
  }).then(res => {
    if (res.ok) return res.json()
  })
  .then(data => {
    window.location.reload()
  });

});

const testButton = document.querySelector('#test-button')
testButton.addEventListener('click', _ => {
    document.getElementById("test-button").innerHTML = "Hello World";
  
    var para = document.createElement("p");
   var node = document.createTextNode("This is new.");
   para.appendChild(node);
   var element = document.getElementById("div1");
   element.appendChild(para);

});

// const addrow = document.querySelector('#add')
// addrow.addEventListener('click', _ => {
//   var table = document.getElementById(id);
//   var row = table.insertRow(0);
//   var cell1 = row.insertCell(0);
//   var cell2 = row.insertCell(1);
//   cell1.innerHTML = "NEW CELL1";
//   cell2.innerHTML = "NEW CELL2";
// });

// function myFunction(id) {
//   console.log(log);
//   var table = document.getElementById(id);
//   var row = table.insertRow(0);
//   var cell1 = row.insertCell(0);
//   var cell2 = row.insertCell(1);
//   cell1.innerHTML = "NEW CELL1";
//   cell2.innerHTML = "NEW CELL2";
// }  

function myFunction(name,job) {
  document.getElementById("demo").innerHTML = "Welcome " + name + ", the " + job + ".";
    console.log(job);
  var table = document.getElementById(job);
  var row = table.insertRow(0);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  cell1.innerHTML = "NEW CELL1";
  cell2.innerHTML = "m";

  cell1.setAttribute("id", job + "1");
  cell2.setAttribute("id", job + "2");

  var x = document.createElement("INPUT");
  x.setAttribute("type", "text");
  x.setAttribute("value", "Hello World!");
  document.body.appendChild(x);
  document.getElementById(cell1).appendChild(x);;
  document.getElementById(cell2).appendChild(x);;
};