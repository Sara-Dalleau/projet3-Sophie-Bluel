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
  btnFiltres();
}
init(); 