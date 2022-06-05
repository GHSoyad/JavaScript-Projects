document.getElementById('get_jokes').addEventListener('click', getJokes);

function getJokes(){
    let xhr = new XMLHttpRequest();
    let number = document.getElementById('jokes_number').value

    xhr.open('GET', `http://api.icndb.com/jokes/random/${number}`, true);

    xhr.onprogress = function(){
        document.getElementById('show_jokes').innerHTML = `<h5 style="text-align: center; color: crimson">Loading...</h5>`
    }

    xhr.onload = function(){
        if(this.status === 200 && number >= 1){
            let data = JSON.parse(this.responseText);
            let jokes = data.value;
            let output = '<ol>';

            jokes.forEach(item => {
                output += `<li> ${item.joke} </li>`
            })
            output += '</ol>'

            document.getElementById('show_jokes').innerHTML = output
        }else{
            alert('Please enter a valid number!!')
        }
    }

    xhr.send();
    console.log(xhr)
}