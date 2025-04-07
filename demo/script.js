function getRosePrice(){
    const date = document.getElementById('date').value;
    const resultDiv = document.getElementById('result');
    const loadingDiv = document.getElementById('loading');

    if (!date){
        alert("Select date");
        return;
    }

    loadingDiv.style.display = "block";
    resultDiv.innerHTML = '';

    // Request
    fetch(`/api/rose-price?date=${date}`)
        .then(response => response.json())
        .then(data => {
            loadingDiv.style.display = "none";
            if (data.success) {
                resultDiv.innerHTML = `Price: ${data.price}`
            } else {
                resultDiv.innerHTML = "can't find"
            }            
        })
        .catch(error => {
            loadingDiv.style.display = "none";
            console.error("Error: ", error)
            alert("Failed, try later")
        })
}