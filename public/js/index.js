let recentBox = document.getElementById("recentBox")
let allBox = document.getElementById("allBox")

async function add() {
    let first = document.getElementById("first").value
    let last = document.getElementById("last").value
    console.log("First name is: "+first);
    console.log("Last name is: "+last);

    const res = await fetch("/createReadUpdate",
        {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                parcel: {
                first, last
                }
            })
        })
        const data = await res.json()
        console.log(data);

}

async function getLatest() {
const res = await fetch("/getLatest",
{
    method: 'GET',
    headers: {
        "Content-Type": "application/json"
    }
})

const data = await res.json()

recentBox.innerHTML = ""

data.releases.forEach(e => {
    let dF = new Date(e.date._seconds * 1000 + e.date._nanoseconds/1000000)
    console.log(dF);
    let displayDate = `${dF.getDate()}.${dF.getMonth()}.${dF.getFullYear()}, ${dF.getHours()}:${dF.getMinutes()}:${dF.getSeconds()}`

    let item = `
    <div>
    <h2>${e.name}</h2>
    <p>${e.brand}</p>
    <p>${e.model}</p>
    <p>$${e.price}</p>
    <p>${e.articlenumber}</p>
    <p>${displayDate}</p>   
    </div>
    `
    recentBox.innerHTML += item

    console.log(e);
});
}

async function getAll() {
    const res = await fetch("/getAll",
    {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    })
    
    const data = await res.json()
    
    allBox.innerHTML = ""
    
    data.releases.forEach(e => {
        let dF = new Date(e.date._seconds * 1000 + e.date._nanoseconds/1000000)
        console.log(dF);
        let displayDate = `${dF.getDate()}.${dF.getMonth()}.${dF.getFullYear()}, ${dF.getHours()}:${dF.getMinutes()}:${dF.getSeconds()}`
    
        let item = `
        <div>
        <h2>${e.name}</h2>
        <p>${e.brand}</p>
        <p>${e.model}</p>
        <p>$${e.price}</p>
        <p>${e.articlenumber}</p>
        <p>${displayDate}</p>   
        </div>
        `
        allBox.innerHTML += item
    
        console.log(e);
    });
    }

getLatest()
getAll()


async function remove() {
    let first = document.getElementById("first").value
    console.log("First name is: "+first);

    const res = await fetch("/remove",
        {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                parcel: {
                first
                }
            })
        })
        const data = await res.json()
        console.log(data);

}