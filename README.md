# Convite de Casamento

Site de convite de casamento com sistema de RSVP integrado ao Firebase.

## Deploy no Vercel

### Opção 1: Deploy via GitHub (Recomendado)

1. **Criar repositório no GitHub:**
   - Acesse [github.com](https://github.com)
   - Clique em "New repository"
   - Nome: `convite-casamento`
   - Marque como público
   - Clique em "Create repository"

2. **Fazer upload dos arquivos:**
   - Na página do repositório criado, clique em "uploading an existing file"
   - Arraste todos os arquivos do projeto:
     - `index.html`
     - `style.css`
     - `script.js`
     - `Convite_Casamento.svg`
     - `vercel.json`
     - `firebase-config.js`
     - `firestore.rules`
   - Adicione uma mensagem de commit: "Initial commit"
   - Clique em "Commit changes"

3. **Deploy no Vercel:**
   - Acesse [vercel.com](https://vercel.com)
   - Faça login com sua conta GitHub
   - Clique em "New Project"
   - Selecione o repositório `convite-casamento`
   - Clique em "Deploy"
   - Aguarde o deploy finalizar

### Opção 2: Deploy Direto (Drag & Drop)

1. **Acesse o Vercel:**
   - Vá para [vercel.com](https://vercel.com)
   - Faça login ou crie uma conta

2. **Deploy por arrastar e soltar:**
   - Clique em "New Project"
   - Arraste a pasta do projeto para a área indicada
   - Aguarde o upload e deploy automático

## Configuração do Firebase

Após o deploy, verifique se:
- As configurações do Firebase estão corretas
- O domínio do Vercel está autorizado no Firebase Console
- As regras do Firestore estão aplicadas

## Funcionalidades

- ✅ Design responsivo para mobile
- ✅ Sistema de RSVP com Firebase
- ✅ Autocomplete de nomes
- ✅ Painel administrativo (Ctrl+Shift+A)
- ✅ Background SVG personalizado

## Tecnologias

- HTML5
- CSS3 (Responsivo)
- JavaScript (ES6+)
- Firebase Firestore
- Vercel (Hosting)