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