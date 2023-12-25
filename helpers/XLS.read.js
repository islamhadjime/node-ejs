



const XLS = require('xlsx');



// const toSplitJSON = (rems) => { 
//     const newMaps = []
//     rems.map( (item) =>{
//         const obje =  {
//             numberN : Number(item[0][0]).trim(),
//             name: String(item[0][1]).trim(),
//             indefa:String(item[0][2]).trim()
//         }
//         newMaps.push(obje)
//     })
//     return newMaps
// }


const readEXL = (file) =>{
    const workbook = XLS.readFile(file);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData  = XLS.utils.sheet_to_json(worksheet, { header: 1 });
    return jsonData.splice(2)
}

module.exports = readEXL