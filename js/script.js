
document.getElementById('clienteForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const nome = document.getElementById('nome').value;
    const telefone = document.getElementById('telefone').value;
    const endereco = document.getElementById('endereco').value;

    fetch('/clientes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, telefone, endereco })
    }).then(response => response.json())
      .then(cliente => {
         
          window.location.href = 'animais.html';
      });
});


document.getElementById('animalForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const nome = document.getElementById('nomeAnimal').value;
    const idade = document.getElementById('idade').value;
    const tipo = document.getElementById('tipo').value;
    const id_cliente = document.getElementById('dono').value;

    fetch('/animais', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, idade, tipo, id_cliente })
    }).then(response => response.json())
      .then(animal => {
          const animalItem = document.createElement('div');
          animalItem.textContent = `${animal.nome} - ${animal.idade} anos - ${animal.tipo}`;
          document.getElementById('animaisList').appendChild(animalItem);
      });
});

window.onload = function() {
    fetch('/clientes')
        .then(response => response.json())
        .then(clientes => {
            const donoSelect = document.getElementById('dono');
            clientes.forEach(cliente => {
                const option = document.createElement('option');
                option.value = cliente.id;
                option.textContent = cliente.nome;
                donoSelect.appendChild(option);
            });
        });
}
