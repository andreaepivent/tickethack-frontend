

document.querySelector("#btn-search").addEventListener("click", function () {
    // input's html values 
        const departure = document.querySelector('#btn-departure').value;
        const arrival = document.querySelector('#btn-arrival').value;
        let timestamp = document.querySelector('#btn-date').value
    timestamp = new Date(timestamp).getTime();
    
    
    
      fetch(`http://localhost:3000/travels/${departure}/${arrival}/${timestamp}/`)
      .then(response => response.json())
      .then(data => {
        document.querySelector('#result').textContent = "";
        if(data.result) {
          for(const travel of data.travels) {
            const date = new Date(travel.date)
            const heure = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
            
            document.querySelector('#result').innerHTML += `
              <h1>${travel.departure} > ${travel.arrival}</h1>
              <h1>${heure}:${minutes}</h1>
              <h1>price: ${travel.price}</h1>
              <button class="book-button" id="${travel._id}">Book</button>
            `
          }
          const bookBtn = document.querySelectorAll(".book-button");
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
        }
        
      })


    });
    