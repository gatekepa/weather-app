const weatherForm = document.getElementById("get-weather")
const messageOneEl = document.getElementById("message-1")
const messageTwoEl = document.getElementById("message-2")


weatherForm.addEventListener("submit", (e) => {
    e.preventDefault()
    messageOneEl.innerHTML = "<img id='loading' src='/images/loading.gif'>"
    messageTwoEl.textContent = ""
    const address = e.target[0].value.trim()
    fetch(`/weather?address=${address}`).then((response) => {
        response.json().then((data) => {
            messageOneEl.innerHTML = ""
            if (data.error) {
                return messageOneEl.textContent = data.error
            }
            messageOneEl.textContent = data.location
            messageTwoEl.textContent = data.forecast
        })
    })
})