console.log("coucouc");

//    const dropZone = document.getElementById("drag-file");
//    dropZone.ondrop = function(e) {
//        console.log("coiucou");
//       e.preventDefault();
//       //$('body').removeClass('file-hover');
//       for (var i = 0; i < e.dataTransfer.files.length; ++i) {
//         console.log(e.dataTransfer.files[i].path);
//       }
//       return false;
//     };
const canvas  = document.getElementById("canvas");
const click  = document.getElementById("click");
const res  = document.getElementById("result");
const context = canvas.getContext('2d');

document.addEventListener("drop", (event) => {
  event.preventDefault();
  event.stopPropagation();

  for (const f of event.dataTransfer.files) {
    // Using the path attribute to get absolute file path
    console.log(event.dataTransfer.files[0].type);
    console.log(event.dataTransfer.files.length);
    
    if (event.dataTransfer.files.length === 1 && event.dataTransfer.files[0].type === "image/svg+xml"){

        console.log("File Path of dragged files: ", f.path);
    
        const img = document.getElementById("img");
        img.setAttribute("src", f.path);
        img.onload = function (e)
            {
                canvas.height = Math.max(img.clientHeight, img.clientWidth);
                canvas.width = Math.max(img.clientHeight, img.clientWidth);
                // function center(){
                //     if (img.clientWidth < img.clientHeight){
                //         return canvas.height - img.clientWidth
                //     }
                //     if (img.clientHeight < img.clientWidth){
                //         return canvas.height - img.clientheight
                //     }
                //     else{
                //         return 0
                //     }
                // }
                // console.log(center());
                context.drawImage(img, 0, 0, img.clientWidth, img.clientHeight);
                let nAlive = 0;
            }
            result.innerHTML = "";
            click.removeAttribute('disabled');
      }
    }
    if (event.dataTransfer.files[0].type !== "image/svg+xml") {
        result.innerHTML = "Votre fichier doit être de type svg"
    }
    if  (event.dataTransfer.files.length !== 1) {
        
        result.innerHTML = "Vous ne pouvez déposer qu'un fichier à la fois"
    }
    else{
        return
    }
    
});

document.addEventListener("dragover", (e) => {
  e.preventDefault();
  e.stopPropagation();
});

document.addEventListener("dragenter", (event) => {
  console.log("File is in the Drop Space");
});

document.addEventListener("dragleave", (event) => {
  console.log("File has left the Drop Space");
});

click.addEventListener("click", (event) => {
    countPixels();
  });

function countPixels() {
  let nAlive = 0;
  let p = context.getImageData(0, 0, canvas.width, canvas.height).data;

  let canvasPixelNbr = canvas.height * canvas.width;

  for (var y = 0, i = 0; y < canvas.height; y++)
    for (var x = 0; x < canvas.width; x++, i += 4) {
      if (p[i + 3]) {
        //a pixel
        nAlive++;
      }
    }
  result.innerHTML =
    "Cette icône occupe " +
    Math.floor((nAlive * 100) / canvasPixelNbr) +
    "  %" +
    " de sa grille";
  console.log(
    canvasPixelNbr,
    nAlive,
    "soit : " + (nAlive * 100) / canvasPixelNbr + "%"
  );
}
