// HAUTEUR EN DECIMENTRES ET POIDS EN HECTOGRAMME !!!
const select = document.getElementById('listing');
const btn = document.querySelectorAll('.btn');

btn.forEach(button => {
    button.addEventListener('focus', () => {
        button.style.boxShadow = "inset 20px 20px 60px #bebebe, inset -20px -20px 60px #ffffff";
    });
});



fetch('https://pokeapi.co/api/v2/pokemon-species/?limit=1025&offset=0').then(result=>result.json()).then(result => {
    for(idPoke of result.results){
        console.log(idPoke)
        const option = document.createElement('option');
        option.textContent = idPoke.name;
        select.append(option);
        }
    });


    
fetch('https://pokeapi.co/api/v2/pokemon-species/25/?limit=100&offset=100').then(result=>result.json()).then(result => {
    console.log(result)
    console.log(result.names[4].name)
    console.log(result.habitat.name)

});

    fetch('https://pokeapi.co/api/v2/pokemon/25/?limit=100&offset=100').then(result=>result.json()).then(result => {
        console.log(result)
        //POSITION POKEDEX
        console.log(result.id)
        //Stats
        console.log(result.height)
        console.log(result.weight)
        //ATTENTION A METTRE DANS UNE FOREACH 
        console.log(result.types[0].type.name)
        // console.log(result.types[1].type.name)
        console.log(result.stats[0].stat.name)
        console.log(result.stats[0].base_stat)
        console.log(result.stats[1].stat.name)
        console.log(result.stats[1].base_stat)
        console.log(result.stats[2].stat.name)
        console.log(result.stats[2].base_stat)
        console.log(result.stats[3].stat.name)
        console.log(result.stats[3].base_stat)
        console.log(result.stats[4].stat.name)
        console.log(result.stats[4].base_stat)
        console.log(result.stats[5].stat.name)
        console.log(result.stats[5].base_stat)
        //Visuel et cri 
        console.log(result.sprites.front_default)
        console.log(result.sprites.front_shiny)
        console.log(result.cries.legacy)
        //Attaques
        console.log(result.abilities[0].ability.name)
        console.log(result.abilities[1].ability.name)
        // !!!!!!! A FAIRE EN FOREACH OU FOR OF
        
        //Evolution 
        
    });


fetch('https://pokeapi.co/api/v2/evolution-chain/25/').then(result=>result.json()).then(result => {
    console.log(result);
    // IF isBaby=== false N'AS PAS DE POKEMON AVANT LUI ELSE IL A EVOLUER D'UN AUTRE 
    console.log(result.chain.evolves_to[0].species.url)
});



// fetch('https://pokeapi.co/api/v2/language/5/').then(result=>result.json()).then(result => {
//     console.log(result)
//     // console.log(result.results[0]    
// });