/**********************************************************************
 *Objtivo: Carregar dados da API Rick and Morty
 * Data 20/04
 * Autor: Lucas
 * Versão 1.0
 **********************************************************************/

// Seleção dos elementos do DOM
const charsConteiner = document.querySelector('.chars-container');
const searchInput = document.querySelector('#search')
const speciesFielter = document.querySelector('#species')
const genderFileter = document.querySelector('#gender')
const statusFilter = document.querySelector('#status')
const loadMoreButton = document.querySelector('#load-more')

// URL da API e filtros padrão
const API = 'https://rickandmortyapi.com/api'
const defaultFilters = {
    name: '',
    species: '',
    gender: '',
    status: '',
    page: 1
}

// Função para buscar personagens da API
async function getCharacters({ name, species, gender, status, page = 1 }) {
    const response = await fetch(`${API}/character?name=${name}&species=${species}&gender=${gender}&status=${status}&page=${page}`)

    const characters = await response.json()
    return characters.results
}

// Função para renderizar os personagens na tela
async function render(characters){
    characters.forEach((character) => {
        charsConteiner.innerHTML += `
        <div class="char">
            <img src="${character.image}" alt="">
            <div class="char-info">
                <h3>${character.name}</h3>
                <span><b>Species:</b> ${character.species}</span>
                <span><b>Status:</b> ${character.status}</span>
                <span><b>Gender:</b> ${character.gender}</span>
                <span><b>Origin:</b> ${character.origin.name}</span>
                <span><b>Location:</b> ${character.location.name}</span>
            </div>
         </div>
        `
    })
}

// Função para lidar com a mudança nos filtros
function handleFilterChange(type, event) {
    return async () => {
        defaultFilters[type] = event.target.value
        charsConteiner.innerHTML = ''
        const characters = await getCharacters(defaultFilters)
        render(characters)
    }
}

// Função para adicionar event listeners aos filtros
function addListeners (){
    speciesFielter.addEventListener('change', async (event) => {
        handleFilterChange('species', event)()
    })
    
    genderFileter.addEventListener('change', async (event) =>{
        handleFilterChange('gender', event)()
    })
    
    statusFilter.addEventListener('change', async (event) =>{
        handleFilterChange('status', event)()
    })
    
    searchInput.addEventListener('keyup', async (event) =>{
        handleFilterChange('name', event)()
    }) 

    loadMoreButton.addEventListener('click', async (event) => {
        defaultFilters.page += 1
        const characters = await getCharacters(defaultFilters)
        render(characters)

    })
}


// Função principal para inicializar a aplicação
async function main(){
    const characters = await getCharacters(defaultFilters)
    addListeners()
    render(characters)
}

main()
