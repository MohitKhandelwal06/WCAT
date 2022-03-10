// 1) node Wcat.js filepath => displays the content of a file in a terminal
// node wcat.js f1.txt

const fs=require("fs");

let inputArr=process.argv.slice(2);
// console.log(inputArr);

let filesArr=[];
let optionArr=[];
//==============================>list files path in files array<==============================
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

// ==============================>Content read and appending<==============================
let content="";
for(let i=0;i<filesArr.length;i++){
    let fileContent=fs.readFileSync(filesArr[i]);
    content+=fileContent+"\n";
}

// console.log(content);
// =============================>s flag function <==============================
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
// =============================>n flag function <==============================
function nOption(contentArr){
    let tempArr=[];
    for(let i=0;i<contentArr.length;i++){
        let x="";
        x=i+1+" "+contentArr[i];
        tempArr.push(x);
    }
    
    return tempArr;
}
// =============================>b flag function <==============================
function bOption(contentArr){
    let tempArr=[];
    let count=1;
    for(let i=0;i<contentArr.length;i++){
        if(contentArr[i]!='\r'){
            let x="";
            x=count+" "+contentArr[i];
            tempArr.push(x);
            count++;
        }else{
            tempArr.push("\n");
        }
        
    }
    
    return tempArr;
}


let contentArr=content.split('\n');
// console.table(contentArr);
// check if -s is present in the options array
let isSPresent=optionArr.includes("-s");
if(isSPresent){
    contentArr=sOption(contentArr);
}

let indexOfn=optionArr.indexOf('-n');
let indexOfb=optionArr.indexOf('-b');
finalOption="";
if(indexOfb!=-1 && indexOfn!=-1){
    if(indexOfb<indexOfn){
        finalOption='-n';
    }else{
        finalOption='-b';
    }
}else{
    if(indexOfn!=-1){
        finalOption='-n';
    }else if(indexOfb!=-1){
        finalOption='-b';
    }
}
if(finalOption=='-n'){
    contentArr=nOption(contentArr);
}else if(finalOption == '-b'){
    contentArr=bOption(contentArr);
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
