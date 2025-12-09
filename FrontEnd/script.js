// fonction appel API
async function  recupererTravaux() {
  const reponse = await fetch("http://localhost:5678/api/works");
  const travaux  = await reponse.json();
  for (let i = 0; i < travaux.length; i++) {
    //creer balises img et title pour afficher les travaux + appendchild + ajout
    // class a recuperer gallery
  }
}
// await (recupererTravaux())

