
// ghostack07 zapibot - by Joao

const { Client, MessageMedia } = require('whatsapp-web.js');
const qrcodeTerminal = require('qrcode-terminal');
const axios = require('axios');
const fs = require('fs');

const client = new Client({
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

let nomeCliente = {}; // Armazena nome por ID do chat

client.on('qr', qr => {
    console.log('📲 Escaneie o QR code abaixo com o WhatsApp:');
    qrcodeTerminal.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('✅ Bot conectado com sucesso!');
});

client.on('message', async msg => {
    const chatId = msg.from;
    const texto = msg.body.toLowerCase().trim();

    // Detecta saudações e pede o nome
    if (['oi', 'olá', 'ola', 'bom dia', 'boa tarde', 'boa noite', 'iniciar', 'menu'].some(s => texto.includes(s))) {
        await client.sendMessage(chatId, '👋 Olá! Seja muito bem-vindo ao atendimento automático da *JVWeb Solutions* 🚀✨\n\nAntes de começarmos, qual é o seu *nome*?');
        nomeCliente[chatId] = null;
        return;
    }

    // Salva nome e envia serviços
    if (nomeCliente.hasOwnProperty(chatId) && !nomeCliente[chatId]) {
        const nome = msg.body.trim().split(' ')[0];
        nomeCliente[chatId] = nome;
        await client.sendMessage(chatId, `🔔 Perfeito, *${nome}*! Agora veja nossos principais serviços abaixo:`);
        await client.sendMessage(chatId,
`📋 *Lista de Serviços:*

2️⃣ 🤖 Robôs Automatizados  
3️⃣ 🧩 Plataformas Personalizadas  
4️⃣ 📈 Marketing Digital  
5️⃣ 📢 Tráfego Pago  
6️⃣ 💻 Criação de Sites

💬 *Responda com o número do serviço para iniciar!*
`);
        // Envia catálogo em PDF
        const pdf = MessageMedia.fromFilePath('./CATALOGO.pdf');
        await client.sendMessage(chatId, '📎 Enviando nosso catálogo completo em PDF...');
        await client.sendMessage(chatId, pdf);
        return;
    }

    // Catálogo manual (opcional)
    if (texto === '1' || texto.includes('catalogo') || texto.includes('catálogo')) {
        const pdf = MessageMedia.fromFilePath('./CATALOGO.pdf');
        await client.sendMessage(chatId, '📎 Enviando nosso catálogo em PDF...');
        await client.sendMessage(chatId, pdf);
        return;
    }

    // Serviços disponíveis
    const servicos = {
        "2": {
            nome: "🤖 Robôs Automatizados",
            descricao: "Automatize seu atendimento via WhatsApp, Telegram, Instagram ou outras plataformas. Ideal para empresas, vendas e suporte 24h!"
        },
        "3": {
            nome: "🧩 Plataformas Personalizadas",
            descricao: "Desenvolvemos plataformas sob medida para cursos, delivery, agendamentos, e qualquer necessidade do seu negócio."
        },
        "4": {
            nome: "📈 Marketing Digital",
            descricao: "Impulsione sua presença online com campanhas estratégicas e design profissional."
        },
        "5": {
            nome: "📢 Tráfego Pago",
            descricao: "Atraia mais clientes com anúncios otimizados no Google, Instagram e Facebook Ads."
        },
        "6": {
            nome: "💻 Criação de Sites",
            descricao: "Sites rápidos, responsivos, otimizados para SEO e com visual profissional."
        }
    };

    if (servicos[texto]) {
        const valor = 1.00;
        const servico = servicos[texto];

        await client.sendMessage(chatId,
`✨ *${servico.nome}*
${servico.descricao}

💲 Valor: *R$ ${valor.toFixed(2)}*`);

        try {
            const response = await axios.post('https://api.mercadopago.com/checkout/preferences', {
                items: [{
                    title: servico.nome,
                    quantity: 1,
                    currency_id: "BRL",
                    unit_price: valor
                }]
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer APP_USR-1696545884652699-072422-e297193f7399e558fa4c9f5fc78652a6-542937850'
                }
            });

            const link = response.data.init_point;
            await client.sendMessage(chatId,
`🧾 *Link de Pagamento Mercado Pago:*
${link}

✅ Após o pagamento, envie o comprovante neste chat para agilizar seu atendimento.`);

            setTimeout(() => {
                client.sendMessage(chatId, '👨‍💼 Agradecemos a preferência! Em breve um atendente continuará seu atendimento. 🕓');
            }, 5000);
        } catch (err) {
            console.error('Erro no pagamento:', err.response?.data || err.message);
            await client.sendMessage(chatId, '❌ Ocorreu um erro ao gerar o link de pagamento. Tente novamente mais tarde.');
        }
        return;
    }
});

client.initialize();
