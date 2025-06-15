 document.getElementById('form-animal').addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  const data = {
    nome: form.nome.value,
    especie: form.especie.value,
    raca: form.raca.value,
    idade: form.idade.value,
    dono: form.dono.value
  };

  try {
    const res = await fetch('http://localhost:3000/animais', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (res.ok) {
    
      window.location.href = 'registrar_servico.html';
    } else {
      alert('Erro ao cadastrar animal.');
    }
  } catch (err) {
    alert('Erro na requisição.');
    console.error(err);
  }
});
