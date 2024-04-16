fetch("http://localhost:3000/cart/allCart")
  .then((response) => response.json())
  .then((travelCart) => {
    if (travelCart) {
      // Initialisation de la div
      document.querySelector("#test").textContent = "";

      for (let travel of travelCart.travels) {
        console.log(travel);

        // Récupérer l'heure
        const date = new Date(travel.travelInfos.date);
        const heure = date.getHours();
        const minutes = date.getMinutes();

        // Ajout des voyages dans des divs individuelles
        document.querySelector(
          "#test"
        ).innerHTML += `<div><p>${travel.travelInfos.departure} > ${travel.travelInfos.arrival}</p>
            <p>${heure}:${minutes}</p>
            <p class="prix">${travel.travelInfos.price}€</p>
            <p>boutton</p></div>`;
      }

      // On ajoute une div pour le total
      let prix = document.querySelectorAll(".prix");
      let total = 0;
      for (let p of prix) {
        let prixTravel = Number(p.textContent.replace("€", ""));
        total += prixTravel;
      }
      document.querySelector(
        "#test"
      ).innerHTML += `<div><p>Total: ${total}€</p> <p>Purchase</p></div>`;
    } else {
      // Initialisation de la div
      document.querySelector("#test").textContent = "";

      // Ajout du message d'erreur
      document.querySelector("#test").innerHTML += `<p>No booking yet.</p>
        <p>Why not plan a trip?</p>`;
    }
  });
