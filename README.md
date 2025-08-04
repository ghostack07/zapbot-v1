# 🤖 ZapBot-V1 – Assistente Inteligente no WhatsApp

Um bot de atendimento via WhatsApp totalmente funcional, feito com **Node.js** e **whatsapp-web.js**, que envia **catálogo em PDF**, gera **link de pagamento via Mercado Pago**, responde automaticamente e simula atendimento profissional!

---

## 🚀 Funcionalidades

- ✅ Resposta automática para "Oi", "Bom dia", etc.
- ✅ Saudação personalizada usando o nome do cliente
- ✅ Envio de **catálogo em PDF**
- ✅ Menu de serviços com preços
- ✅ Geração automática de link de pagamento via **Mercado Pago**
- ✅ Mensagens animadas e organizadas
- ✅ Transferência para atendimento humano após pagamento

---

## 📦 Tecnologias Utilizadas

| Linguagem | Descrição                     |
|----------|-------------------------------|
| JavaScript | Linguagem base do projeto     |
| Node.js   | Ambiente de execução JS        |
| [whatsapp-web.js](https://github.com/pedroslopez/whatsapp-web.js) | Biblioteca principal para WhatsApp |
| axios     | Cliente HTTP para gerar links Mercado Pago |
| qrcode-terminal | Gera QR Code no terminal |
| Mercado Pago | Integração de pagamento     |

---

## 📂 Estrutura do Projeto

```bash
zapbot-v1/
├── index.js               # Código principal do bot
├── package.json           # Dependências e scripts
├── package-lock.json      # Versões exatas dos pacotes
├── CATALOGO.pdf           # Catálogo enviado aos clientes
└── .gitignore             # Ignora node_modules e dados de sessão
```

---

## ⚙️ Como Usar

### 1. Instale as dependências
```bash
npm install
```

### 2. Inicie o bot
```bash
node index.js
```

### 3. Escaneie o QR Code com seu WhatsApp  
E pronto! O bot estará ativo, respondendo seus clientes com estilo!

---

## 🛑 Importante

**NÃO suba a pasta `node_modules/` ou `.wwebjs_auth/` no GitHub.**  
Elas contêm arquivos grandes e dados sensíveis da sua sessão pessoal do WhatsApp.

---

## 📬 Contato

Dúvidas, ideias ou sugestões?  
📧 joaovictorbona06@gmail.com

---

Feito com 💻 por [João Victor](https://github.com/ghostack07)
