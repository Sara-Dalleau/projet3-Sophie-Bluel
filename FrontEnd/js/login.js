//FORMULAIRE 

async function formulaire() {

  // Sélection du formulaire
const recupForm = document.querySelector(".formulaire");

// Écoute de l’événement submit
recupForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  console.log("submit ok")

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