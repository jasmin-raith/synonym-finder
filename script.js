async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let I = 0; I < includeElements.length; I++) {
        const element = includeElements[I];
        file = element.getAttribute('w3-include-html');   // „includes/header.html“*
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}


async function getSynonyms() {
    let query = document.getElementById('searchQuery').value; 
    let url = `https://www.openthesaurus.de/synonyme/search?q=${query}&format=application/json`;
    let response = await fetch(url);
    let responseAsJson = await response.json()
    let synsets = responseAsJson['synsets'];
    renderSynsets(synsets);
}


function renderSynsets(synsets) {
    let container = document.getElementById('container');

    container.innerHTML = /*html*/ `<div>Es wurden <b> ${synsets.length} </b> passende Synonymgruppen geladen. <br>
                                    Quelle: Openthesaurus API
                                    </div>`;

    for (let i = 0; i < synsets.length; i++) {
        let synset = synsets[i];
        let terms = synset['terms'];    // ist ein Array
        container.innerHTML += /*html*/ `<h2>Synonym-Gruppe ${synset['id']}</h2>`;

        for (let j = 0; j < terms.length; j++) {
            let term = terms[j];
            container.innerHTML += /*html*/ `<div>${term['term']}</div>`;
        }
    }
}