



const XLS = require('xlsx');



const toSplitJSON = (rems) => { 
    const arrayData = []
    rems.map((item) =>{
        if(item.length > 0){
            const obje = {
                name: item[1].trim(),
                lessons:item[2],
                issuance: item[3],
                those:item[4],
                maintaining: item[5],
                marks:item[6].trim(),
                logging: item[7],
                timely:item[8],
            }
            arrayData.push(obje)
        }
    })
    return arrayData
}


const readEXL = (file) =>{
    const workbook = XLS.readFile(file);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData  = XLS.utils.sheet_to_json(worksheet, { header: 1 });
    return toSplitJSON(jsonData.splice(3))
}

module.exports = readEXL