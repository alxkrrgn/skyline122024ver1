fetch("https://backend.skyline-wealth.com/send-mail.php", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
        name: "John Doe from Backend try all phonenumber and question",
        email: "johndoe@example.com",
        message: "Hello, I am interested in your services! 0402 1:42pm",
        subject: "Inquiry about services 0402 1:42pm",
    }),
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error("Error:", error));
