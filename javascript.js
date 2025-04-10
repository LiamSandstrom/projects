const linkContainers = document.querySelectorAll(".link-container");
const borderColor = linkContainers[0].style.borderColor;
const background = document.querySelector(".background");
const contentSection = document.querySelector("#section-content");
let startTextOpacity = document.querySelector(".link");
startTextOpacity = window.getComputedStyle(startTextOpacity).opacity * 100;

const squareColors = [
    "rgb(255, 166, 0)",
    "#F5C45E",
    "#74512D",
]

for(let container of linkContainers){
    container.addEventListener("mouseover", () => {
        setOpacityAll(40, container);
        enableOpacity(container);
        opacityBorder(container);
    })

    container.addEventListener("mouseleave", () => {
        for(let child of container.children){
            setOpacityAll(startTextOpacity);
            resetOpacityBorder();
            if(child.className === "link-background")
            {
                child.style.opacity = "0%";
            }
        }
    })

    container.addEventListener("mousemove", (e) => {
        const decimal = e.clientX / container.offsetWidth;
        const basePercent = 40;
        const percentRange = 20;
        const adjustablePercent = percentRange * decimal;
        const finalPercent = basePercent + adjustablePercent;

        const relativeHeight = container.getBoundingClientRect().top;
        const heightDecimal = e.clientY - relativeHeight;
        const baseR = 160;
        let baseG = 100;
        const baseB = 0;
        const colorMultiplier = 0.13;
        const adjustableColor = colorMultiplier * heightDecimal;
        const finalColor = `rgb(${baseR}, ${baseG + adjustableColor}, ${baseB + adjustableColor})`

        for(const child of container.children){
            if(child.className === "link-background"){
                child.style.setProperty("--gradient-percent", `${finalPercent}%`)
                child.style.setProperty("--gradient-color", finalColor);
            }
        }
    })

    container.addEventListener("click", () => {
        contentSection.scrollIntoView( {behavior: "smooth"});
    })
}

function setOpacityAll(opacity, containerRef = null){
    for(let container of linkContainers){
        if(container === containerRef) continue;
        setTextOpacity(container, opacity);
    }
}

function enableOpacity(container){
        for(let child of container.children){
            if(child.className === "link-background")
            {
                child.style.opacity = "100%";
            }
            else if(child.className === "link"){
                child.style.opacity = "100%";
            }
        }
}

function setTextOpacity(container, opacity){
        for(let child of container.children){
            if(child.className === "link"){
                child.style.opacity = `${opacity}%`;
            }
        }
}

function opacityBorder(container){
    //if not last element grab below
    //else top and bot
    for(let i = 0; i < linkContainers.length; i++){
        if(linkContainers[i] === container){
            linkContainers[i].style.borderLeft = "1px solid white";
            if(i != linkContainers.length - 1){
                linkContainers[i].style.borderColor = "white";
                linkContainers[i + 1].style.borderTop = "1px solid white"
            }
            else{
                linkContainers[i].style.borderColor = "white";
            }
        }
    }
}

function resetOpacityBorder(){
    for(let i = 0; i < linkContainers.length; i++){
        if(i != linkContainers.length - 1){
            linkContainers[i].style.borderColor = borderColor;
            linkContainers[i].style.borderTop = `1px soid ${borderColor}`;
        }
        else{
            linkContainers[i].style.borderColor = borderColor;
        }
    }
}

createDivs();
function createDivs(){
    
    for(let i = 0; i < 400; i++){
        const div = document.createElement("div");
        let width = "5%"
        let height = "5%"
        div.style.height = height;
        div.style.width = width;
        div.classList.add("square");

        div.addEventListener("mouseenter", () => {
            div.style.transition = "background-color 0.1s";
            let i = random(3);
            console.log(i)
            div.style.backgroundColor = squareColors[i];
        });

        div.addEventListener("mouseleave", () => {
            setTimeout(() => resetSquare(div), 200);
        })

        background.append(div);
    }
}

function resetSquare(div){

    div.style.transition = "background-color 1s ease";
    div.style.backgroundColor = "black";
}

function random(max){
    return Math.floor(Math.random() * max) ;
}





