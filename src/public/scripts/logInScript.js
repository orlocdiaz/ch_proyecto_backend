async function loginForm(email, password) {
  await fetch(`/api/users/login/?email=${email}&password=${password}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((res) =>
      res.status === "OK"
        ? (location.href = "/products")
        : alert("Invalid Credentials")
    )
    .then((res) => {
      console.log(res.message);
    })
    .catch((error) => {
      console.log("Error!");
    });
}
