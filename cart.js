// Fonction pour afficher la liste des trajets
function displayTravelsInCart() {
  fetch("http://localhost:3000/cart/allCart")
    .then((response) => response.json())
    .then((travelCart) => {
      // Initialisation de la div
      const testDiv = document.querySelector("#test");
      testDiv.textContent = "";

      // S'il y a des trajets dans le panier
      if (travelCart.result) {
        for (let travel of travelCart.travels) {
          console.log(travel);

          // Récupérer l'heure
          const date = new Date(travel.travelInfos.date);
          const heure = date.getHours().toString().padStart(2, "0");
          const minutes = date.getMinutes().toString().padStart(2, "0");

          // Ajout des voyages dans des divs individuelles
          testDiv.innerHTML += `<div><p>${travel.travelInfos.departure} > ${travel.travelInfos.arrival}</p>
                <p>${heure}:${minutes}</p>
                <p class="prix">${travel.travelInfos.price}€</p>
                <p class="delete-travel" id="${travel.travelInfos._id}" >bouton</p></div>`;
        }

        // Calcul du total et ajout à la div
        let prix = document.querySelectorAll(".prix");
        let total = 0;
        for (let p of prix) {
          let prixTravel = Number(p.textContent.replace("€", ""));
          total += prixTravel;
        }
        testDiv.innerHTML += `<div><p>Total: ${total}€</p> <p id="purchase">Purchase</p></div>`;
      }

      // Sinon
      else {
        // Initialisation de la div
        document.querySelector("#test").innerHTML = `<p>No booking yet.</p>
            <p>Why not plan a trip?</p>`;
      }

      // On ajoute un écouteur sur chaque bouton delete
      deleteButtons = document.querySelectorAll(".delete-travel");
      for (let button of deleteButtons) {
        button.addEventListener("click", () => {
          let id = button.getAttribute("id");
          fetch(`http://localhost:3000/cart/deleteTrip/${id}`, {
            method: "DELETE",
          })
            .then((response) => response.json())
            .then(() => {
              console.log("Travel successfully deleted");
              // Rafraîchir la liste des trajets après la suppression
              displayTravelsInCart();
            });
        });
      }

      // On ajoute un écouteur sur le bouton purchase
      document.querySelector("#purchase").addEventListener("click", () => {
        console.log("clic");
        // On transfère à bookings
        fetch("http://localhost:3000/bookings/purchase", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        })
          .then((response) => response.json())
          .then(() => {
            console.log("Cart successfully transfered to Bookings");
          });

        // On supprime le panier
        fetch("http://localhost:3000/cart/emptyCart", {
          method: "DELETE",
        })
          .then((response) => response.json())
          .then(() => {
            console.log("Cart successfully deleted");
          });

        // On redirige vers booking.html
        window.location.assign("booking.html");
      });
    });
}

// Appel de la fonction pour afficher la liste des trajets
displayTravelsInCart();
