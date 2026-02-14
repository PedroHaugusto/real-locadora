// Menu Hamburger
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Scroll suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Header fixo com sombra ao rolar
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
    }
});

// Formulário de Reserva
const reservaForm = document.getElementById('reservaForm');

reservaForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const localRetirada = document.getElementById('localRetirada').value;
    const dataRetirada = document.getElementById('dataRetirada').value;
    const horarioRetirada = document.getElementById('horarioRetirada').value;
    const localDevolucao = document.getElementById('localDevolucao').value;
    const dataDevolucao = document.getElementById('dataDevolucao').value;
    const horarioDevolucao = document.getElementById('horarioDevolucao').value;
    const veiculo = document.getElementById('veiculo').value;
    const cadeirinha = document.getElementById('cadeirinha').checked;
    const condutorAdicional = document.getElementById('condutorAdicional').checked;
    
    // Validação básica
    if (!localRetirada || !dataRetirada || !horarioRetirada || !localDevolucao || !dataDevolucao || !horarioDevolucao) {
        alert('Por favor, preencha todos os campos obrigatórios!');
        return;
    }
    
    // Validar se a data de devolução é posterior à data de retirada
    const dataRet = new Date(dataRetirada + ' ' + horarioRetirada);
    const dataDev = new Date(dataDevolucao + ' ' + horarioDevolucao);
    
    if (dataDev <= dataRet) {
        alert('A data de devolução deve ser posterior à data de retirada!');
        return;
    }
    
    // Criar mensagem para WhatsApp
    let mensagem = `Olá! Gostaria de fazer uma cotação:\n\n`;
    mensagem += `📍 Local de Retirada: ${localRetirada}\n`;
    mensagem += `📅 Data de Retirada: ${formatarData(dataRetirada)} às ${horarioRetirada}\n\n`;
    mensagem += `📍 Local de Devolução: ${localDevolucao}\n`;
    mensagem += `📅 Data de Devolução: ${formatarData(dataDevolucao)} às ${horarioDevolucao}\n\n`;
    
    if (veiculo) {
        mensagem += `🚗 Veículo: ${veiculo}\n`;
    }
    
    if (cadeirinha || condutorAdicional) {
        mensagem += `\nOpcionais:\n`;
        if (cadeirinha) mensagem += `- Cadeirinha\n`;
        if (condutorAdicional) mensagem += `- Condutor Adicional\n`;
    }
    
    // Codificar mensagem para URL
    const mensagemCodificada = encodeURIComponent(mensagem);
    
    // Redirecionar para WhatsApp
    const numeroWhatsApp = '5583994129911';
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensagemCodificada}`;
    
    window.open(urlWhatsApp, '_blank');
});

// Função auxiliar para formatar data
function formatarData(data) {
    const partes = data.split('-');
    return `${partes[2]}/${partes[1]}/${partes[0]}`;
}

// Formulário de Contato
const contatoForm = document.getElementById('contatoForm');

if (contatoForm) {
    contatoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nome = e.target[0].value;
        const email = e.target[1].value;
        const telefone = e.target[2].value;
        const mensagem = e.target[3].value;
        
        let textoWhatsApp = `Olá! Meu nome é ${nome}.\n\n`;
        textoWhatsApp += `Email: ${email}\n`;
        textoWhatsApp += `Telefone: ${telefone}\n\n`;
        textoWhatsApp += `Mensagem: ${mensagem}`;
        
        const mensagemCodificada = encodeURIComponent(textoWhatsApp);
        const numeroWhatsApp = '5583994129911';
        const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensagemCodificada}`;
        
        window.open(urlWhatsApp, '_blank');
    });
}

// Animação ao rolar a página
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Aplicar animação aos cards
document.querySelectorAll('.vantagem-card, .carro-card, .dica-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
});