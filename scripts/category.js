const category = document.getElementById('category')
let categoriesContents = {}

const classesModifiersCodes = {
    '\u00AD': 'bold'
}

const specialModifiersCodes = {
     '\u200B': ['a', [['target', '_blank']], [['href', 'hyperlinks']]]
}

async function categoryPlayableTypewritingText(data) {
    let p = document.createElement('p')
    p.classList.add('category_p')

    category.appendChild(p)

    let deepData = JSON.parse(JSON.stringify(data))

    let speed = data['speed'] ? data['speed'] : 20
    let text = data['text'].split('')

    let modifier = null
    let modifierClosingLength = null

    let index = 0

    console.log(deepData)

    while (text.length > 0) {
        let c = text.shift()

        if (classesModifiersCodes[c]) {
            if (modifier !== null) {
                index += modifierClosingLength // length of </span>
                modifier = null;
            } else {
                modifier = c
                
                let openingModifier = `<span class="${classesModifiersCodes[c]}">`
                let closingModifier = '</span>'

                p.innerHTML += openingModifier + closingModifier
                index += openingModifier.length
                modifierClosingLength = closingModifier.length
            }
        } else if (specialModifiersCodes[c]) {
            if (modifier !== null)
            {
                index += modifierClosingLength
                modifier = null;
            } else {
                modifier = c

                let [dElem, defProps, dynProps] = specialModifiersCodes[c]

                let openingModifier = `<${dElem}`

                for (var [pName, pValue] of defProps ){
                    openingModifier += ` ${pName}=\'${pValue}\'`
                }

                for (var [pName, pDataToWithdraw] of dynProps) {
                    let data = deepData[pDataToWithdraw]
                    let withdrawnData = Array.isArray(data) ? data.shift() : data;

                    openingModifier += ` ${pName}=\'${withdrawnData}\'`
                }

                openingModifier += '>'

                let closingModifier = `</${dElem}>`

                p.innerHTML += openingModifier + closingModifier
                index += openingModifier.length
                modifierClosingLength = closingModifier.length
            }
        } else if (c == '\n') {
            p.innerHTML += '<br>'
            index += 4
        } else {
            p.innerHTML = stringInsert(p.innerHTML, c, index)
            index += 1
        }

        await timeout(speed)
    }
}

async function playCategory(id) {
    console.log(id)
    console.log(categoriesContents[id])

    for (var [type, data] of categoriesContents[id]) {
        if (type === 'typewriting_text')
            await categoryPlayableTypewritingText(data)
    }
}