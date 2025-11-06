document.addEventListener("DOMContentLoaded", function() {

    // --- 1. LÓGICA DO GRÁFICO (VOLUME DE IMPRESSÃO) ---
    const ctx = document.getElementById('dailySalesChart').getContext('2d');

    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, 'rgba(0,123,255, 0.6)');
    gradient.addColorStop(1, 'rgba(0,123,255, 0.1)');

    const labels = ['29/10', '30/10', '31/10', '01/11', '02/11', '03/11', '04/11'];
    const printData = [150, 220, 180, 300, 250, 400, 310]; // Nº de páginas

    const dailySalesChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Páginas Impressas',
                data: printData,
                backgroundColor: gradient, 
                borderColor: 'rgba(0, 123, 255, 1)',
                borderWidth: 1,
                barThickness: 40 
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Nº de Páginas'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Data'
                    }
                }
            },
            plugins: {
                legend: {
                    display: false 
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                label += context.parsed.y + ' páginas';
                            }
                            return label;
                        }
                    }
                }
            }
        }
    });

    // --- 2. LÓGICA DO MENU "SANDUÍCHE" (PARA FECHAR A SIDEBAR) ---
    // (Esta é a função que você precisa)

    const menuToggle = document.querySelector('.menu-toggle');

    // Verifica se o botão foi encontrado antes de adicionar o evento
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            // Adiciona ou remove a classe 'sidebar-collapsed' no BODY
            document.body.classList.toggle('sidebar-collapsed');
        });
    } else {
        console.error("Erro: Botão .menu-toggle não foi encontrado.");
    }

// --- 3. LÓGICA DO MENU DE PERFIL (DROPDOWN) ---

// Pega o botão (ícone) e o conteúdo (dropdown)
const profileBtn = document.getElementById("profile-icon-btn");
const profileDropdown = document.getElementById("profile-dropdown-content");

// Adiciona o evento de CLIQUE no ícone
profileBtn.addEventListener("click", function(event) {
    // Impede que o clique "vaze" para a janela (necessário para o passo 2)
    event.stopPropagation();
    
    // Adiciona ou remove a classe "show" do menu
    profileDropdown.classList.toggle("show");
});

// Passo 2: Fecha o menu se o usuário clicar FORA dele
window.addEventListener("click", function(event) {
    // Verifica se o clique NÃO foi no dropdown
    if (!profileDropdown.contains(event.target)) {
        // E se o menu ESTÁ aberto (contém a classe 'show')
        if (profileDropdown.classList.contains("show")) {
            // Então, remove a classe 'show' (fecha o menu)
            profileDropdown.classList.remove("show");
        }
    }
});
});