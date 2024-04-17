// Fonction pour afficher la liste des trajets
function displayTravelsInCart() {
  fetch("https://tickethack-backend-juvo.vercel.app/cart/allCart")
    .then((response) => response.json())
    .then((travelCart) => {

      // S'il y a des trajets dans le panier
      if (travelCart.result) {

        // Initialisation de la div
      document.querySelector("#myBookings").textContent = "";

        // Ajout du header
        document.querySelector("#myBookings").innerHTML += 
         `<p4 id="myBookingsLineOne">My cart</p4>`;

        for (let travel of travelCart.travels) {
          console.log(travel);

          // Récupérer l'heure
          const date = new Date(travel.travelInfos.date);
          const heure = date.getHours().toString().padStart(2, "0");
          const minutes = date.getMinutes().toString().padStart(2, "0");

          // Ajout des voyages dans des divs individuelles
          document.querySelector("#myBookings").innerHTML += `
          
          <div class="trip">
            <p class="foundTrip">${travel.travelInfos.departure} > ${travel.travelInfos.arrival}</p>
            <p class="departureTime">${heure}:${minutes}</p>
            <p class="ticketPrice">${travel.travelInfos.price}€</p>
            <button type="button" class="btn-delete" id="${travel.travelInfos._id}">X</button>
          </div>
                `;
        }

        // Calcul du total et ajout à la div
        let prix = document.querySelectorAll(".ticketPrice");
        let total = 0;
        for (let p of prix) {
          let prixTravel = Number(p.textContent.replace("€", ""));
          total += prixTravel;
        }
        document.querySelector("#myBookings").innerHTML += 
        `<div id="purchaseTotal">
        <p5 id="myTotal">Total: ${total}€</p5>
        <button type="button" id="btn-purchase">Purchase</button>
      </div>`;

        // On ajoute un écouteur sur chaque bouton delete
        deleteButtons = document.querySelectorAll(".btn-delete");
        for (let button of deleteButtons) {
          button.addEventListener("click", () => {
            let id = button.getAttribute("id");
            fetch(`https://tickethack-backend-juvo.vercel.app/cart/deleteTrip/${id}`, {
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
        document.querySelector("#btn-purchase").addEventListener("click", () => {
          console.log("clic");
          // On transfère à bookings
          fetch("https://tickethack-backend-juvo.vercel.app/bookings/purchase", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
          })
            .then((response) => response.json())
            .then(() => {
              console.log("Cart successfully transfered to Bookings");
            });

          // On supprime le panier
          fetch("https://tickethack-backend-juvo.vercel.app/cart/emptyCart", {
            method: "DELETE",
          })
            .then((response) => response.json())
            .then(() => {
              console.log("Cart successfully deleted");
            });

          // On redirige vers booking.html
          window.location.assign("booking.html");
        });
      }

      // Sinon
      else {
        // Initialisation de la div
        document.querySelector("#myBookings").innerHTML = `<p>No tickets in your cart.</p>
        <p>Why not plan a trip?</p>`;
      }
    });
}

// Appel de la fonction pour afficher la liste des trajets
displayTravelsInCart();
