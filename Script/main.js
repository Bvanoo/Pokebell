const select = document.getElementById('listing');
const btn = document.querySelectorAll('.btn');
const screen = document.getElementById('affichage');
const audio = document.getElementById('audio');
const loader = document.getElementById('loader');
const Info = document.getElementById('Info')
const Stat = document.getElementById('Stat')
const Visu = document.getElementById('Visu')
const Atq = document.getElementById('Atq')
const Cri = document.getElementById('Cri')
const play = document.getElementById('play')
const bit = document.getElementById('bit')
const rightScreen = document.getElementById('rightScreen')
const pokedex = document.getElementById('pokedex')
const versus = document.getElementById('versus')
const versusContainer = document.getElementById('versus-container')
const versusBattle = document.getElementById('versus-battle')
const poke1 = document.getElementById("Poke1")
const poke2 = document.getElementById("Poke2")

const mainContainer = document.getElementById('main-container')
const body = document.querySelector('body')
const battle = document.getElementById('battle')


let imageUrl;
let i = 1;
let l = 1;
let k = 1;
let isPlayed = false;

////////////POKEDEX///////////
play.onclick = () => {
    if (isPlayed) {
        bit.pause();
    } else {
        bit.play();
    }
    isPlayed = !isPlayed;
};

body.style.backgroundImage = 'url(../Assets/b6d33032-8ed4-4876-a1a7-8e98068b49b2_lakeanim_kristyphlosion_social.gif)';
versusBattle.style.display = "none";
versusContainer.style.display = "none";

pokedex.onclick = () => {
    body.style.backgroundImage = 'url(../Assets/b6d33032-8ed4-4876-a1a7-8e98068b49b2_lakeanim_kristyphlosion_social.gif)';
    mainContainer.style.display = "flex";
    versusContainer.style.display = "none";
    versusBattle.style.display = "none";
    bit.src = "Assets/Pokémon Theme (8 Bit Remix Cover Version) [Tribute to Pokémon] - 8 Bit Universe.MP3"
    bit.play();
    isPlayed = !isPlayed;
    
}
versus.onclick = () => {
    body.style.backgroundImage = 'url(../Assets/DVMT-6OXcAE2rZY.jpg.afab972f972bd7fbd4253bc7aa1cf27f.jpg)';
    versusContainer.style.display = "flex";
    mainContainer.style.display = "none";
    versusBattle.style.display = "none";
    bit.src = "Assets/Pokémon Theme (Drum and Bass Remix) - Polymer.MP3"
    bit.play();
    isPlayed = !isPlayed;
}




fetch('https://pokeapi.co/api/v2/pokemon-species/?limit=1025&offset=0').then(result => result.json()).then(result => {
    for (idPoke of result.results) {
        const option = document.createElement('option');
        option.textContent = idPoke.name;
        option.value = i;
        select.append(option);
        i++;
        // console.log(i)
    }

});

select.addEventListener('change', async () => {
    let loca;
    let name;
    let imageUrl;

    try {
        const speciesRes = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${select.value}/?limit=1025&offset=0`);
        const speciesData = await speciesRes.json();
        name = (speciesData.names.find(n => n.language.name === "fr") || speciesData.names[0]).name;
        loca = speciesData.habitat ? speciesData.habitat.name : "Inconnu";

        const pokemonRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${select.value}/`);
        const result = await pokemonRes.json();

        let defaultImage = result.sprites.front_default;
        let shiny = result.sprites.front_shiny;

        if (select.value === "9999") {
            screen.style.backgroundImage = `url(../../Assets/pikaben-removebg-preview.png)`;
            loader.style.opacity = '0';
        } else if (select.value === "def") {
            screen.style.backgroundImage = "none";
            loader.style.opacity = '1';
        } else {
            imageUrl = defaultImage;
            screen.style.backgroundImage = `url(${imageUrl})`;
            audio.src = `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${select.value}.ogg`;
            audio.play();
            loader.style.opacity = '0';

            rightScreen.innerHTML =
                `<h2 ><span id="titleName">${name}</span>  n° ${result.id}</h2>
                <h2><span class="titleStat">Taille</span>: ${result.height / 10} M</h2>
                <h2><span class="titleStat">Poids</span>: ${result.weight / 10} KG</h2>
                <h2><span class="titleStat">Habitat</span>: ${loca}</h2>`;
           
            Info.onclick = () => {
                rightScreen.innerHTML =
                `<h2 ><span id="titleName">${name}</span> n° ${result.id}</h2>
                <h2><span class="titleStat">Taille</span>: ${result.height / 10} M</h2>
                <h2><span class="titleStat">Poids</span>: ${result.weight / 10} KG</h2>
                <h2><span class="titleStat">Habitat</span>: ${loca}</h2>`;
            };

            Stat.onclick = () => {
                rightScreen.innerHTML = '<canvas id="myChart"></canvas>';
                const ctx = document.getElementById('myChart');
                new Chart(ctx, {
                    type: 'radar',
                    data: {
                        labels: [
                            'Pv',
                            'Atq',
                            'Def-Spé',
                            'Vit',
                            'Def',
                            'Atq-Spé'
                        ],
                        datasets: [{
                            label: `${name}`,
                            data: [
                                result.stats[0].base_stat,
                                result.stats[1].base_stat,
                                result.stats[4].base_stat,
                                result.stats[5].base_stat,
                                result.stats[2].base_stat,
                                result.stats[3].base_stat
                            ],
                            fill: true,
                            backgroundColor: 'rgba(117, 234, 217, 0.2)',
                            borderColor: 'rgb(255, 255, 255)',
                            pointBackgroundColor: '#67C09D',
                            pointBorderColor: '#fff',
                            pointHoverBackgroundColor: '#fff',
                            pointHoverBorderColor: 'rgb(255, 99, 132)',
                            borderWidth: 1,
                            pointRadius: 2
                        }]
                    },
                    options: {
                        plugins: {
                            legend: {
                                labels: {
                                    color: 'rgb(255, 255, 255)',
                                },
                            },
                        },
                        scales: {
                            r: {
                                pointLabels: {
                                    font: {
                                        size: 10,
                                    },
                                    color: 'rgb(255, 255, 255)'
                                },
                                ticks: {
                                    display: true,
                                    font: {
                                        size: 8,
                                        family: 'Arial'
                                    },
                                    color: '#cccccc',
                                    backdropColor: 'transparent'
                                },
                                grid: {
                                    color: '#444',
                                },
                                angleLines: {
                                    color: '#666'
                                }
                            }
                        },
                        elements: {
                            line: {
                                borderWidth: 3
                            }
                        }
                    }
                });
            };


            Visu.onclick = () => {
                imageUrl = imageUrl === defaultImage ? shiny : defaultImage;
                screen.style.backgroundImage = `url(${imageUrl})`;
            };

            Atq.onclick = () => {
                rightScreen.innerHTML = `<h2>Passif : </h2>`;
                for (let cap of result.abilities) {
                    rightScreen.innerHTML += `<h2>${cap.ability.name}</h2>`;
                }
                rightScreen.innerHTML += `<h2>Type : </h2>`;
                for (let genre of result.types) {
                    rightScreen.innerHTML += `<h2>${genre.type.name}</h2>`;
                }
            };

            Cri.onclick = () => {
                audio.play();
            };
        }

    } catch (error) {
        console.error("Erreur lors du chargement du Pokémon :", error);
    }
});

////////////FIN POKEDEX///////////

///////////VERSUS/////////////

const PokeAff1 = document.getElementById("PokeAff1")
const PokeAff2 = document.getElementById("PokeAff2")
const yourPoke = document.getElementById("statYourPoke")
const yourPokeSprite = document.getElementById("spriteYourPoke")
const myPoke = document.getElementById("statMyPoke")
const hpYour = document.getElementById("hpYour")
const hpMy = document.getElementById("hpMy")
const atq = document.getElementById("atq")
const act = document.getElementById("act")
const soin = document.getElementById("soin")
const myPokeSprite = document.getElementById("spriteMyPoke")
let name2;
let name3;
let imageUrl2;


fetch('https://pokeapi.co/api/v2/pokemon-species/?limit=1025&offset=0').then(result => result.json()).then(result => {
    for (idPoke of result.results) {
        const option = document.createElement('option');
        option.textContent = idPoke.name;
        option.value = l;
        // console.log(option.value);
        poke1.append(option);
        l++;

    }
});
fetch('https://pokeapi.co/api/v2/pokemon-species/?limit=1025&offset=0').then(result => result.json()).then(result => {
    for (idPoke of result.results) {
        const option = document.createElement('option');
        option.textContent = idPoke.name;
        option.value = k;
        // console.log(option.value);
        poke2.append(option);
        k++;
    }
});


poke1.addEventListener('change', async () => {
    const speciesRes2 = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${poke1.value}/?limit=1025&offset=0`);
    const speciesData2 = await speciesRes2.json();
    name2 = (speciesData2.names.find(n => n.language.name === "fr") || speciesData2.names[0]).name;

    const pokemonRes2 = await fetch(`https://pokeapi.co/api/v2/pokemon/${poke1.value}/`);
    const result2 = await pokemonRes2.json();

    if (poke1.value === "def") {
        PokeAff1.style.backgroundImage = "none";
    } else {
        // audio2.src = `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${poke1.value}.ogg`;
        // audio2.play();
        PokeAff1.innerHTML =
            `<img src="${result2.sprites.front_default}" alt="">
                    <h2>PV :${result2.stats[0].base_stat}</h2>
                    <h2>Atq :${result2.stats[1].base_stat}</h2>
                    <h2>Def :${result2.stats[2].base_stat} </h2>
                    <h2>Atq Spe :${result2.stats[3].base_stat} </h2>
                    <h2>Def Spe :${result2.stats[4].base_stat} </h2>
                    <h2>Vit :${result2.stats[5].base_stat} </h2>
            `;
    };
    poke2.addEventListener('change', async () => {
        const speciesRes3 = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${poke2.value}/?limit=1025&offset=0`);
        const speciesData3 = await speciesRes3.json();
        name3 = (speciesData3.names.find(n => n.language.name === "fr") || speciesData3.names[0]).name;

        const pokemonRes3 = await fetch(`https://pokeapi.co/api/v2/pokemon/${poke2.value}/`);
        const result3 = await pokemonRes3.json();
        let myHp = result2.stats[0].base_stat;
        let yourHp = result3.stats[0].base_stat;
        if (poke2.value === "def") {
            PokeAff2.style.backgroundImage = "none";
        } else {
            // audio2.src = `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${poke1.value}.ogg`;
            // audio2.play();
            PokeAff2.innerHTML =
                `<img src="${result3.sprites.front_default}" alt="">
                                <h2>PV :${result3.stats[0].base_stat}</h2>
                                <h2>Atq :${result3.stats[1].base_stat}</h2>
                                <h2>Def :${result3.stats[2].base_stat} </h2>
                                <h2>Atq Spe :${result3.stats[3].base_stat} </h2>
                                <h2>Def Spe :${result3.stats[4].base_stat} </h2>
                                <h2>Vit :${result3.stats[5].base_stat} </h2>
                        `;
        };
        battle.onclick = () => {
            versusContainer.style.display = "none";
            versusBattle.style.display = "flex";
            myPokeSprite.innerHTML = `<img src ="${result2.sprites.back_default}">`;
            yourPokeSprite.innerHTML = `<img src ="${result3.sprites.front_default}">`;
            hpMy.innerHTML = `<h2>Pdv: ${myHp}</h2>`;
            hpYour.innerHTML = `<h2>Pdv: ${yourHp}</h2>`;
            act.style.display = 'flex';
        };
            atq.onclick = () => {
                const yourAttack = result3.stats[1].base_stat;
                const yourDefense = result3.stats[2].base_stat;
                const myAttack = result2.stats[1].base_stat;
                const myDefense = result2.stats[2].base_stat;
                
                const damageToYou = (myAttack - yourDefense <= 0) ? 5 : (myAttack - yourDefense);
                const damageToMe = (yourAttack - myDefense <= 0) ? 5 : (yourAttack - myDefense);
                
                yourHp -= damageToYou;
                myHp -= damageToMe;
                
                if (myHp > 0 && yourHp > 0) {
                    hpYour.innerHTML = `<h2>Pdv: ${yourHp}</h2>`;
                    hpMy.innerHTML = `<h2>Pdv: ${myHp}</h2>`;
                } else if (myHp <= 0) {
                    console.log("nope")
                    hpMy.innerHTML = `<h2>YOU LOSE</h2>`;
                    hpYour.innerHTML = `<h2>YOU WIN</h2>`;
                    act.style.display = 'none';
                } else if (yourHp <= 0) {
                    console.log("nope")
                    hpMy.innerHTML = `<h2>YOU WIN</h2>`;
                    hpYour.innerHTML = `<h2>YOU LOSE</h2>`;
                    act.style.display = 'none';
                }
            }
            

});
});


//////////FIN VERSUS////////////
