fetch("http://localhost:3000/bookings/allBookings")
  .then((response) => response.json())
  .then((travelBooking) => {
    // Initialisation de la div
    const testDiv = document.querySelector("#test");
    testDiv.textContent = "";

    // S'il y a des trajets dans booking
    console.log(travelBooking);
    if (travelBooking.result) {
      for (let travel of travelBooking.travels) {
        // Récupérer l'heure
        const date = new Date(travel.travelInfos.date);
        const heure = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");

        // Nombre d'heures avant le départ
        const dateNow = new Date(); // date à l'heure du browse
        const difference = Math.floor((date - dateNow) / (1000 * 60 * 60)); // différence en heures

        // Ajout des voyages dans des divs individuelles
        testDiv.innerHTML += `<div><p>${travel.travelInfos.departure} > ${travel.travelInfos.arrival}</p>
                    <p>${heure}:${minutes}</p>
                    <p>${travel.travelInfos.price}€</p>
                    <p>Departure in ${difference} hours</p></div>`;
      }

      testDiv.innerHTML += `<div><p>Enjoy your travels with Tickethack!</p></div>`;
    } else {
      document.querySelector("#test").innerHTML = `<p>No booking yet.</p>
            <p>Why not plan a trip?</p>`;
    }
  });
