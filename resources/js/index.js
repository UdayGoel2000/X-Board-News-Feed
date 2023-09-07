const generateId = () => Math.random().toString(36).substr(2,9);

const createAccordionItem = (title,id,CurrentIdx) => {
    return `
    <div class="accordion-item" id = card${id}>
    <h2 class="accordion-header" id = "heading${id}">
    <button class="accordion-button ${CurrentIdx ===0 ? '':'collapsed'}" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${id}" aria-expanded="true" aria-controls="#collapse${id}">
    ${title}
    </button>
    </h2>
    <div id="collapse${id}" class="accordion-collapse collapse ${CurrentIdx === 0?'show':''}" aria-labelledby="heading${id}" data-bs-parent="#mainAccordion">
    <div class="accordion-body">
    </div>
    </div>
    `;
};

const createCarouselOuter = (id, innneId) => {
    return `
    <div id="maincarousel${id}" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-inner" id = "${innneId}">
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#maincarousel${id}" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#maincarousel${id}" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
    </button>
    </div>
    `;
};

const createCarouselItem = (item,active) => {
    return `
    <div class="carousel-item card border-0 ${active?"active":""}">
          <a style = "color: black; text-decoration: none;" href="${item.link}" target="_blank">
            <img src="${item.enclosure.link}" class="d-block object-fit-cover h-50 w-100" alt="..." />
            <div class="card-body">
              <h3 class = "card-title cardHead">${item.title}</h3>
              <p class="card-text cardText1 p1">${item.author}</p>
              <p class = "Ellipse p1"></p> 
              <p class="card-text cardText1 p1">${item.pubDate}</p>
              <p class="card-text cardText2">${item.content}</p>
            </div>
          </a>
        </div>
    `;
};

const init = async () => {
    for(let i= 0;i<magazines.length;i++){
        let url = magazines[i]
        let magResp = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURI(url)}`)
        let magData = await magResp.json()
        
        //create Accordian item
        let accordionId = generateId();
        let accordion = createAccordionItem(magData["feed"]["title"],accordionId,i);
        document.getElementById('mainAccordion').innerHTML += accordion;

        //create carousel item
        let carouselId = generateId();
        let carouselInnerId = generateId();
        let carousel = createCarouselOuter(carouselId,carouselInnerId);
        document.getElementById(`collapse${accordionId}`).innerHTML = carousel;

        //Add carousel item in carousel
        let items = magData["items"];
        for (j in items){
            let carouselItem = createCarouselItem(items[j],j==0)
            document.getElementById(`${carouselInnerId}`).innerHTML += carouselItem
        }
    }
};

init()