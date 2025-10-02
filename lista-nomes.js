// Lista centralizada de nomes para autocomplete - Casamento (Espírito Santo + Goiânia)
const listaNomes = [
    // Espírito Santo
    'Wesley Bertoli', 'Leila Venturini', 'Nathiely Bertoli', 'Nathan Bertoli', 'Camila Magnago', 'Edjane Bertoli', 'Cilas Sepulchro', 'João Lucas Bertoli',
    'Kamily Castro', 'João Marcos Bertoli', 'Welligton Bertoli', 'Alice Goldner', 'Maria Eloisa Goldner', 'Korrinna Bertoli', 'Penha Caliari',
    'Narciso Bertoli', 'Anatilde', 'José Caliari', 'Dheyner Bertoli', 'Ricardo', 'Rodrigo Bertoli', 'Ana Julia Flores',
    'Thauana Bertoli', 'Bruna', 'Zezim', 'Sandra', 'Juraci', 'Servolo', 'Charles', 'Sueli De Souza',
    'Eduardo Scardua', 'Lisley Bertoli', 'Silvio De Souza', 'Simone Gempka', 'Bryan Gempka', 'Kethelyn Gempka',
    'Leandro De Souza', 'Nilza', 'Hulyana', 'Leonardo', 'João Victor', 'Ana Claudia', 'Ilza De Souza', 'Luca Lonardi', 'Laíssa Soares', 'Luiz De Souza', 'Maria Clara', 'Cinthia De Souza',
    
    // Goiânia
    'Helena Nunes', 'Antônio Nunes', 'Milene Nunes', 'Eduarda Zabelly Nunes', 'Marcos Nunes', 'Liciene Rodrigues', 'Dudu Nunes',
    'Douglas Nunes', 'Lucas Nunes', 'Vilma Rodrigues', 'Marisa Nunes', 'Carlos Araujo', 'Alexya', 'Carol',
    'Neison', 'Moises', 'Simon', 'Benedito', 'Ilza Nunes', 'Breno Nunes', 'Rabeche',
    'Maria Julia', 'Augusto', 'Italo', 'Delandia', 'Nazaré', 'Gabriel Nunes',
    'Mariana', 'Belchior', 'Dark', 'Giovana Nunes','Lucia Nunes', 'Davi', 'Gislaine', 'Israel', 'Giovana',
    'Fernanda', 'Junim', 'Marcelo', 'Vitoria', 'Jose Henrique','Renata', 'Guilherme Soares', 'Luiz Neto','Thalys', 'Abio', 'Ayte','Fatima', 'Selma', 'Regina', 'Cleyton', 'Wivian', 'Caio', 'Manuela', 'Wellington Nunes', 'Ana Julia Soares', 'Guilherme Santos', 'Emanuelly Nunes', 'Luiz Paula', 'Neia','Osman', 'Isac', 'Rafaela', 'Samylla'
];

// Exporta a lista para uso em outros arquivos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = listaNomes;
} else {
    window.listaNomes = listaNomes;
}