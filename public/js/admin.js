async function addShoes() {
let Fname = document.getElementById("nameField")
let Fbrand = document.getElementById("brandField")
let Fmodel = document.getElementById("modelField")
let Fprice = document.getElementById("priceField")
let Farticle = document.getElementById("articleField")
    let shoe = {
        name: Fname.value,
        brand: Fbrand.value,
        model: Fmodel.value,
        price: Fprice.value,
        article: Farticle.value
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