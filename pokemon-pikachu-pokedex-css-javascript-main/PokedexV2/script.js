// Fonction pour récupérer les données d'un Pokémon depuis l'API
async function fetchPokemon(index)
{
    const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${index}`);
    const response = await data.json();
    return response;
}

// Index de départ et navigation
let indexPokemon = 1;

// Fonction pour modifier l'index en fonction de la navigation
function changeIndex(index, nav)
{   
    // Vérifier si l'index est au début ou à la fin et ajuster en conséquence
    if((index === 1) && (nav === "prev")){
        indexPokemon = 1;
    } else if ((index === 151 ) && (nav === "next")){
        indexPokemon =151;
    } else if ((index >= 1) && (index <= 151) && (nav === "prev")){
        index = index -1;
    } else if ((index >= 1) && (index <= 151) && (nav === "next")){
        index++;
    }
    console.log('index:'+index);
    return index;
}

// Fonction pour formater l'index à afficher
function formateIndex(index)
{
    // Ajouter des zéros devant les valeurs d'index inférieures à 10 ou 100
    if(index < 10){
        return `#00${index}`; 
    } else if ( index <100){
        return `#0${index}`;
    } else {
        return `#${index}`;
    }
}

// Gestion de la navigation + animation lumière bleue
//const blueBtn = document.getElementById('blueBtn');
const prev = document.getElementById('prev');
prev.addEventListener('click', ()=>
{
    // Modifier l'index lorsque le bouton précédent est cliqué
    indexPokemon = changeIndex(indexPokemon,"prev");
    if(blueBtn.classList.contains('active'))
    {
        console.log('jai la classe active')
        blueBtn.classList.remove('active');
    
    }
    updateUI();
})
const next =document.getElementById('next');
next.addEventListener('click', ()=>
{
    // Modifier l'index lorsque le bouton suivant est cliqué
    indexPokemon = changeIndex(indexPokemon, "next");
    if (blueBtn.classList.contains('active'))
    {
        console.log('jai la classe active')
        blueBtn.classList.remove('active');
    }
    updateUI();
})
// Gestion de la recherche par index :
//const inputIndex = document.getElementById('inputIndex');
const btnJaune = document.getElementById('btnJaune');
inputIndex.addEventListener('input',()=>
{
    btnJaune.classList.add('active');
})

btnJaune.addEventListener('click', ()=>
{
btnJaune.classList.remove('active');
const indexSelected = parseInt(inputIndex.value);
// Vérifier si l'index saisi est valide
if(indexSelected <1 || indexSelected >151)
{
    const name = document.getElementById('name');
    name.textContent = " POKEMON NOT FOUND";
    return;
} else {
    indexPokemon = indexSelected;
    updateUI()
}
})

inputIndex.addEventListener('blur', ()=>
{
    btnJaune.classList.remove('active');
})

// Fonction pour récupérer les données du Pokémon
async function pokemon() 
{
    // const indexAleat = Math.floor(Math.random() * 151) + 1;
    const pokemonChoix = await fetchPokemon(indexPokemon);

    // Extraire les types du Pokémon
    const getTypes = [...pokemonChoix.types];
    let types = [];
    getTypes.forEach(el => 
    {
        types.push(el.type.name);
    })
    const typesArray = types;
    types = types.join(' / ');

    // Formater la taille et le poids
    const height = `${pokemonChoix.height * 10} cm`;
    const weight = `${pokemonChoix.weight / 10} kg`;

    const formatedIndexPokemon = formateIndex(indexPokemon);

    return {
        index: formatedIndexPokemon,
        name: pokemonChoix.name,
        type: types,
        typesArray: typesArray,
        height: height,
        weight: weight,
        image: pokemonChoix.sprites.front_default,
        region: "kanto"
    }
}

// Fonction pour mettre à jour l'interface utilisateur
const updateUI       = async function() {
    const data       = await pokemon();// Appel à une fonction `pokemon()` pour récupérer les données
    const reponse    = await data;


// Récupération des éléments du DOM
const name          = document.getElementById('name');
const index         = document.getElementById('index');
const type          = document.getElementById('type');
const height        = document.getElementById('height');
const weight        = document.getElementById('weight');
const image         = document.getElementById('image');
const blueBtn       = document.getElementById('blueBtn');
const inputIndex    = document.getElementById('inputIndex');
const region        = document.getElementById('region');
const bubble1       = document.getElementById('bubble1'); 
const bubble2       = document.getElementById('bubble2'); 
const bodyDOM       = document.getElementsByTagName('body')[0];

// Constante des colorType
const colorType = 
{
    grass: "#2DCD45",
    poison: "#883688",
    fire: "#F08030",
    flying: "#A890F0",
    water: "#4BA2E1",
    bug: "#A8B820",
    normal: "#A8A878",
    electric: "#F8D030",
    ground: "#E0C068",
    fairy: "#EE99AC",
    fighting: "#94352D",
    psychic: "#FF6996",
    rock: "#B8A038",
    steel: "#B8B8D0",
    ice: "#98D8D8",
    ghost: "#614C83",
    dragon: "#700AEE"
}

// Constante des images de fond 
const bgArray =
[
    "https://cdn.pixabay.com/photo/2015/09/09/16/05/forest-931706_1280.jpg",
    "https://cdn.pixabay.com/photo/2020/04/01/12/57/landscape-4991121_1280.jpg",
    "https://cdn.pixabay.com/photo/2020/04/01/12/57/landscape-4991122_1280.jpg",
    "https://cdn.pixabay.com/photo/2017/02/08/17/24/butterfly-2049567_1280.jpg",
    "https://cdn.pixabay.com/photo/2014/02/05/19/58/blue-259458_1280.jpg",
    "https://cdn.pixabay.com/photo/2018/08/14/13/23/ocean-3605547_1280.jpg",
    "https://cdn.pixabay.com/photo/2016/09/27/19/07/forest-1699078_1280.jpg",
    "https://cdn.pixabay.com/photo/2017/09/15/02/22/fantasy-2750995_1280.jpg",
    "https://cdn.pixabay.com/photo/2019/02/27/22/18/fantasy-4025091_1280.jpg",
    "https://cdn.pixabay.com/photo/2019/07/10/17/05/trees-4329040_1280.jpg",
    "https://cdn.pixabay.com/photo/2019/06/11/13/26/background-4267049_1280.jpg",
    "https://cdn.pixabay.com/photo/2019/07/13/08/00/landscape-4334259_1280.jpg"
]

if(reponse.typesArray.length === 2)
{
    // Si le tableau `typesArray` a une longueur de 2
    bubble1.style.backgroundColor = colorType[reponse.typesArray[0]];
    bubble2.style.backgroundColor = colorType[reponse.typesArray[1]];
} else if (reponse.typesArray.length === 1)
{
    // Si le tableau `typesArray` a une longueur de 1
    bubble1.style.backgroundColor = colorType[reponse.typesArray[0]];
    bubble2.style.backgroundColor = "transparent";
}

name.textContent        = reponse.name;
index.textContent       = reponse.index;
type.textContent        = reponse.type;
height.textContent      = reponse.height;
weight.textContent      = reponse.weight;
region.textContent      = reponse.region;
image.setAttribute("src",reponse.image);
bodyDOM.style.backgroundImage = `url('${bgArray[Math.floor(Math.random() * bgArray.length)]}')`;

blueBtn.addEventListener('animationend', () =>
{
    blueBtn.classList.remove('active')
})


blueBtn.classList.add('active');
};

updateUI()


// POKEBALL BTN
const pokeballSocial        = document.getElementById('pokeball');
const socialBg              = document.getElementById('socialBg');
const socialDiv             = document.getElementById('socialDiv');
pokeballSocial.addEventListener('click', ()=>
{
    pokeballSocial.classList.toggle('activePokeball');
    socialBg.classList.toggle('activeSocialBg');
    socialDiv.classList.toggle('activeSocialDiv');

})
