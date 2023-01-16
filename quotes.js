const button = document.querySelector("button")
const form = document.querySelector("form")
let canvas = document.querySelector("main")
let animeSelect = ""



function animeFetch() {
    fetch("https://animechan.vercel.app/api/quotes")
    .then((response)=>{
        response.json()
        .then((animeList)=> {

            const label = document.createElement('label')

            label.setAttribute("for","qtns")
            label.textContent ="Click to pick an anime"
            form.append(label)

            const select = document.createElement('select')
    
            select.setAttribute('name','qtns')
            select.setAttribute('size','10')
            select.setAttribute('class', 'ppp')
            form.append(select)

            animeList.map( (oneqtn) => {

            const option = document.createElement('option')

            option.setAttribute('value',oneqtn.anime)
            option.textContent = oneqtn.anime
            select.append(option)
                                        })

            const  myBoton = document.createElement('button')

            myBoton.setAttribute('type','submit')
            myBoton.setAttribute('id','btn')
            myBoton.setAttribute('class','btm')
            myBoton.textContent = 'Get New Quotes'
            form.append(myBoton)

            select.addEventListener('click', (event) => {
            event.preventDefault()
            animeSelect = event.target.value

                                                        })
                 myBoton.addEventListener('click', (event) => {
                    event.preventDefault()
                    // here will delete the previous


                    let deleteCard = document.querySelectorAll(".animeCard")
                    if (deleteCard.length > 0) {
                        for (let h=0; h < deleteCard.length; h++) {
                           deleteCard[h].remove()
                        }
                    }

                    getQuote(animeSelect)
                 
                                                              })                                     
                            })
                        })
                    }  
    
function getQuote(anime){
    fetch(`https://animechan.vercel.app/api/quotes/anime?title=${anime}`)
    .then((response)=>{ 
        response.json()
        .then((animeQuotes) => {
           


            for (let i = 0; i < animeQuotes.length; i++) {
                const animeCard = document.createElement("article")
                animeCard.setAttribute("class", "animeCard")

                const h2 = document.createElement("h2")
                h2.textContent = `ANIME: ${animeQuotes[i].anime}`
                animeCard.append(h2)

                const para = document.createElement("p")
                para.textContent = `Quote: ${animeQuotes[i].quote}`
                animeCard.append(para)

                const inputText = document.createElement("input")
                inputText.setAttribute("type", "text")
                animeCard.append(inputText)

                const Answer = document.createElement("button")
                Answer.setAttribute("class", "Answer")
                Answer.textContent = "Submit"
                animeCard.append(Answer) 

                const Inv = document.createElement("p")
                Inv.setAttribute("class", "hidden")
                Inv.textContent = `Correct Answer: ${animeQuotes[i].character}`
                animeCard.append(Inv)

                const Inv2 = document.createElement("p")
                Inv2.setAttribute("class", "hidden")
                Inv2.textContent = `Please Type An Answer`
                animeCard.append(Inv2)

               



              canvas.prepend(animeCard)
            
               const ShowAnswer = document.querySelector(".Answer")
                ShowAnswer.addEventListener('click', (event) => {
                    event.preventDefault()

                if (inputText.value === "") 
                 {
                    Inv2.style.display = "inline"
                 }
                else
                 { 
                    Inv.style.display = "inline"
                    Inv2.style.display = "none"
                 }

                    
                })
        }
           
                                })
                      })
                        }




 animeFetch()         









