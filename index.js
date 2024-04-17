document.querySelector("#btn-add").addEventListener("click", function () {
    // input's html values 
        const departure = document.querySelector('#add-departure').value;
        const arrival = document.querySelector('#add-arrival').value;
        let timestamp = document.querySelector('#today').value
    timestamp = new Date(timestamp).getTime();
    
    
    
      fetch(`http://localhost:3000/travels/${departure}/${arrival}/${timestamp}/`)
      .then(response => response.json())
      .then(data => {
        document.querySelector('#content-right').textContent = "";
        if(data.result) {
          for(const travel of data.travels) {
            const date = new Date(travel.date)
            const heure = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
            
            document.querySelector('#content-right').innerHTML += `
            <div class="trip">
            <p class="foundTrip">${travel.departure} > ${travel.arrival}</p>
            <p class="departureTime">${heure}:${minutes}</p>
            <p class="ticketPrice">${travel.price}€</p>
            <button type="button" class="btn-book" id="${travel._id}">Book</button>
          </div>
            `
          }
          const bookBtn = document.querySelectorAll(".btn-book");
          for (let button of bookBtn) {
            button.addEventListener('click', function () {
              const id = button.getAttribute("id"); 
              fetch('http://localhost:3000/cart/addToCart', {
                method: "POST",
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({travelInfos: id})
              })
              .then(res => res.json())
              .then((data) => {
                if(data) {
                  console.log("travel added successfully");
                  window.location.assign("cart.html");

                } 
              })
            })
          }
        } else {
          console.log("Travel does not exist");
          document.querySelector('#content-right').innerHTML += 
          `<img
          src="images/notfound.png"
          alt="train icon"
          class="train-icon"
        />
        <hr class="line" />
        <div id="search-message">
          <p class="message">No trip found.</p>`

        }
        
      })


    });
    