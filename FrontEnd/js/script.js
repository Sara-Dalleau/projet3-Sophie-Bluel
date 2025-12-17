// VARIABLE GLOGABLE POUR REUTILISER LE TABLEAU TRAVAUX
let tableauElement = [];

// RECUPERATION TRAVAUX
async function recupererTravaux() {
  const reponse = await fetch("http://localhost:5678/api/works");
  const travaux = await reponse.json();

  tableauElement = travaux;
}

// RECUPERATION FILTRES
async function recupererFiltres () {
  const reponse = await fetch ("http://localhost:5678/api/categories");
  const filtres = await reponse.json();
  //console.log("voici mes filtres", filtres)
  const sectionFiltres = document.querySelector(".filtres");

  const btnTous = document.createElement("button");
  btnTous.textContent = ("Tous");
  sectionFiltres.appendChild(btnTous);
  btnTous.dataset.id = 0;

  for (let i = 0; i < filtres.length; i++) {
    const btnElement = document.createElement("button");
    btnElement.textContent = filtres[i].name;
    // mettre un data-id sur un bouton
    btnElement.dataset.id = filtres[i].id;
    sectionFiltres.appendChild(btnElement);
  }
}

// RECUPERATION CATEGORIE
async function recupererCategories () {
  const reponse = await fetch ("http://localhost:5678/api/categories");
  const categories = await reponse.json();

  const selectOption = document.getElementById("categorie");

  for (let i = 0; i < categories.length; i++) {

    const options = document.createElement("option");
    options.value = categories[i].id;
    options.textContent = categories[i].name;

    selectOption.appendChild(options);
  }
}
recupererCategories ();

// AFFICHAGE DYNAMIQUE DES TRAVAUX DANS LA GALERIE 
function afficherTravaux(tableau) {
  // Récupère la section HTML qui contient la galerie  
    const sectionTravaux = document.querySelector(".gallery");
    // Vide la galerie avant d'afficher de nouveaux éléments
    sectionTravaux.innerHTML = "";
  
    for (let i = 0; i < tableau.length; i++) {
      // Création de la balise figure qui va contenir l'image et le titre
      const figureElement = document.createElement("figure");
      // Création de la balise <img> pour l'image du travail
      const imgElement = document.createElement("img");
      // Récupération de l’URL de l’image
      imgElement.src = tableau[i].imageUrl;
  
      const titleElement = document.createElement("h3");
      titleElement.textContent = tableau[i].title;
      // Ajout de l'image et du titre dans la balise figure
      figureElement.appendChild(imgElement);
      figureElement.appendChild(titleElement);
      // Ajout de la figure complète dans la galerie
      sectionTravaux.appendChild(figureElement);
    }
  }

// FONCTION RENDRE MES FILTRES INTERACTIFS
function btnFiltres () {
  // Sélection de tous les boutons présents dans la section filtres
  const boutonFiltres = document.querySelectorAll(".filtres button");
  // Boucle pour ajouter un événement "click" sur chaque bouton
  for (let i = 0; i < boutonFiltres.length; i++){
    boutonFiltres[i].addEventListener("click", function (event) {
      // Récupération de l'id du bouton cliqué (converti en nombre)
      for (let j = 0; j < boutonFiltres.length; j++) {
        boutonFiltres[j].classList.remove("active");
      }
      event.target.classList.add("active");
      
      const btnClique = parseInt(event.target.dataset.id);
      // Si le bouton "Tous" est cliqué (id = 0), on réaffiche tous les travaux
      if (btnClique === 0) {
        afficherTravaux(tableauElement);
    } 
    // Sinon on filtre les travaux selon l'id de la catégorie cliquée
    else {
        const travauxFiltres = tableauElement.filter(function (travail) {
          return travail.categoryId === btnClique;
      });
      // Affichage des travaux filtrés
      afficherTravaux(travauxFiltres);
    }
    })
  }  
}

// FONCTION D'INITIALISATION: attend que les travaux et filtres soient récupérés et affichés, puis active les event sur boutons filtres
async function init () {
  await recupererTravaux();
  afficherTravaux(tableauElement);

  await recupererFiltres();
  btnFiltres()
}
init(); 
  
// FONCTION MODE EDITION
function modeEdition () {
  const etat = localStorage.getItem("token");
  const cacherFiltres = document.querySelector(".filtres");
  let btnLogin = document.querySelector(".btnLogin");
  const btnModifier = document.querySelector(".btnModifier");
  const bandeauEdition = document.querySelector(".bandeau-edition");

  if (etat !== null) {
    //filtres cachés
    cacherFiltres.style.display = "none";

    // Login devient logout
    btnLogin.setAttribute("href", "#");
    btnLogin.textContent ="logout";

    // Au click logout retour mode normal
    btnLogin.addEventListener("click", () => {
      localStorage.removeItem("token"); //suppression du token
      (window.location.href = "index.html") // redirection page d'accueil
    });

    //Création Bouton modifier
    const btn = document.createElement("button");
    btn.classList.add("btn-edit");
    
    const icon = document.createElement("i");
    icon.classList.add("fa-regular", "fa-pen-to-square");
    
    const text = document.createElement("span");
    text.textContent = "modifier";
    
    btn.appendChild(icon);
    btn.appendChild(text);
    btnModifier.appendChild(btn);

    //Affichage bandeau edition 
    bandeauEdition.style.display = "flex";

  } else {
    bandeauEdition.style.display = "none";
  }
}
modeEdition();

// *************** MODALE ******************** 

// OUVERTURE ET FERMETURE MODALE 
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const modalBtnClose = document.querySelector(".btnClose");
const modalBtnModifier = document.querySelector(".btnModifier");

let etat = false; 

function lectureEtat () {
  if (etat === true) {
    modal.style.display = "flex";
  } else {
    modal.style.display = "none";
  }
}

modalBtnModifier.addEventListener("click", (event )=> {
  etat = true;
  etatInterne = "galerie"
  lectureEtat();
  lectureEtatInterne()
});
modalBtnClose.addEventListener("click", (event) => {
  etat = false;
  lectureEtat();
});

overlay.addEventListener("click", (event) => {
  etat = false;
  lectureEtat();
});

// ETAT INTERNE DE LA MODALE
const modalBtnBack = document.querySelector(".btnBack");
const btnAjouterPhoto = document.querySelector(".btnAjouterPhoto");
const modalTitre = document.querySelector(".modal-titre");

const galerie = document.querySelector(".container-gallery")
const formulaireModal = document.querySelector(".container-form")

let etatInterne = "galerie"; 


function lectureEtatInterne () {
  if (etatInterne === "galerie") {
    modalTitre.textContent ="Galerie photo";

    galerie.style.display = "flex";
    formulaireModal.style.display = "none"

    btnAjouterPhoto.style.display = "flex";
    modalBtnBack.style.display = "none";
    
  } else {
    modalTitre.textContent ="Ajout photo";

    galerie.style.display = "none";
    formulaireModal.style.display = "flex"

    btnAjouterPhoto.style.display = "none";
    modalBtnBack.style.display = "flex";
  }
}

btnAjouterPhoto.addEventListener("click", (event) => {
  etatInterne = "formulaire";
  lectureEtatInterne();
});

modalBtnBack.addEventListener("click", (event) => {
  etatInterne = "galerie";
  lectureEtatInterne();
});

// FONCTION VERIFIER TOUT LES CHAMPS ETC REMPLIT
const uploadBox = document.querySelector(".upload-photo"); // le bloc bleu
const inputPhoto = document.getElementById("photo"); 
const titre = document.getElementById("titre");
const categorie = document.getElementById("categorie");
const bouton = document.querySelector(".btnValider");
const erreurImage = document.getElementById("erreur-image");
const form = document.querySelector(".container-form form");

function etatFormulaire() {
  let formulaireValide = true;

  // Image
  if (inputPhoto.files.length === 0) {
    formulaireValide = false;
  } else {
    const fichier = inputPhoto.files[0];

    if (fichier.size > 4 * 1024 * 1024) {
      formulaireValide = false;
    }

    const typesAutorises = ["image/jpeg", "image/png"];
    if (!typesAutorises.includes(fichier.type)) {
      formulaireValide = false;
    }
  }

  // Titre
  if (titre.value.trim().length === 0) {
    formulaireValide = false;
  }

  // catégorie
  if (categorie.value === "") {
    formulaireValide = false;
  }

  // bouton
  bouton.disabled = !formulaireValide;
  return formulaireValide;
}
etatFormulaire()

inputPhoto.addEventListener("change", () => {
  etatFormulaire ();
});
titre.addEventListener("input", () => {
  etatFormulaire ();
});
categorie.addEventListener("change", () => {
  etatFormulaire ();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  
  if (!etatFormulaire()) {
    return;
  }
    // post api
});

//PREVIEW IMAGE
  
const previewImage = document.getElementById("preview-image");
  
inputPhoto.addEventListener("change", () => {
  if (inputPhoto.files.length === 0) {
    previewImage.style.display = "none";
    previewImage.src = "";
    uploadBox.classList.remove("has-image");
    return;
  }
  
  const fichier = inputPhoto.files[0];
  previewImage.src = URL.createObjectURL(fichier);
  previewImage.style.display = "block";
  uploadBox.classList.add("has-image");
  });