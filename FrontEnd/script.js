// Fonction asynchrone qui récupère les travaux depuis l'API
async function  recupererTravaux() {
  // Appel à l'API pour récupérer les travaux
  const reponse = await fetch("http://localhost:5678/api/works");
  // Transformation de la réponse en tableau d'objets JavaScript
  const travaux  = await reponse.json();

  // Vérification dans la console que les données sont bien récupérées
  console.log("voici mes travaux", travaux);

  // Boucle qui parcourt chaque travail du tableau
  for (let i = 0; i < travaux.length; i++) {
  // Sélection de la galerie dans le DOM (parent)
    const sectionTravaux = document.querySelector(".gallery");

  // Création des éléments HTML
    const imgElement = document.createElement("img");
    const titleElement = document.createElement("h3");
    const figureElement = document.createElement("figure");

    // Insertion de l'image et du titre dans les éléments créés
    imgElement.src = travaux[i].imageUrl;
    titleElement.textContent = travaux[i].title;

    // Ajout de l'image et du titre dans la balise figure, puis ajout de la figure complète dans la galerie
    figureElement.appendChild(imgElement);
    figureElement.appendChild(titleElement);
    sectionTravaux.appendChild(figureElement);
  }
}
//Appel de la fonction
const appelRecupererTravaux = recupererTravaux();