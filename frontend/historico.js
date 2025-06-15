
document.addEventListener('DOMContentLoaded', async () => {
  const select = document.getElementById('animalSelect');

  try {
    const res = await fetch('http://localhost:3000/animais');
    const animais = await res.json();

    animais.forEach(animal => {
      const option = document.createElement('option');
      option.value = animal.id;
      option.textContent = `${animal.nome} (${animal.especie})`;
      select.appendChild(option);
    });
  } catch (err) {
    console.error('Erro ao carregar animais:', err);
  }
});

async function carregarHistorico() {
  const animalId = document.getElementById('animalSelect').value;
  const lista = document.getElementById('listaHistorico');
  lista.innerHTML = '';

  try {
    const res = await fetch(`http://localhost:3000/animais/${animalId}/servicos`);
    const servicos = await res.json();

    if (servicos.length === 0) {
      lista.innerHTML = '<li>Nenhum serviço encontrado para este animal.</li>';
    } else {
      servicos.forEach(s => {
        const item = document.createElement('li');
        item.textContent = `${s.data}: ${s.tipo} - ${s.observacoes}`;
        lista.appendChild(item);
      });
    }
  } catch (err) {
    console.error('Erro ao carregar histórico:', err);
    lista.innerHTML = '<li>Erro ao buscar serviços.</li>';
  }
}


document.addEventListener('DOMContentLoaded', async () => {
  const select = document.getElementById('animalSelect');

  try {
    const res = await fetch('http://localhost:3000/animais');
    const animais = await res.json();

    animais.forEach(animal => {
      const option = document.createElement('option');
      option.value = animal.id;
      option.textContent = `${animal.nome} (${animal.especie})`;
      select.appendChild(option);
    });
  } catch (err) {
    console.error('Erro ao carregar animais:', err);
  }
});

async function carregarHistorico() {
  const animalId = document.getElementById('animalSelect').value;
  const lista = document.getElementById('listaHistorico');
  lista.innerHTML = '';

  try {
    const res = await fetch(`http://localhost:3000/animais/${animalId}/servicos`);
    const servicos = await res.json();

    if (servicos.length === 0) {
      lista.innerHTML = '<li>Nenhum serviço encontrado para este animal.</li>';
    } else {
      servicos.forEach(s => {
        const item = document.createElement('li');
        item.textContent = `${s.data}: ${s.tipo} - ${s.observacoes}`;
        lista.appendChild(item);
      });
    }
  } catch (err) {
    console.error('Erro ao carregar histórico:', err);
    lista.innerHTML = '<li>Erro ao buscar serviços.</li>';
  }
}
