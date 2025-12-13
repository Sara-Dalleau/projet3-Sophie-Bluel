// Creation variable globale pour réutiliser le tableau travaux 
let tableauElement = [];
// Fonction asynchrone qui récupère les travaux depuis l'API
async function recupererTravaux() {
  const reponse = await fetch("http://localhost:5678/api/works");
  const travaux = await reponse.json();

  tableauElement = travaux;
}

//Fonction qui récupère les filtres 
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

// Fonction pour rendre mes filtres interactifs
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

// Fonction qui permet d'afficher dynamiquement les travaux dans la galerie
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

//Fonction d'initialisation: attend que les travaux et filtres soient récupérés et affichés, puis active les event sur boutons filtres
async function init () {
  await recupererTravaux();
  afficherTravaux(tableauElement);

  await recupererFiltres();
  btnFiltres()
}
init(); 

//FORMULAIRE 
  async function formulaire() {
    // Sélection du formulaire
  const recupForm = document.querySelector(".formulaire");

  // Écoute de l’événement submit
  recupForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    console.log("submit ok ")
    // Récupération des valeurs email et password
    const inputEmail = document.getElementById("email").value;
    const inputPassword = document.getElementById("password").value;
    // Envoi d’une requête POST /users/login
    const reponse = await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      // Body en JSON
      body: JSON.stringify({ email: inputEmail, password: inputPassword }),
    });
    // Analyse de la réponse :
    const status = reponse.status;
    // si ok → récupérer le token
    if (status === 200) {
      const data = await reponse.json();
      const token = data.token;
      // stocker le token dans localStorage
      localStorage.setItem("token", token);
      // redirection vers l’accueil
      window.location.href = "index.html";
    } else { // si erreur → afficher / mettre à jour un message d’erreur dans le DOM
      const sectionErreur = document.querySelector(".msgErreur");
      sectionErreur.innerHTML = "";

      const msgErreur = document.createElement("p");
      msgErreur.textContent = "E-mail ou mot de passe incorrect";
      
      sectionErreur.appendChild(msgErreur);
    }
  });
  }
  
  formulaire ();
  
  // FONCTION MODE EDITION

  function modeEdition () {
  const etat = localStorage.getItem("token");

  if (etat !== null) {
    //filtres cachés
    const cacherFiltres = document.querySelector(".filtres");
    cacherFiltres.style.display = "none";
    // Login devient logout
    let btnLogin = document.querySelector(".btnLogin");
    btnLogin.setAttribute("href", "#");
    btnLogin.textContent ="logout";
    // Au click logout retour mode normal
    btnLogin.addEventListener("click", () => {
      localStorage.removeItem("token"); //suppression du token
      (window.location.href = "index.html") // redirection page d'accueil
    })
    //Création Bouton modifier
    const btnModifier = document.querySelector(".btnModifier");

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
    const bandeauEdition = document.querySelector(".bandeau-edition");
    bandeauEdition.style.display = "flex";
  }
}
modeEdition();