const update = document.querySelector('#update-button')

update.addEventListener('click', _ => {
    fetch('/quotes', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Darth Vadar',
        quote: 'I find your lack of faith disturbing.'
      })
    }).then(res => {
        if (res.ok) return res.json()
      })
      .then(response => {
        window.location.reload(true)
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