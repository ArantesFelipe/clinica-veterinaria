

document.addEventListener('DOMContentLoaded', async () => {
  const select = document.getElementById('animal_id');
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


document.getElementById('form-servico').addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  const data = {
    tipo: form.tipo.value,
    data: form.data.value,
    observacoes: form.observacoes.value,
    animal_id: form.animal_id.value
  };

  try {
    const res = await fetch('http://localhost:3000/servicos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (res.ok) {
    
      window.location.href = `historico.html?animal_id=${data.animal_id}`;
    } else {
      alert('Erro ao registrar serviço.');
    }
  } catch (err) {
    alert('Erro na requisição.');
    console.error(err);
  }
});
