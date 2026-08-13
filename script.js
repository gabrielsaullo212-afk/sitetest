document.addEventListener('DOMContentLoaded', () => {

  // 1. EFEITO TYPING DE TEXTO DINÂMICO (INCLUI OS NOVOS MODELOS)
  const phrases = [
    "PET SHOPS & VETS",
    "BARBEARIAS & SALÕES",
    "OFICINAS MECÂNICAS",
    "LOJAS DE ELETRÔNICOS",
    "RESTAURANTES & PIZZARIAS",
    "ADVOGADOS",
    "LOJAS DE MÚSICA",
    "CONSTRUTORAS",
    "IMOBILIÁRIAS",
    "SUPERMERCADOS"
  ];

  let pIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingElement = document.getElementById('typing-text');

  function typeEffect() {
    const currentPhrase = phrases[pIndex];
    
    if (isDeleting) {
      typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
    }

    let speed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentPhrase.length) {
      speed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      pIndex = (pIndex + 1) % phrases.length;
      speed = 500;
    }

    setTimeout(typeEffect, speed);
  }

  typeEffect();

  // 2. FILTRO DE CATEGORIAS DO PORTFÓLIO
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.model-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      portfolioItems.forEach(item => {
        if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // 3. DADOS PARA O MODAL DEMO DE CADA MODELO DE SITE
  const demos = {
    musica: {
      title: "Loja de Instrumentos - Rock & Sound",
      desc: "E-commerce completo com catálogo de guitarras, amplificadores e áudio pro.",
      icon: "fa-guitar",
      color: "#4338ca",
      features: ["Carrinho via WhatsApp", "Filtro de Marcas", "Vídeo de Teste de Som"]
    },
    petshop: {
      title: "PetPaws - Pet Shop & Estética",
      desc: "Sistema de agendamento de banho e tosa online rápido e prático.",
      icon: "fa-paw",
      color: "#d97706",
      features: ["Agendamento Online", "Catálogo de Rações", "Táxi Dog"]
    },
    hair: {
      title: "BellaDonna - Hair & Beauty",
      desc: "Site glamouroso para salões de beleza e cabeleireiros de alto padrão.",
      icon: "fa-spa",
      color: "#db2777",
      features: ["Galeria de Fotos", "Tabela de Serviços", "Botão de Agendar"]
    },
    barbearia: {
      title: "BarberClub - Barbearia Moderna",
      desc: "Design exclusivo para barbearias masculinas com agendamento direto.",
      icon: "fa-cut",
      color: "#44403c",
      features: ["Escolha do Barbeiro", "Preços Claros", "Localização GPS"]
    },
    advocacia: {
      title: "Vanguard - Advocacia Especializada",
      desc: "Presença digital corporativa com foco em passar credibilidade e captar clientes.",
      icon: "fa-balance-scale",
      color: "#334155",
      features: ["Áreas de Atuação", "Consulta Rápida", "Artigos e Blog"]
    },
    vet: {
      title: "VetCare 24h - Hospital Veterinário",
      desc: "Focado em atendimentos de emergência e especialidades de saúde animal.",
      icon: "fa-user-md",
      color: "#059669",
      features: ["Emergência 1-Clique", "Corpo Médico", "Exames Online"]
    },
    mecanica: {
      title: "AutoDrive - Oficina Mecânica & Auto Center",
      desc: "Site otimizado para atração de clientes locais necessitando de reparos urgentes e revisões.",
      icon: "fa-wrench",
      color: "#dc2626",
      features: ["Orçamento de Serviços", "Botão Socorro 24h", "Agendamento de Revisão"]
    },
    eletronicos: {
      title: "TechFix - Assistência Técnica & Consertos",
      desc: "Portal para solicitação de diagnósticos em celulares, notebooks e placas.",
      icon: "fa-microchip",
      color: "#0284c7",
      features: ["Check-in de Aparelho", "Tabela de Serviços Rápida", "Suporte Direct via WhatsApp"]
    },
    restaurante: {
      title: "Sabor & Arte - Restaurante & Gastronomia",
      desc: "Cardápio digital visualmente impactante integrado com vendas diretas e reservas.",
      icon: "fa-utensils",
      color: "#d97706",
      features: ["Cardápio Digital Interativo", "Reservas de Mesa", "Módulo de Delivery via Whats"]
    },
    construcao: {
      title: "Apex - Construtora & Engenharia",
      desc: "Exibição de obras concluídas e solicitação de orçamentos de reformas.",
      icon: "fa-hard-hat",
      color: "#ea580c",
      features: ["Portfólio de Obras", "Calculadora de Reforma", "Certificações"]
    },
    imobiliaria: {
      title: "Prime Imóveis - Corretagem",
      desc: "Plataforma de anúncios de imóveis para compra, venda e aluguel.",
      icon: "fa-building",
      color: "#2563eb",
      features: ["Filtro por Bairro/Preço", "Fotos HD", "Contato Direto"]
    },
    supermercado: {
      title: "HiperMais - Mercado Digital",
      desc: "Encarte digital atualizado com promoções da semana e delivery local.",
      icon: "fa-shopping-basket",
      color: "#16a34a",
      features: ["Encarte de Ofertas", "Pedidos WhatsApp", "Lista de Compras"]
    }
  };

  // 4. ABRIR E FECHAR MODAL
  window.openDemo = function(key) {
    const data = demos[key];
    if (!data) return;

    const modal = document.getElementById('demoModal');
    const content = document.getElementById('modalContent');

    content.innerHTML = `
      <div style="text-align:center;">
        <i class="fas ${data.icon}" style="font-size:3.5rem; color:${data.color}; margin-bottom:15px;"></i>
        <h2>${data.title}</h2>
        <p style="color:#94a3b8; margin:10px 0 20px;">${data.desc}</p>
        
        <div style="background:rgba(255,255,255,0.05); padding:20px; border-radius:8px; text-align:left; margin-bottom:20px;">
          <h4 style="margin-bottom:10px; color:#4285f4;">Recursos Incluídos:</h4>
          <ul style="list-style:none;">
            ${data.features.map(f => `<li style="margin-bottom:8px;"><i class="fas fa-check-circle" style="color:#34a853; margin-right:8px;"></i>${f}</li>`).join('')}
          </ul>
        </div>

        <a href="https://wa.me/5561981065713?text=Quero%20comprar%20o%20modelo%20${encodeURIComponent(data.title)}" target="_blank" class="btn btn-google-green" style="width:100%; justify-content:center;">
          <i class="fab fa-whatsapp"></i> QUERO ESTE MODELO AGORA
        </a>
      </div>
    `;

    modal.style.display = 'flex';
  };

  window.closeDemo = function() {
    document.getElementById('demoModal').style.display = 'none';
  };

  // 5. MENU MOBILE
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // 6. CANVAS DE PARTÍCULAS EM MOVIMENTO
  const canvas = document.getElementById('particles-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];
    const numParticles = 50;

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2,
        radius: Math.random() * 2 + 1,
        color: ['#4285f4', '#ea4335', '#fbbc05', '#34a853'][Math.floor(Math.random() * 4)]
      });
    }

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.15 - dist / 800})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      requestAnimationFrame(animateParticles);
    }

    animateParticles();

    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  }
});