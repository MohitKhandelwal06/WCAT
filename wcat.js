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

// console.log(content);


let contentArr=content.split('\n');
// console.table(contentArr);
// check if -s is present in the options array
let isSPresent=optionArr.includes("-s");
function sOption(contentArr){
    for(let i=1;i<contentArr.length;i++){
        if((contentArr[i]=="\r"||contentArr[i]=="") && contentArr[i-1]=="\r"){
            contentArr[i]=null;
        }else if((contentArr[i]=="\r"||contentArr[i]=="") && contentArr[i-1]==null){
            contentArr[i]=null;
        }
    }

    // console.table(contentArr);
let tempArr=[];
for(let i=0;i<contentArr.length;i++){
    if(contentArr[i]!=null){
        tempArr.push(contentArr[i]);
    }
}
return tempArr;
}
if(isSPresent){
    contentArr=sOption(contentArr);
}

for(let i=0;i<contentArr.length;i++){
    console.log(" "+ contentArr[i]);
}


// let contentArr2=content.split('\n');
// let count=1;
// for(let i=0;i<contentArr.length;i++){
//     if(contentArr2[i]=='\n'){
//         continue;
//     }
//     console.log(count +" "+ contentArr2[i]);
//     count++;
// }
