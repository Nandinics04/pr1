const carousel = document.querySelector(".carousel"),
firstImg=carousel.querySelectorAll("img")[0];
arrowIcons  = document.querySelectorAll(".wrapper .img");

let isDragStart = false, prevPageX, prevScrollLeft, positionDiff;



const showHideIcons = () =>{
    // showing and hiding prev/next icon according to carousel scroll lefth value
    let scrollWidth = carousel.scrollWidth - carousel.clientWidth;  //getting max scrollable width
    arrowIcons[0].style.display=carousel.scrollLeft == 0 ? "none" : "block";
    arrowIcons[1].style.display = carousel.scrollLeft == scrollWidth ? "none" : "block";
}


arrowIcons.forEach(icon =>{
    icon.addEventListener("click",()=>{
        let firstImgWidth = firstImg.clientWidth - 10 //getting first img width & adding 14 margin value

        //if clicked icon is left, reduce width value from the carousel scroll ledt else add to it
        carousel.scrollLeft += icon.id == "left"? -firstImgWidth: firstImgWidth;
         setTimeout(()=> showHideIcons(),60); // calling showHideIcons after 60ms
    });
});

const autoslide=()=>{
    if(carousel.scrollLeft == (carousel.scrollWidth - carousel.clientWidth)) return
    positionDiff=Math.abs(positionDiff); // making positionDiff value positive
    let firstImgWidth = firstImg.clientWidth + 14;
    // getting difference value that needs to add or reduce from carousel left to take middle img center 
    let valDifference = firstImgWidth - positionDiff;

    if(carousel.scrollLeft > prevScrollLeft){
         //if the user scrolling to the right
        return carousel.scrollLeft+=positionDiff>firstImgWidth/3 ? valDifference: -positionDiff;
    }
    //if the user scrolling to the left
    carousel.scrollLeft+=positionDiff>firstImgWidth/3 ? valDifference: -positionDiff;

}

const dragStart = (e)=>{
    //updating global variables values on mouse down button event
    isDragStart = true;
    prevPageX=e.pageX || e.touches[0].pageX;
    prevScrollLeft = carousel.scrollLeft;
}
const dragging = (e)=>{
    //scrolling images/carousel to left according to mouse pointer 
    if(!isDragStart) return;
    e.preventDefault();
    carousel.classList.add("dragging");
    let positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    carousel.scrollLeft= prevScrollLeft - positionDiff;
    showHideIcons();
}
const dragStop = ()=>{
    isDragStart = false;
    carousel.classList.remove("dragging");
    autoslide();

}

carousel.addEventListener("mousedown",dragStart);
carousel.addEventListener("touchstart",dragStart);

carousel.addEventListener("mousemove",dragging);
carousel.addEventListener("touchmove",dragging);


carousel.addEventListener("mouseup",dragStop);
carousel.addEventListener("mouseleave",dragStop);
carousel.addEventListener("touchend",dragStop);



