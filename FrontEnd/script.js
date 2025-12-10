// fonction appel API
async function  recupererTravaux() {
  const reponse = await fetch("http://localhost:5678/api/works");
  const travaux  = await reponse.json();
  console.log("voici mes travaux", travaux);

  for (let i = 0; i < travaux.length; i++) {
    const sectionTravaux = document.querySelector(".gallery");
    const imgElement = document.createElement("img");
    const titleElement = document.createElement("h3");
    const figureElement = document.createElement("figure");

    imgElement.src = travaux[i].imageUrl;
    titleElement.textContent = travaux[i].title;

    figureElement.appendChild(imgElement);
    figureElement.appendChild(titleElement);
    sectionTravaux.appendChild(figureElement);
  }
}
const appelRecupererTravaux = recupererTravaux();