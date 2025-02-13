function test_event(){
    var valor = document.querySelector("#input").value;
    fetch('/', { method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ valor })
    });
}
