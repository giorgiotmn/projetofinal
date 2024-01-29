const buttonSearch = document.getElementById('button-search')
const inputSearch = document.getElementById('input-search')

buttonSearch.addEventListener('click', () => {
    const inputSearchValue = inputSearch.value.trim()
    
    if (inputSearchValue) {
        alert('Buscando por ' + inputSearchValue)
        inputSearch.value = '' 
    } else {
        alert('Digite um valor.')
    }
})