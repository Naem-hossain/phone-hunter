

const loadData = (name) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${name}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayData(data.data))
}

const displayData = (datas) => {
    const container = document.getElementById('phone-container');
    const error  = document.getElementById('error-message');
    const spiner = document.getElementById('spiner-div');
    if(datas.length === 0){
         error.classList.remove('d-none')
         spiner.classList.remove('d-none')
    }
    else{
        error.classList.add('d-none')
        spiner.classList.add('d-none');
    }
    container.textContent = '';
    // datas = datas.slice(0,12);
    datas.forEach (data => {
        const newContainer = document.createElement('div');
        newContainer.classList.add('col');
        newContainer.innerHTML =`
                    <div class="card">
                        <img src="${data.image}" class="card-img-top h-50 p-2" alt="...">
                        <div class="card-body">
                          <h5 class="card-title">${data.phone_name}</h5>
                          <h6>Brand: ${data.brand}</h6>
                          <div class="d-flex justify-content-center align-items-center"><button type="button" class="btn btn-primary  text-center w-50 my-3" data-bs-toggle="modal" data-bs-target="#phonehuntermodal"  onclick="seeMore('${data.slug}')" >See more</button></div>
                        </div>
                        </div>
                       `
        container.appendChild(newContainer);   
    })
    // morePhone.classList.remove('d-none');
}
const inputData = () => {
    const inputField = document.getElementById('phone-input-field');
    const inputValue = inputField.value;
    return inputValue;
}

document.getElementById('search-btn').addEventListener('click', function(){
     loadData(inputData())

})

document.getElementById('phone-input-field').addEventListener("keypress", function(e) {
    if (e.key === "Enter"){
        loadData(inputData())
    }
});

const seeMore = (id) => {
    fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    .then(res => res.json())
    .then(data => seeMoreData(data.data))
}
// phone hunter modal Label
const seeMoreData = (info) => {
   document.getElementById('phonehuntermodalLabel').innerText = 'Brand:'+ '  ' + info.brand;
   document.getElementById('phone-name').innerText ='Name : ' + '  ' + info.name;
   document.getElementById('main-features').innerText = `${info.mainFeatures.storage} / ${info.mainFeatures.chipSet}`;
}

// loadData('iphone')

