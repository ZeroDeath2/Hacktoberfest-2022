let generateBoard = document.querySelector(".Generate");
let Board = document.querySelector(".Board");
let Path = document.querySelector(".min-path");
let memopath = document.querySelector(".memo");
let stop = document.querySelector(".stop");
//let minimumPath = document.querySelector(".minimum-path");

stop.addEventListener("click" , function()
{
    location.reload();
})
generateBoard.addEventListener("click" , CreateBoard);
Path.addEventListener("click" , GeneratePath);
memopath.addEventListener("click" , GeneratePathMemo);
//minimumPath.addEventListener("click" , minPathGenerator);

let BoardArray = [];
function CreateBoard(e)
{
   
    console.log(e);
    for(let i=0;i<20;i++)
    {
        let row = []
        for(let j=0;j<20;j++)
        {
            let boxOfbject = {
                value : Math.floor(Math.random()*100)+1,
                rowid : i , 
                colid : j
            }
            row.push(boxOfbject);
        }
        BoardArray.push(row);
        //console.log(BoardArray);
    }
    
    for(let i=0;i<20;i++)
    {
        let divRow = document.createElement("div");
        divRow.classList.add("row");
        for(let j=0;j<20;j++)
        {
            let box = document.createElement("div");
            box.classList.add("box");
            box.setAttribute("rowid" , `${i}`);
            box.setAttribute("colid" , `${j}`);
            // box.classList.add(`${i}`);
            // box.classList.add(`${j}`);
            
            box.textContent = BoardArray[i][j].value;
            divRow.append(box);
        }
        Board.append(divRow);
        console.log(Board);
    }
    console.log(BoardArray.length);
    console.log(BoardArray[0].length);
    
    

}


async function allpath(i , j , sum , maxsum )
{
    
     if(i>=20)
     {
         return;
     }
     if(j>=20)
     {
         return;
     }
     
    //  if(i==19 && j==19)
    //  {
    //          return;
    //  }
    

     let currentBox = document.querySelector(`[rowid="${i}"][colid="${j}"]`);
    //  if(currentBox.classList.contains("visited"))
    //  {
    //      return;
    //  }
      currentBox.classList.add("active");
     
     await new Promise((res) =>{
        setTimeout(()=>{
             res();
        } , 100)
    });
    
     await allpath(i , j+1 , sum+BoardArray[i][j].value , maxsum);
    await allpath(i+1 , j , sum+BoardArray[i][j].value , maxsum );
    //currentBox.classList.add("visited");
    currentBox.classList.remove("active");

    
}



async function allpathmemo(i , j , sum , maxsum)
{
    console.log("allpathmemo");

    if(i>=20)
     {
         return;
     }
     if(j>=20)
     {
         return; 
     }
     
    //  if(i==19 && j==19)
    //  {
    //          return;
    //  }
    

     let currentBox = document.querySelector(`[rowid="${i}"][colid="${j}"]`);
     if(currentBox.classList.contains("visited"))
     {
         return;
     }
      currentBox.classList.add("active");
     
     await new Promise((res) =>{
        setTimeout(()=>{
             res();
        } , 100)
    });
    
     await allpathmemo(i , j+1 , sum+BoardArray[i][j].value , maxsum);
    await allpathmemo(i+1 , j , sum+BoardArray[i][j].value , maxsum );
    currentBox.classList.add("visited");
    currentBox.classList.remove("active");



    
}

async function GeneratePathMemo()
{
    console.log("generatepathmemo")
    let sum = 0;
    let maxsum = -1;
   
    await allpathmemo(0 , 0 , sum , maxsum);
    minPathGenerator();

}


function GeneratePath()
{
    console.log("generatepath");
    let sum = 0;
    let maxsum = -1;
   
    allpath(0 , 0 , sum , maxsum );

}

let maxsum =Number.MAX_SAFE_INTEGER+1;
let minele = [];
// async function minPath(i , j , ele , sum)
// {
//     console.log("inside minpath recursive");
//     if(i<0 || j<0 || i>=20 || j>=20)
//     {
//         return Number.MAX_SAFE_INTEGER+1;
//     }
//     if(i==19 && j==19)
//     {
         
//     }
    
//     await minPath(i+1 , j , ele , sum+Number(currentBox.textContent));
//     await minPath(i , j+1 , ele , sum+Number(currentBox.textContent));
    
// }







   function minPath(i , j )
   {
        if(i<0 || j<0 || i>=20 || j>=20)
        {
            return;
        }
        if(i==19 && j==19)
        {
            minele.push(document.querySelector(`[rowid="${i}"][colid="${j}"]`));
            return;
        }
        if(i==19 && j!=19)
        {
            minele.push(document.querySelector(`[rowid="${i}"][colid="${j+1}"]`));
            minPath(i , j+1);

        }
        else if(j==19 && i!=19)
        {
            minele.push(document.querySelector(`[rowid="${i+1}"][colid="${j}"]`));
            minPath(i+1 , j);
        }
        else
        {
            minele.push(document.querySelector(`[rowid="${i}"][colid="${j}"]`));
            if(BoardArray[i+1][j].value <= BoardArray[i][j+1].value)
            {
                minPath(i+1 , j);
            }
            else
            {
                minPath(i, j+1);
            }

        }
       
        return;
        

   }
function minPathGenerator()
 {
//     console.log("inside minPath")
//     let ele = [];
//     minPath(0 , 0 , ele , 0);
//     console.log(minele);
       minPath(0 , 0);
       for(let i=0;i<minele.length;i++)
       {
           minele[i].classList.add("min-class");
       }
       
      

      

     
}