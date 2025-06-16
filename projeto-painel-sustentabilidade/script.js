let dados = {
    energia: 50,
    agua: 40,
    luz: 60
};

let graficos = {};

window.onload = function() {
    criarGrafico('graficoEnergia', 'energia');
    criarGrafico('graficoAgua', 'agua');
    criarGrafico('graficoLuz', 'luz');
    atualizarAlertas();
};
// Faz a criação do gráfico.
function criarGrafico(canvasId, tipo) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    graficos[tipo] = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['% Atual'],
            datasets: [{
                label: `Nível de ${tipo}`,
                data: [dados[tipo]],
                backgroundColor: getCor(dados[tipo])
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            scales: {
                x: { min: 0, max: 100 }
            }
        }
    });
}
// Ajusta o gráfico e os dados.
function ajustar(tipo, valor) {
    dados[tipo] = Math.max(0, Math.min(100, dados[tipo] + valor));
    atualizarGrafico(tipo);
    atualizarAlertas();
}
// Atualiza o gráfico.
function atualizarGrafico(tipo) {
    graficos[tipo].data.datasets[0].data[0] = dados[tipo];
    graficos[tipo].data.datasets[0].backgroundColor = getCor(dados[tipo]);
    graficos[tipo].update();
}
// Adiciona cor ao grafico.
function getCor(valor) {
    if (valor >= 70) return 'rgba(220,20,60,0.7)';       // Vermelho
    if (valor <= 30) return 'rgba(30,144,255,0.7)';      // Azul
    return 'rgba(50,205,50,0.7)';                        // Verde
}
//Atualiza os alertas de consumos.
function atualizarAlertas() {
    document.getElementById('alertaEnergia').innerText = gerarMensagem('energia');
    document.getElementById('alertaAgua').innerText = gerarMensagem('agua');
    document.getElementById('alertaLuz').innerText = gerarMensagem('luz');
}
// Gera a mensagem de alerta.
function gerarMensagem(tipo) {
    let valor = dados[tipo];
    if (valor >= 70) return `⚠️ Consumo de ${tipo} muito alto!`;
    if (valor <= 30) return `⚠️ Consumo de ${tipo} muito baixo!`;
    return `Nível de ${tipo} dentro do ideal.`;
}
