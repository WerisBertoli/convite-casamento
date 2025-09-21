// Lista de nomes para autocomplete - Casamento (Espírito Santo + Goiânia)
const listaNomes = [
    // Espírito Santo
    'Wesley', 'Leila', 'Nathiely', 'Nathan', 'Camila', 'Edjane', 'Cilas', 'João Lucas',
    'Kamily', 'João Marcos', 'Wellington', 'Alice', 'Maria Eloisa', 'Korrinna', 'Penha',
    'Narciso', 'Anatilde', 'Jose', 'Dheyner', 'Ricardo', 'Rodrigo', 'Ana Julia',
    'Thauana', 'Bruna', 'Zezim', 'Sandra', 'Juraci', 'Servolo', 'Charles', 'Sueli',
    'Eduardo', 'Lisley', 'Silvio', 'Simone', 'Bryan', 'Kethelyn',
    'Leandro', 'Nilza', 'Hulyana', 'Leonardo', 'João Victor', 'Ana Claudia', 'Ilza De Souza', 'Luca', 'Laíssa Soares', 'Luiz De Souza', 
    
    // Goiânia
    'Helena', 'Antônio', 'Milene', 'Eduarda', 'Marcos', 'Liciene', 'Dudu',
    'Douglas', 'Lucas', 'Vilma', 'Marisa', 'Carlos', 'Alexya', 'Carol',
    'Neison', 'Moises', 'Simon', 'Benedito', 'Ilza Nunes', 'Breno', 'Rabeche',
    'Maria Julia', 'Augusto', 'Italo', 'Delandia', 'Nazaré', 'Gabriel',
    'Mariana', 'Belchior', 'Dark', 'Giovana', 'Wallace', 'Monique', 'Lucia',
    'Juliana', 'Leo', 'Gabriela', 'Sandro', 'Davi', 'Gislaine', 'Israel',
    'Fernanda', 'Junim', 'Marcelo', 'Vitoria', 'Jose Henrique', 'Jose Eloi',
    'Beni', 'Renata', 'Guilherme', 'Luiz Neto', 'Luiz', 'Valeria',
    'Jose Junior', 'Janaina', 'Beatriz', 'Davi Eloi', 'Varlene', 'Sayonara',
    'Antonio Filho', 'Thalys', 'Abio', 'Ayte', 'Abadia', 'Ilda', 'Fatima',
    'Selma', 'Regina', 'Cleyton', 'Wivian', 'Caio', 'Manuela'
];

// Aguarda o carregamento completo da página
document.addEventListener('DOMContentLoaded', function() {
    console.log('Página simples carregada!');
    
    const frase = document.querySelector('.frase');
    const campo = document.getElementById('campo-principal');
    
    // Esconder frase quando começar a digitar
    campo.addEventListener('input', function() {
        if (this.value.length > 0) {
            frase.classList.add('escondida');
        } else {
            frase.classList.remove('escondida');
        }
    });
    
    // Esconder frase quando focar no campo
    campo.addEventListener('focus', function() {
        if (this.value.length > 0) {
            frase.classList.add('escondida');
        }
    });
    
    // Inicializa funcionalidade do campo principal
    initCampoPrincipal();
    
    // Inicializa autocomplete
    initAutocomplete();
    
    // Inicializa funcionalidade de RSVP
    initRSVP();
    
    // Inicializa painel de administração
    initAdmin();
});

// Funcionalidade do campo de input principal
function initCampoPrincipal() {
    const campo = document.getElementById('campo-principal');
    
    // Foco automático no campo quando a página carrega
    campo.focus();
    
    // Evento de digitação
    campo.addEventListener('input', function() {
        const valor = this.value;
        console.log('Digitado:', valor);
        
        // Efeito visual baseado no comprimento do texto
        if (valor.length > 0) {
            this.style.boxShadow = '0 15px 50px rgba(102, 126, 234, 0.3)';
        } else {
            this.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // Evento de pressionar Enter
    campo.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const valor = this.value.trim();
            
            if (valor) {
                mostrarMensagem(`Você digitou: "${valor}"`);
                this.value = ''; // Limpa o campo
                this.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
            }
        }
    });
    
    // Efeito de animação no foco
    campo.addEventListener('focus', function() {
        this.style.transform = 'translateY(-2px) scale(1.02)';
    });
    
    campo.addEventListener('blur', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
}

// Função para mostrar mensagem temporária
function mostrarMensagem(texto) {
    const mensagem = document.createElement('div');
    mensagem.innerHTML = `
        <div style="
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(255, 255, 255, 0.95);
            color: #333;
            padding: 15px 30px;
            border-radius: 25px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            z-index: 10000;
            text-align: center;
            font-size: 1rem;
            backdrop-filter: blur(10px);
            animation: slideDown 0.3s ease;
        ">
            ${texto}
        </div>
    `;
    
    // Adiciona animação CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateX(-50%) translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateX(-50%) translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(mensagem);
    
    // Remove a mensagem após 3 segundos
    setTimeout(() => {
        mensagem.style.animation = 'slideDown 0.3s ease reverse';
        setTimeout(() => {
            if (document.body.contains(mensagem)) {
                document.body.removeChild(mensagem);
            }
            if (document.head.contains(style)) {
                document.head.removeChild(style);
            }
        }, 300);
    }, 3000);
}

// Função para inicializar o autocomplete
function initAutocomplete() {
    const campo = document.getElementById('campo-principal');
    let listaSugestoes = null;
    let indiceSelecionado = -1;
    
    // Criar lista de sugestões
    function criarListaSugestoes() {
        if (listaSugestoes) return;
        
        listaSugestoes = document.createElement('div');
        listaSugestoes.className = 'autocomplete-lista';
        listaSugestoes.style.display = 'none';
        
        // Inserir no container pai (input-container)
        const container = campo.parentNode;
        container.appendChild(listaSugestoes);
    }
    
    // Filtrar e mostrar sugestões
    function mostrarSugestoes(texto) {
        if (!texto || texto.length < 1) {
            esconderSugestoes();
            return;
        }
        
        const sugestoesFiltradas = listaNomes.filter(nome => 
            nome.toLowerCase().includes(texto.toLowerCase())
        ).slice(0, 5); // Máximo 5 sugestões
        
        if (sugestoesFiltradas.length === 0) {
            esconderSugestoes();
            return;
        }
        
        listaSugestoes.innerHTML = '';
        indiceSelecionado = -1;
        
        sugestoesFiltradas.forEach((nome, index) => {
            const item = document.createElement('div');
            item.className = 'autocomplete-item';
            item.textContent = nome;
            
            // Destacar texto correspondente
            const regex = new RegExp(`(${texto})`, 'gi');
            item.innerHTML = nome.replace(regex, '<strong>$1</strong>');
            
            item.addEventListener('click', () => {
                campo.value = nome;
                esconderSugestoes();
                campo.focus();
                // Abrir modal de RSVP após selecionar nome
                if (window.abrirModalRSVP) {
                    window.abrirModalRSVP(nome);
                } else {
                    console.error('Função abrirModalRSVP não encontrada');
                }
            });
            
            listaSugestoes.appendChild(item);
        });
        
        listaSugestoes.style.display = 'block';
    }
    
    // Esconder sugestões
    function esconderSugestoes() {
        if (listaSugestoes) {
            listaSugestoes.style.display = 'none';
            indiceSelecionado = -1;
        }
    }
    
    // Navegar com teclado
    function navegarSugestoes(direcao) {
        const itens = listaSugestoes.querySelectorAll('.autocomplete-item');
        if (itens.length === 0) return;
        
        // Remover seleção anterior
        if (indiceSelecionado >= 0) {
            itens[indiceSelecionado].classList.remove('selecionado');
        }
        
        // Calcular novo índice
        if (direcao === 'baixo') {
            indiceSelecionado = (indiceSelecionado + 1) % itens.length;
        } else if (direcao === 'cima') {
            indiceSelecionado = indiceSelecionado <= 0 ? itens.length - 1 : indiceSelecionado - 1;
        }
        
        // Aplicar nova seleção
        itens[indiceSelecionado].classList.add('selecionado');
    }
    
    // Selecionar item atual
    function selecionarItem() {
        const itens = listaSugestoes.querySelectorAll('.autocomplete-item');
        if (indiceSelecionado >= 0 && itens[indiceSelecionado]) {
            const nomeEscolhido = itens[indiceSelecionado].textContent;
            campo.value = nomeEscolhido;
            esconderSugestoes();
            // Abrir modal de RSVP após selecionar nome via teclado
            if (window.abrirModalRSVP) {
                window.abrirModalRSVP(nomeEscolhido);
            } else {
                console.error('Função abrirModalRSVP não encontrada');
            }
            return true;
        }
        return false;
    }
    
    // Eventos
    criarListaSugestoes();
    
    campo.addEventListener('input', function() {
        mostrarSugestoes(this.value);
    });
    
    campo.addEventListener('keydown', function(e) {
        if (listaSugestoes && listaSugestoes.style.display === 'block') {
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                navegarSugestoes('baixo');
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                navegarSugestoes('cima');
            } else if (e.key === 'Enter') {
                if (selecionarItem()) {
                    e.preventDefault();
                }
            } else if (e.key === 'Escape') {
                esconderSugestoes();
            }
        }
    });
    
    // Esconder ao clicar fora
    document.addEventListener('click', function(e) {
        if (!campo.contains(e.target) && !listaSugestoes.contains(e.target)) {
            esconderSugestoes();
        }
    });
}

// Função para inicializar funcionalidade de RSVP
function initRSVP() {
    const nomesClicaveis = document.getElementById('nomes-clicaveis');
    const modalRSVP = document.getElementById('modal-rsvp');
    const btnConfirmar = document.getElementById('btn-confirmar');
    const btnDeclinar = document.getElementById('btn-declinar');
    const btnFechar = document.getElementById('btn-fechar');
    
    console.log('Inicializando RSVP...');
    console.log('Modal encontrado:', modalRSVP);
    console.log('Botão confirmar encontrado:', btnConfirmar);
    console.log('Botão declinar encontrado:', btnDeclinar);
    
    if (!modalRSVP || !btnConfirmar || !btnDeclinar || !btnFechar) {
        console.error('Elementos do modal não encontrados!');
        return;
    }
    
    // Verificar se já existe uma resposta salva
    verificarRespostaSalva();
    
    // Função para fechar modal
    window.fecharModalRSVP = function() {
        modalRSVP.style.display = 'none';
        document.body.style.overflow = 'auto';
        console.log('Modal fechado');
    };
    
    // Função para abrir modal
    window.abrirModalRSVP = async function(nomeConvidado) {
        console.log('Abrindo modal para:', nomeConvidado);
        window.nomeConvidadoAtual = nomeConvidado;
        
        // Verificar se já confirmou presença no Firebase
        const jaConfirmou = await verificarConfirmacaoPrevia(nomeConvidado);
        
        if (jaConfirmou) {
            mostrarMensagemRSVP('✨ Sua presença já foi confirmada! Obrigado! 💕', 'sucesso');
            return;
        }
        
        modalRSVP.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    };
    
    // Funcionalidade de clique nos nomes removida conforme solicitado
    // nomesClicaveis.addEventListener('click', function() {
    //     window.abrirModalRSVP('Noivos');
    // });
    
    // Eventos de fechar modal
    btnFechar.addEventListener('click', window.fecharModalRSVP);
    
    // Fechar modal ao clicar no fundo
    modalRSVP.addEventListener('click', function(e) {
        if (e.target === modalRSVP) {
            window.fecharModalRSVP();
        }
    });
    
    // Fechar modal com tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modalRSVP.style.display === 'flex') {
            window.fecharModalRSVP();
        }
    });
    
    // Confirmar presença
    btnConfirmar.addEventListener('click', async function() {
        console.log('Botão confirmar clicado');
        const nomeConvidado = window.nomeConvidadoAtual || 'Convidado';
        await salvarRespostaFirestore(nomeConvidado, 'confirmado');
    });
    
    // Declinar presença
    btnDeclinar.addEventListener('click', async function() {
        console.log('Botão declinar clicado');
        const nomeConvidado = window.nomeConvidadoAtual || 'Convidado';
        await salvarRespostaFirestore(nomeConvidado, 'declinado');
    });
}

// Função abrirModalRSVP agora está definida dentro de initRSVP como window.abrirModalRSVP

// Função para verificar se o convidado já confirmou presença no Firestore
async function verificarConfirmacaoPrevia(nomeConvidado) {
    try {
        if (!window.firebaseDB) {
            console.warn('Firebase não inicializado, aplicando regras do firestore.rules');
            return false;
        }
        
        const q = window.firebaseQuery(
            window.firebaseCollection(window.firebaseDB, 'rsvp'),
            window.firebaseWhere('nome', '==', nomeConvidado.toLowerCase().trim())
        );
        
        const querySnapshot = await window.firebaseGetDocs(q);
        
        if (!querySnapshot.empty) {
            console.log('✅ Confirmação encontrada no banco de dados para:', nomeConvidado);
            return true;
        }
        
        return false;
    } catch (error) {
        console.error('Erro ao verificar confirmação prévia no Firebase:', error);
        console.warn('⚠️ Verifique se as regras do Firestore estão aplicadas corretamente');
        return false;
    }
}

// Função para salvar resposta no Firebase
async function salvarRespostaFirestore(nomeConvidado, resposta) {
    try {
        // ✅ FIREBASE ATIVO - Sistema de banco de dados funcionando
        console.log('🔥 Firebase ativo - salvando no banco de dados');
        console.log('💾 Iniciando salvamento da resposta no Firebase...');
        
        // Verificar se Firebase está disponível
        if (!window.firebaseDB || !window.firebaseAddDoc || !window.firebaseCollection) {
            throw new Error('Firebase não inicializado. Verifique as regras do Firestore.');
        }
        
        // Verificar novamente se já confirmou (dupla verificação)
        const jaConfirmou = await verificarConfirmacaoPrevia(nomeConvidado);
        if (jaConfirmou) {
            mostrarMensagemRSVP('✨ Sua presença já foi confirmada anteriormente! 💕', 'sucesso');
            window.fecharModalRSVP();
            return;
        }
        
        // Dados para salvar no Firebase
        const dadosFirebase = {
            nome: nomeConvidado.toLowerCase().trim(),
            resposta: resposta,
            dataResposta: new Date().toISOString(),
            timestamp: Date.now(),
            ip: await obterIP()
        };
        
        console.log('💾 Salvando no Firebase:', dadosFirebase);
        await window.firebaseAddDoc(window.firebaseCollection(window.firebaseDB, 'rsvp'), dadosFirebase);
        console.log('✅ Dados salvos com sucesso no Firebase');
        
        // Mostrar mensagem de sucesso
        if (resposta === 'confirmado') {
            mostrarMensagemRSVP('✨ Presença confirmada e salva no banco de dados! Obrigado! 💕', 'sucesso');
        } else {
            mostrarMensagemRSVP('😔 Resposta salva no banco de dados. Que pena que não poderá comparecer! 💙', 'info');
        }
        
        console.log('✅ Resposta salva com sucesso no banco de dados');
        window.fecharModalRSVP();
        
    } catch (error) {
        console.error('❌ Erro ao salvar resposta no Firebase:', error);
        
        // Mostrar mensagem de erro específica
        if (error.message.includes('Firebase não inicializado')) {
            mostrarMensagemRSVP('⚠️ Erro: Sistema de banco de dados não disponível. Contate os noivos.', 'erro');
        } else if (error.code === 'permission-denied') {
            mostrarMensagemRSVP('⚠️ Erro: Permissões do banco de dados expiradas. Contate os noivos.', 'erro');
        } else {
            mostrarMensagemRSVP('❌ Erro ao salvar no banco de dados. Tente novamente.', 'erro');
        }
        
        console.log('❌ Falha ao salvar no banco de dados');
        window.fecharModalRSVP();
    }
}

// Função auxiliar para obter IP (opcional)
async function obterIP() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch (error) {
        return 'unknown';
    }
}

// Função salvarResposta removida - agora salvamos diretamente no Firebase

// Função para verificar respostas salvas no Firebase (não é mais necessária)
// A verificação agora é feita diretamente quando o usuário seleciona um nome
function verificarRespostaSalva() {
    // Esta função foi removida pois agora verificamos diretamente no Firebase
    // quando o usuário seleciona um nome no autocomplete
    console.log('Sistema agora verifica diretamente no banco de dados Firebase');
}

// Função para obter todas as respostas salvas do Firebase (para administração)
async function obterRespostasFirebase() {
    try {
        if (!window.firebaseDB) {
            console.warn('Firebase não disponível');
            return [];
        }
        
        const querySnapshot = await window.firebaseGetDocs(
            window.firebaseCollection(window.firebaseDB, 'rsvp')
        );
        
        const respostas = [];
        querySnapshot.forEach((doc) => {
            respostas.push({ id: doc.id, ...doc.data() });
        });
        
        return respostas;
    } catch (error) {
        console.error('Erro ao obter respostas do Firebase:', error);
        return [];
    }
}

// Função para mostrar mensagem de RSVP
function mostrarMensagemRSVP(texto, tipo) {
    const mensagem = document.createElement('div');
    mensagem.className = `mensagem-rsvp mensagem-${tipo}`;
    mensagem.innerHTML = `
        <div class="mensagem-conteudo">
            <span>${texto}</span>
        </div>
    `;
    
    // Estilos da mensagem
    mensagem.style.cssText = `
        position: fixed;
        top: 2rem;
        left: 50%;
        transform: translateX(-50%);
        background: ${tipo === 'sucesso' ? '#4CAF50' : '#F44336'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 2000;
        font-size: 1.1rem;
        font-weight: 500;
        letter-spacing: 0.5px;
        animation: slideDown 0.4s ease;
        max-width: 90%;
        text-align: center;
    `;
    
    // Adicionar animação CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateX(-50%) translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateX(-50%) translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(mensagem);
    
    // Remover mensagem após 4 segundos
    setTimeout(() => {
        mensagem.style.animation = 'slideDown 0.4s ease reverse';
        setTimeout(() => {
            if (mensagem.parentNode) {
                mensagem.parentNode.removeChild(mensagem);
            }
            if (style.parentNode) {
                style.parentNode.removeChild(style);
            }
        }, 400);
    }, 4000);
}

// Função para inicializar painel de administração
function initAdmin() {
    let tentativasLogin = 0;
    const maxTentativas = 3;
    
    // Sequência secreta para acessar admin (Ctrl+Shift+A)
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.shiftKey && e.key === 'A') {
            e.preventDefault();
            abrirPainelAdmin();
        }
    });
    
    function abrirPainelAdmin() {
        if (tentativasLogin >= maxTentativas) {
            mostrarMensagemRSVP('🚫 Muitas tentativas de login. Tente novamente mais tarde.', 'erro');
            return;
        }
        
        const senha = prompt('Digite a senha de administrador:');
        
        if (senha === 'casamento2024') {
            tentativasLogin = 0;
            mostrarPainelAdmin();
        } else if (senha !== null) {
            tentativasLogin++;
            mostrarMensagemRSVP(`❌ Senha incorreta. Tentativas restantes: ${maxTentativas - tentativasLogin}`, 'erro');
        }
    }
    
    function mostrarPainelAdmin() {
        // Criar modal do painel admin
        const modalAdmin = document.createElement('div');
        modalAdmin.id = 'modal-admin';
        modalAdmin.innerHTML = `
            <div class="modal-admin-conteudo">
                <div class="admin-header">
                    <h2>🔧 Painel de Administração</h2>
                    <button id="btn-fechar-admin" class="btn-fechar">×</button>
                </div>
                <div class="admin-body">
                    <div class="admin-secao">
                        <h3>📊 Estatísticas de RSVP</h3>
                        <div id="estatisticas-rsvp"></div>
                    </div>
                    <div class="admin-secao">
                        <h3>👥 Lista de Convidados</h3>
                        <div id="lista-convidados"></div>
                    </div>
                    <div class="admin-secao">
                        <h3>⚙️ Ações</h3>
                        <div class="admin-acoes">
                            <button id="btn-exportar" class="btn-admin">📥 Exportar Dados</button>
                            <button id="btn-limpar-dados" class="btn-admin btn-perigo">🗑️ Limpar Todos os Dados</button>
                            <button id="btn-backup" class="btn-admin">💾 Fazer Backup</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Estilos do modal admin
        modalAdmin.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 3000;
            backdrop-filter: blur(5px);
        `;
        
        document.body.appendChild(modalAdmin);
        
        // Adicionar estilos CSS para o painel admin
        const styleAdmin = document.createElement('style');
        styleAdmin.textContent = `
            .modal-admin-conteudo {
                background: white;
                border-radius: 15px;
                max-width: 800px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            }
            
            .admin-header {
                background: #333333;
                color: white;
                padding: 1.5rem;
                border-radius: 15px 15px 0 0;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .admin-header h2 {
                margin: 0;
                font-size: 1.5rem;
            }
            
            .admin-body {
                padding: 2rem;
            }
            
            .admin-secao {
                margin-bottom: 2rem;
                padding-bottom: 1.5rem;
                border-bottom: 1px solid #eee;
            }
            
            .admin-secao:last-child {
                border-bottom: none;
            }
            
            .admin-secao h3 {
                color: #333;
                margin-bottom: 1rem;
                font-size: 1.2rem;
            }
            
            .admin-acoes {
                display: flex;
                gap: 1rem;
                flex-wrap: wrap;
            }
            
            .btn-admin {
                padding: 0.8rem 1.5rem;
                border: none;
                border-radius: 8px;
                background: #666666;
                color: white;
                cursor: pointer;
                font-size: 0.9rem;
                transition: all 0.3s ease;
            }
            
            .btn-admin:hover {
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            }
            
            .btn-perigo {
                background: linear-gradient(135deg, #e74c3c, #c0392b) !important;
            }
            
            .estatistica-item {
                background: #f8f9fa;
                padding: 1rem;
                border-radius: 8px;
                margin-bottom: 0.5rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .convidado-item {
                background: #f8f9fa;
                padding: 0.8rem;
                border-radius: 8px;
                margin-bottom: 0.5rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .status-confirmado {
                color: #27ae60;
                font-weight: bold;
            }
            
            .status-declinado {
                color: #e74c3c;
                font-weight: bold;
            }
        `;
        
        document.head.appendChild(styleAdmin);
        
        // Carregar dados iniciais do Firebase
        carregarEstatisticas();
        carregarListaConvidados();
        
        // Eventos do painel admin
        document.getElementById('btn-fechar-admin').addEventListener('click', function() {
            document.body.removeChild(modalAdmin);
            document.head.removeChild(styleAdmin);
        });
        
        document.getElementById('btn-exportar').addEventListener('click', exportarDados);
        document.getElementById('btn-limpar-dados').addEventListener('click', limparTodosDados);
        document.getElementById('btn-backup').addEventListener('click', fazerBackup);
        
        // Fechar com ESC
        function fecharAdmin(e) {
            if (e.key === 'Escape') {
                document.body.removeChild(modalAdmin);
                document.head.removeChild(styleAdmin);
                document.removeEventListener('keydown', fecharAdmin);
            }
        }
        document.addEventListener('keydown', fecharAdmin);
    }
    
    async function carregarEstatisticas() {
        const container = document.getElementById('estatisticas-rsvp');
        const dados = await obterTodasRespostas();
        
        const confirmados = dados.filter(d => d.resposta === 'confirmado').length;
        const declinados = dados.filter(d => d.resposta === 'declinado').length;
        const total = dados.length;
        
        container.innerHTML = `
            <div class="estatistica-item">
                <span>✅ Confirmados:</span>
                <strong>${confirmados}</strong>
            </div>
            <div class="estatistica-item">
                <span>❌ Declinados:</span>
                <strong>${declinados}</strong>
            </div>
            <div class="estatistica-item">
                <span>📊 Total de Respostas:</span>
                <strong>${total}</strong>
            </div>
            <div class="estatistica-item">
                <span>📋 Total de Convidados:</span>
                <strong>${listaNomes.length}</strong>
            </div>
            <div class="estatistica-item">
                <span>⏳ Pendentes:</span>
                <strong>${listaNomes.length - total}</strong>
            </div>
        `;
    }
    
    async function carregarListaConvidados() {
        const container = document.getElementById('lista-convidados');
        const dados = await obterTodasRespostas();
        
        if (dados.length === 0) {
            container.innerHTML = '<p>Nenhuma resposta registrada ainda no banco de dados.</p>';
            return;
        }
        
        const html = dados.map(dado => {
            const data = new Date(dado.dataResposta).toLocaleDateString('pt-BR');
            const statusClass = dado.resposta === 'confirmado' ? 'status-confirmado' : 'status-declinado';
            const statusTexto = dado.resposta === 'confirmado' ? '✅ Confirmado' : '❌ Declinado';
            
            return `
                <div class="convidado-item">
                    <div>
                        <strong>${dado.nome || 'Anônimo'}</strong>
                        <br>
                        <small>Respondeu em: ${data}</small>
                    </div>
                    <span class="${statusClass}">${statusTexto}</span>
                </div>
            `;
        }).join('');
        
        container.innerHTML = html;
    }
    
    async function obterTodasRespostas() {
        // Obter dados do Firebase
        return await obterRespostasFirebase();
    }
    
    async function exportarDados() {
        const dados = await obterTodasRespostas();
        const dataExport = {
            dataExportacao: new Date().toISOString(),
            totalConvidados: listaNomes.length,
            respostas: dados,
            estatisticas: {
                confirmados: dados.filter(d => d.resposta === 'confirmado').length,
                declinados: dados.filter(d => d.resposta === 'declinado').length,
                pendentes: listaNomes.length - dados.length
            },
            fonte: 'Firebase Firestore'
        };
        
        const blob = new Blob([JSON.stringify(dataExport, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `rsvp-casamento-firebase-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        mostrarMensagemRSVP('📥 Dados do Firebase exportados com sucesso!', 'sucesso');
    }
    
    function limparTodosDados() {
        mostrarMensagemRSVP('⚠️ Limpeza de dados do Firebase deve ser feita no Console do Firebase por segurança.', 'info');
    }
    
    async function fazerBackup() {
        const dados = await obterTodasRespostas();
        const backup = {
            timestamp: Date.now(),
            data: new Date().toISOString(),
            fonte: 'Firebase Firestore',
            dados: dados
        };
        
        const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `backup-firebase-rsvp-${Date.now()}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        mostrarMensagemRSVP('💾 Backup do Firebase criado com sucesso!', 'sucesso');
    }
}

console.log('Script simples carregado! Digite algo no campo e pressione Enter.');
console.log('💡 Dica para administradores: Pressione Ctrl+Shift+A para acessar o painel admin');