async function login() {
    let password = document.getElementById("passwordField").value
    let username = document.getElementById("usernameField").value
    let errorText = document.getElementById("errorText")

    const res = await fetch("/login",
    {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            parcel: {
            password, username
            }
        })
    })
    const data = await res.json();

    if (data.userLoggedIn) {
        console.log("Logging in!");
    }

    if (data.message) {
        message = data.message
        console.log(message + "haha");
        errorText.innerText = message
    }

    if (data.userLoggedIn == true) {
        window.location.replace("admin")
    }

}