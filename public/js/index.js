

const arey_shali = [
  {id:"id_1", city:'шали',data:[]},
  {id:"id_3", city:'сержень-юрт',data:[]},
  {id:"id_5", city:'автуры',data:[]},
  {id:"id_4", city:'агишты',data:[]},
  {id:"id_9", city:'дуба-юрт',data:[]},
  {id:"id_7", city:'чири-юрт',data:[]},
  {id:"id_6", city:'белгатой',data:[]},
  {id:"id_8", city:'мескер-юрт',data:[]},
  {id:"id_2", city:'герменчук',data:[]},
  {id:"id_10", city:'новые атаги',data:[]},
]


const yellow = '#c1b853'


class Maps {

  constructor(data,dateRepert){
    this.data = data
    this.dateRepert = dateRepert,
    this.filterArey()
  }

  renderColor(number,element){
      if(number <= this.dateRepert.minNumber){
        element.style.fill = this.dateRepert.minColor
      }else if(number > this.dateRepert.srtNumber && number <= this.dateRepert.maxNumber){
        element.style.fill  = "#c1b853"
      }else if(number > this.dateRepert.maxNumber){
        element.style.fill  = this.dateRepert.maxColor
      }
  }

  getElement(data){
    const paths = document.querySelectorAll('#maps g')
    for (let i = 0; i < paths.length; i++) {
      for (let j = 0; j < data.length; j++) {
        if(paths[i].id == data[j].id){
          paths[i].querySelector('#number').innerHTML = data[j].srt
          const g = paths[i].querySelector('path')
          this.renderColor(data[j].srt,g)
        } 
      }
    }
  }

  srtFunction = (arry_number) =>{
      let sum = 0
      for (let i = 0; i < arry_number.length; i++) {
        sum += arry_number[i]    
      }
      return Math.floor(sum / arry_number.length);
    }

  async filterArey (){
      let srtSet = [];
      for (let i = 0; i < this.data.length; i++) {
        const sliterString = this.data[i].name.split('.')
        const getString = sliterString[sliterString.length-1].replace(/"/g, '').trim().toLowerCase()
        for (let j = 0; j < arey_shali.length; j++) {
          if(arey_shali[j].city == getString) {
            const arry_number = [
              parseFloat(this.data[i].issuance),
              parseFloat(this.data[i].lessons),
              parseFloat(this.data[i].logging),
              parseFloat(this.data[i].maintaining),
              parseFloat(this.data[i].those),
              parseFloat(this.data[i].timely),
            ]
            srtSet = this.srtFunction(arry_number)
            arey_shali[j].data.push(srtSet)
          }
        }
      }
      
      const filter_arry = arey_shali.map((item) =>{
        return{
          id:item.id,
          city:item.city,
          srt:this.srtFunction(item.data)
        }
      })
      return this.getElement(filter_arry)
    }

}


const fetchGet =  async (url) =>{
  try{
    const res = await fetch(url)
    if(res.ok){
      const data = await res.json()
      return data
    }
    return false
  }catch(e){
    throw e
  }
}

const init = async () =>{
  try{
    const hrefId = window.location.href.split('/')
    const data = await fetchGet(`http://localhost:3000/mapsget/${hrefId[hrefId.length-1]}`)
    return data
  }catch(e){
    console.log(e);
  }
}

// dinamiLine ===============
async function  dinamiLine() {
  const data =  await init()
  const barElements = document.querySelectorAll('.dinamik__bar-item')
  for (let i = 0; i < barElements.length; i++) {
      const getData = barElements[i].querySelector('.dinamik__bar-bar').getAttribute('data-percentage')
      const setData = barElements[i].querySelector('.dinamik__bar-bar')
      setData.style.height = `${getData}%`
      if(getData <= Number(data.dateRepert.minNumber)){
        setData.style.backgroundColor = data.dateRepert.minColor
      }else if(getData > Number(data.dateRepert.srtNumber) && getData <= Number(data.dateRepert.maxNumber)){
        setData.style.backgroundColor  = yellow
      }else if(getData > Number(data.dateRepert.maxNumber)){
        setData.style.backgroundColor  = data.dateRepert.maxColor
      }
      
  }
}

// PROGRESS ==================
async function progress() {
  const data =  await init()
  const progresElements = document.querySelectorAll(".dinamik__barser-item")
  for (let i = 0; i < progresElements.length; i++) {
    const pregressIndex = progresElements[i].querySelector('progress')
    const pregressNumber =progresElements[i].querySelector('progress').value

    if(pregressNumber <= Number(data.dateRepert.minNumber)){
      pregressIndex.classList.add(`${data.dateRepert.minColor}`)
    }else if(pregressNumber > Number(data.dateRepert.srtNumber) && pregressNumber <= Number(data.dateRepert.maxNumber)){
      pregressIndex.classList.add('yellow')
    }else if(pregressNumber > Number(data.dateRepert.maxNumber)){
      pregressIndex.classList.add(`${data.dateRepert.maxColor}`)
    }
    
  }
}

// TABLE =====================
async function table() {
  const data =  await init()
  const tableContent = document.querySelectorAll("#table_number")
  for (let i = 0; i < tableContent.length; i++) {
    const tableNumber = tableContent[i].innerText

    if(tableNumber <= Number(data.dateRepert.minNumber)){
      tableContent[i].style.backgroundColor = data.dateRepert.minColor
    }else if(tableNumber > Number(data.dateRepert.srtNumber) && tableNumber <= Number(data.dateRepert.maxNumber)){
      tableContent[i].style.backgroundColor = yellow
    }else if(tableNumber > Number(data.dateRepert.maxNumber)){
      tableContent[i].style.backgroundColor = data.dateRepert.maxColor
    }
  }
}

// MAPS =================
async function  maps() {
  const data =  await init()
  const maps = new Maps(data.data,data.dateRepert)
}



function main() {
  maps()
  table()
  progress()
  dinamiLine()
}

main()






// const srtFunction = (arry_number) =>{
//   let sum = 0
//   for (let i = 0; i < arry_number.length; i++) {
//     sum += arry_number[i]    
//   }
//   return Math.floor(sum / arry_number.length);
// }

// const filterArey =  async ({data}) =>{
//   for (let i = 0; i < data.length; i++) {
//     const sliterString = data[i].name.split('.')
//     const getString = sliterString[sliterString.length-1].replace(/"/g, '').trim().toLowerCase()
//     for (let j = 0; j < arey_shali.length; j++) {
//       if(arey_shali[j].city == getString) {
//         const arry_number = [
//           parseFloat(data[i].issuance),
//           parseFloat(data[i].lessons),
//           parseFloat(data[i].logging),
//           parseFloat(data[i].maintaining),
//           parseFloat(data[i].those),
//           parseFloat(data[i].timely),
//         ]
//         srtSet = srtFunction(arry_number)
//         arey_shali[j].data.push(srtSet)
//         continue
//       }
//     }
//   }
//   const filter_arry = arey_shali.map((item) =>{
//     return{
//       id:item.id,
//       city:item.city,
//       srt:srtFunction(item.data)
//     }
//   })
//   return filter_arry
// }


// const fetchGet =  async (url) =>{
//   try{
//     const res = await fetch(url)
//     if(res.ok){
//       const data = await res.json()
//       config = {
//         minColor:data.dateRepert.minColor,
//         srtColor:data.dateRepert.srtColor,
//         maxColor:data.dateRepert.maxColor,
//         minNumber:data.dateRepert.minNumber,
//         srtNumber:data.dateRepert.srtNumber,
//         maxNumber:data.dateRepert.maxNumber,
//       }
//       console.log(data.dateRepert);
//       return filterArey(data)
//     }
//     return false
//   }catch(e){
//     throw e
//   }
// }


// // TABLE 
// function table() {
//   const tableContent = document.querySelectorAll("#table_number")
//   for (let i = 0; i < tableContent.length; i++) {
//     const tableNumber = tableContent[i].innerText
//     if(tableNumber <= 60){
//       tableContent[i].style.backgroundColor = red
//     }else if(tableNumber > 60 && tableNumber <= 90){
//       tableContent[i].style.backgroundColor = yellow
//     }else if(tableNumber > 90){
//       tableContent[i].style.backgroundColor = green
//     }
//   }
// }


// // DINAMIK PROGRESS
// function progress() {
//   const progresElements = document.querySelectorAll(".dinamik__barser-item")
//   for (let i = 0; i < progresElements.length; i++) {
//     const pregressIndex = progresElements[i].querySelector('progress')
//     const pregressNumber =progresElements[i].querySelector('progress').value
//     if(pregressNumber <= 60){
//       pregressIndex.classList.add('red')
//     }else if(pregressNumber > 60 && pregressNumber <= 90){
//       pregressIndex.classList.add('yellow')
//     }else if(pregressNumber > 90){
//       pregressIndex.classList.add('green')
//     }
    
//   }
// }


// //  MAPaS
// async function  maps() {
//   const hrefId = window.location.href.split('/')
//   const data = await fetchGet(`http://localhost:3000/mapsget/${hrefId[hrefId.length-1]}`)
//   const paths = document.querySelectorAll('#maps g')
//   for (let i = 0; i < paths.length; i++) {
//     for (let j = 0; j < data.length; j++) {
//       if(paths[i].id == data[j].id){
//         paths[i].querySelector('#number').innerHTML = data[j].srt
//         const g = paths[i].querySelector('path')
//         rebendeColor(data[j].srt,g)
//       } 
//     }

//   }
// }



// // DINAMIK LINE
// function  dinamiLine() {
//   const barElements = document.querySelectorAll('.dinamik__bar-item')
//   for (let i = 0; i < barElements.length; i++) {
//       const getData = barElements[i].querySelector('.dinamik__bar-bar').getAttribute('data-percentage')
//       const setData = barElements[i].querySelector('.dinamik__bar-bar')
//       setData.style.height = `${getData}%`
//       if(getData <= 60){
//         setData.style.backgroundColor = red
//       }else if(getData > 60 && getData <= 90){
//         setData.style.backgroundColor  = yellow
//       }else if(getData > 90){
//         setData.style.backgroundColor  = green
//       }
      
//   }
// }


// function rebendeColor(number,element) {
//   console.log(config);
//   if(number <= 60){
//     element.style.fill = red
//   }else if(number > 60 && number <= 90){
//     element.style.fill  = yellow
//   }else if(number > 90){
//     element.style.fill  = green
//   }
// }


// function init() {
//   dinamiLine()
//   maps()
//   progress()
//   table()
// }

// init()