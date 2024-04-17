fetch("http://localhost:3000/bookings/allBookings")
  .then((response) => response.json())
  .then((travelBooking) => {
    // S'il y a des trajets dans booking
    console.log(travelBooking);
    if (travelBooking.result) {

         // Ajout du header
         document.querySelector("#myBookings").innerHTML = 
         `<p4 id="myBookingsLineOne">My bookings</p4>`;

      for (let travel of travelBooking.travels) {


        // Récupérer l'heure
        const date = new Date(travel.travelInfos.date);
        const heure = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");

        // Nombre d'heures avant le départ
        const dateNow = new Date(); // date à l'heure du browse
        const difference = Math.floor((date - dateNow) / (1000 * 60 * 60)); // différence en heures

        // Ajout des voyages dans des divs individuelles
        document.querySelector("#myBookings").innerHTML += `<div class="trip">
        <p>${travel.travelInfos.departure} > ${travel.travelInfos.arrival}</p>
                    <p>${heure}:${minutes}</p>
                    <p>${travel.travelInfos.price}€</p>
                    <p>Departure in ${difference} hours</p>
        </div>`;

                    
      }

      document.querySelector("#myBookings").innerHTML += 
      `<div class="underlineBar"></div>
      <div><p class="congratMessage">Enjoy your travels with Tickethack!</p></div>
      `;

    } else {
      document.querySelector("#myBookings").innerHTML = `<p>No booking yet.</p>
            <p>Why not plan a trip?</p>`;
    }
  });
