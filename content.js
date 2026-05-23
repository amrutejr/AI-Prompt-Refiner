console.log("On the Expected Page")
let observer = new MutationObserver(()=>{
    const targetInput = document.querySelector('div[role="textbox"]')
    if (targetInput){
        console.log("Textbox Found")
        if (document.getElementById("my-ai-btn")) return

        const parent = targetInput.parentElement
        parent.style.position = "relative"
        targetInput.style.paddingRight = "30px"

        const button = document.createElement("button")
        button.id = "my-ai-btn"
        button.type = "button"
        button.style.width = "15px"
        button.style.height = "15px"
        button.style.borderRadius = "50%"
        button.style.backgroundColor = "#22c55e"
        button.style.border = "2px solid white"
        button.style.cursor = "pointer"
        button.style.position = "absolute"
        button.style.right = "1px"
        button.style.top = "50%"
        button.style.transform = "translateY(-50%)"
        button.style.zIndex = "9999"
        parent.appendChild(button)

        button.addEventListener("click", () => {
            const typedText = targetInput.textContent
            if (typedText){
                console.log(`User typed : ${typedText}`)
            }
        })

    }
})
observer.observe(document.body, {
    childList: true,
    subtree: true
})