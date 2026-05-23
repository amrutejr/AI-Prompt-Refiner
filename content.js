console.log("On the Expected Page")
const API_KEY = ""

async function getGroqChatCompletion(message) {

    const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`
            },

            body: JSON.stringify({
                model: "openai/gpt-oss-20b",
                messages: [
                    {
                        role: "user",
                        content: message
                    }
                ]
            })
        }
    )

    const data = await response.json()

    console.log(data)

    return data.choices[0].message.content
}

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

        button.addEventListener("click", async () => {
            const typedText = targetInput.textContent
            if (!typedText) return
            console.log(`User typed : ${typedText}`)
            const refinedPrompt = await getGroqChatCompletion(
                `Improve this AI prompt professionally:\n\n${typedText} *just return the prompt no other irrelavant text as this is going into an ai agent yet give the prompt in detail*`
            )
            console.log(refinedPrompt)
            targetInput.textContent = refinedPrompt
        })

    }
})
observer.observe(document.body, {
    childList: true,
    subtree: true
})