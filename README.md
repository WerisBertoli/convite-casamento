# Convite de Casamento

Site de convite de casamento com sistema de RSVP integrado ao Firebase.

## 🚀 Deploy no GitHub Pages

**✅ Já configurado! O site será publicado automaticamente.**

### Como ativar:

1. **Acesse as configurações do repositório:**
   - Vá para: https://github.com/WerisBertoli/convite-casamento
   - Clique em `Settings` (no menu superior)
   - No menu lateral, clique em `Pages`

2. **Configure o GitHub Pages:**
   - Em "Source", selecione `GitHub Actions`
   - Salve as configurações

3. **Deploy automático:**
   - O GitHub Actions já está configurado
   - A cada push na branch `main`, o site será atualizado automaticamente
   - Aguarde alguns minutos para o primeiro deploy

4. **URL do seu site:**
   ```
   https://werisbertoli.github.io/convite-casamento
   ```

## 📱 Funcionalidades

- ✅ Design responsivo para mobile
- ✅ Sistema de RSVP com Firebase
- ✅ Autocomplete de nomes
- ✅ Painel administrativo (Ctrl+Shift+A)
- ✅ Background SVG personalizado
- ✅ Deploy automático no GitHub Pages

## 🔧 Configuração do Firebase

Após o deploy, verifique se:
- As configurações do Firebase estão corretas
- O domínio `werisbertoli.github.io` está autorizado no Firebase Console
- As regras do Firestore estão aplicadas

### Autorizar domínio no Firebase:
1. Acesse [Firebase Console](https://console.firebase.google.com)
2. Selecione seu projeto
3. Vá em `Authentication` > `Settings` > `Authorized domains`
4. Adicione: `werisbertoli.github.io`

## 🛠️ Tecnologias

- HTML5
- CSS3 (Responsivo)
- JavaScript (ES6+)
- Firebase Firestore
- GitHub Pages (Hosting)
- GitHub Actions (CI/CD)

## 📝 Como atualizar o site

1. Faça as alterações nos arquivos localmente
2. Execute os comandos:
   ```bash
   git add .
   git commit -m "Descrição da alteração"
   git push origin main
   ```
3. O site será atualizado automaticamente em alguns minutos