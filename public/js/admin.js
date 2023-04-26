let Fname = document.getElementById("nameField").value
let Fbrand = document.getElementById("brandField").value
let Fmodel = document.getElementById("modelField").value
let Fprice = document.getElementById("priceField").value
let Farticle = document.getElementById("articleField").value

async function addShoes() {
    let shoe = {
        name: Fname,
        brand: Fbrand,
        model: Fmodel,
        price: Fprice,
        article: Farticle
    }

    console.log(shoe);
    
        const res = await fetch("/addShoes",
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    parcel: {
                    shoe
                    }
                })
            })
            const data = await res.json()
            console.log(data);
    
}