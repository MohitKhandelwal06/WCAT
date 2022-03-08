// 1) node Wcat.js filepath => displays the content of a file in a terminal
// node wcat.js f1.txt

const fs=require("fs");

let inputArr=process.argv.slice(2);
// console.log(inputArr);

let filesArr=[];
let optionArr=[];
//list files path in files array
for(let i=0;i<inputArr.length;i++){
    let firstChar=inputArr[i].charAt(0);
    if(firstChar=='-'){
        optionArr.push(inputArr[i]);
    }else{
        filesArr.push(inputArr[i]);
    }
}
// console.log("Files to be read are:"+filesArr);

for(let i=0;i<filesArr.length;i++){
    let doesExist=fs.existsSync(filesArr[i]);
    if(!doesExist){
        console.log("One or More File(s) do not exist");
        return;
    }
}

// Content read and appending
let content="";
for(let i=0;i<filesArr.length;i++){
    let fileContent=fs.readFileSync(filesArr[i]);
    content+=fileContent+"\n";
}

console.log(content);


let contentArr=content.split('\n');
for(let i=0;i<contentArr.length;i++){
    console.log(i+1 +" "+ contentArr[i]);
}
