// Lista de nomes para autocomplete - Casamento (Espírito Santo + Goiânia)
const listaNomes = [
    // Espírito Santo
    'Wesley Bertoli', 'Leila Venturini', 'Nathiely Bertoli', 'Nathan Bertoli', 'Camila Magnago', 'Edjane Bertoli', 'Cilas Sepulchro', 'João Lucas Bertoli',
    'Kamily Castro', 'João Marcos Bertoli', 'Welligton Bertoli', 'Alice Goldner', 'Maria Eloisa Goldner', 'Korrinna Bertoli', 'Penha Caliari',
    'Narciso Bertoli', 'Anatilde', 'José Caliari', 'Dheyner Bertoli', 'Ricardo', 'Rodrigo Bertoli', 'Ana Julia Flores',
    'Thauana Bertoli', 'Bruna', 'Zezim', 'Sandra', 'Juraci', 'Servolo', 'Charles', 'Sueli De Souza',
    'Eduardo Scardua', 'Lisley Bertoli', 'Silvio De Souza', 'Simone Gempka', 'Bryan Gempka', 'Kethelyn Gempka',
    'Leandro De Souza', 'Nilza', 'Hulyana', 'Leonardo', 'João Victor', 'Ana Claudia', 'Ilza De Souza', 'Luca Lonardi', 'Laíssa Soares', 'Luiz De Souza', 'Maria Clara', 'Cinthia De Souza' ,  
    
    // Goiânia
    'Helena Nunes', 'Antônio Nunes', 'Milene Nunes', 'Eduarda Zabelly Nunes', 'Marcos Nunes', 'Liciene Rodrigues', 'Dudu Nunes',
    'Douglas Nunes', 'Lucas Nunes', 'Vilma Rodrigues', 'Marisa Nunes', 'Carlos Araujo', 'Alexya', 'Carol',
    'Neison', 'Moises', 'Simon', 'Benedito', 'Ilza Nunes', 'Breno Nunes', 'Rabeche',
    'Maria Julia', 'Augusto', 'Italo', 'Delandia', 'Nazaré', 'Gabriel Nunes',
    'Mariana', 'Belchior', 'Dark', 'Giovana Nunes', 'Wallace Nunes', 'Monique', 'Lucia Nunes',
    'Juliana', 'Leo', 'Davi', 'Gislaine', 'Israel', 'Giovana',
    'Fernanda', 'Junim', 'Marcelo', 'Vitoria', 'Jose Henrique', 'Jose Eloi',
    'Beni', 'Renata', 'Guilherme Soares', 'Luiz Neto', 'Jose Junior', 'Janaina', 'Beatriz', 'Davi Eloi', 'Antônio Filho', 'Thalys', 'Abio', 'Ayte', 'Abadia', 'Ilda', 'Fatima', 'Selma', 'Regina', 'Cleyton', 'Wivian', 'Caio', 'Manuela', 'Wellington Nunes', 'Ana Julia Soares','Ana Julya Alves', 'Guilherme Santos', 'Emanuelly Nunes', 'Marina Machado', 'Luiz Paula', 'Neia','Osman', 'Isac', 'Rafaela', 'Samylla', 
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
                // Verificar se o nome está na lista
                const nomeEncontrado = listaNomes.find(nome => 
                    nome.toLowerCase() === valor.toLowerCase()
                );
                
                if (nomeEncontrado && window.abrirModalRSVP) {
                    window.abrirModalRSVP(nomeEncontrado);
                    this.value = ''; // Limpa o campo
                    this.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
                } else {
                    mostrarMensagem(`Você digitou: "${valor}"`);
                    this.value = ''; // Limpa o campo
                    this.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
                }
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
                // Abrir modal de RSVP automaticamente ao clicar na sugestão
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
            // Abrir modal de RSVP automaticamente ao selecionar com teclado
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

// Funções globais para os botões do modal
window.confirmarPresenca = async function() {
    console.log('Função confirmarPresenca chamada');
    const nomeConvidado = window.nomeConvidadoAtual || 'Convidado';
    await salvarRespostaFirestore(nomeConvidado, 'confirmado');
};

window.declinarPresenca = async function() {
    console.log('Função declinarPresenca chamada');
    const nomeConvidado = window.nomeConvidadoAtual || 'Convidado';
    await salvarRespostaFirestore(nomeConvidado, 'declinado');
};

// Função abrirModalRSVP agora está definida dentro de initRSVP como window.abrirModalRSVP

// Cache local para evitar verificações desnecessárias
const cacheConfirmacoes = new Map();
const CACHE_EXPIRY = 5 * 60 * 1000; // 5 minutos

// Função para limpar cache expirado
function limparCacheExpirado() {
    const agora = Date.now();
    for (const [key, entry] of cacheConfirmacoes.entries()) {
        if ((agora - entry.timestamp) >= CACHE_EXPIRY) {
            cacheConfirmacoes.delete(key);
            console.log('🗑️ Cache expirado removido para:', key);
        }
    }
}

// Limpar cache expirado a cada 2 minutos
setInterval(limparCacheExpirado, 2 * 60 * 1000);

// Função para verificar se o convidado já confirmou presença no Firestore
async function verificarConfirmacaoPrevia(nomeConvidado) {
    const nomeNormalizado = nomeConvidado.toLowerCase().trim();
    
    // Verificar cache local primeiro
    const cacheKey = nomeNormalizado;
    const cacheEntry = cacheConfirmacoes.get(cacheKey);
    
    if (cacheEntry && (Date.now() - cacheEntry.timestamp) < CACHE_EXPIRY) {
        console.log('📋 Usando cache para:', nomeConvidado, '- Resultado:', cacheEntry.confirmado);
        if (cacheEntry.confirmado) {
            throw new Error('Confirmação já existe (cache)');
        }
        return false;
    }
    
    try {
        if (!window.firebaseDB) {
            console.warn('Firebase não inicializado, aplicando regras do firestore.rules');
            throw new Error('Firebase não disponível');
        }
        
        console.log('🔍 Verificando no Firebase para:', nomeConvidado);
        
        const q = window.firebaseQuery(
            window.firebaseCollection(window.firebaseDB, 'rsvp'),
            window.firebaseWhere('nome', '==', nomeNormalizado)
        );
        
        const querySnapshot = await window.firebaseGetDocs(q);
        
        const jaConfirmou = !querySnapshot.empty;
        
        // Atualizar cache
        cacheConfirmacoes.set(cacheKey, {
            confirmado: jaConfirmou,
            timestamp: Date.now()
        });
        
        if (jaConfirmou) {
            console.log('✅ Confirmação encontrada no banco de dados para:', nomeConvidado);
            throw new Error('Confirmação já existe no Firebase');
        }
        
        console.log('✅ Nenhuma confirmação prévia encontrada para:', nomeConvidado);
        return false;
        
    } catch (error) {
        if (error.message.includes('Confirmação já existe')) {
            throw error; // Re-lançar erros de duplicata
        }
        
        console.error('❌ Erro ao verificar confirmação prévia no Firebase:', error);
        console.warn('⚠️ Verifique se as regras do Firestore estão aplicadas corretamente');
        
        // Em caso de erro de conectividade, não permitir salvamento para evitar duplicatas
        throw new Error('Não foi possível verificar confirmações prévias. Tente novamente.');
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
        try {
            await verificarConfirmacaoPrevia(nomeConvidado);
            console.log('✅ Verificação de duplicatas passou - prosseguindo com salvamento');
        } catch (verificacaoError) {
            console.error('❌ Erro na verificação de duplicatas:', verificacaoError);
            
            if (verificacaoError.message.includes('já existe')) {
                mostrarMensagemRSVP('✨ Sua presença já foi confirmada anteriormente! 💕', 'sucesso');
            } else {
                mostrarMensagemRSVP('⚠️ ' + verificacaoError.message, 'erro');
            }
            
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
        
        // Atualizar cache após salvamento bem-sucedido
        const nomeNormalizado = nomeConvidado.toLowerCase().trim();
        cacheConfirmacoes.set(nomeNormalizado, {
            confirmado: true,
            timestamp: Date.now()
        });
        console.log('📋 Cache atualizado para:', nomeConvidado);
        
        // Mostrar mensagem de sucesso
        if (resposta === 'confirmado') {
            mostrarMensagemRSVP('✨ Presença confirmada e salva no banco de dados! Obrigado! 💕', 'sucesso');
        } else {
            mostrarMensagemRSVP('😔 Que pena que não poderá comparecer! 💙', 'info');
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

console.log('Script simples carregado! Digite algo no campo e pressione Enter.');