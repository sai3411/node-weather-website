const weather_form = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#msg1')
const msg2 = document.querySelector('#msg2')

msg1.textContent = ''
msg2.textContent = ''

weather_form.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    fetch('http://localhost:3000/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if (data.error){
                msg1.textContent = data.error
            }else{
                msg1.textContent = data.summary
                msg2.textContent = data.location 
            }
        })
    })
})