const category = document.getElementById('category')
let categoriesContents = {}

let categoryPlaying = null
let categoryPlayingTimeout = null

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
    let text = data['text'][selectedLanguage] ? data['text'][selectedLanguage].split('') : noTranslationMessages[selectedLanguage].split('')

    let modifier = null
    let modifierClosingLength = null

    let index = 0

    console.log(deepData)

    while (text.length > 0 && categoryPlaying !== null) {
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

        let [promise, id] = _timeout(speed)

        categoryPlayingTimeout = id
        await promise
    }
}

async function playCategory(id) {
    categoryPlaying = id

    for (var [type, data] of categoriesContents[id]) {
        if (categoryPlaying === null)
            break;

        if (type === 'typewriting_text')
            await categoryPlayableTypewritingText(data)
    }
}

async function stopCategory() {
    if (categoryPlaying === null)
        return;

    console.log(categoryPlaying)

    categoryPlaying = null;
    if (categoryPlayingTimeout) {
        clearTimeout(categoryPlayingTimeout)
        categoryPlayingTimeout = null
    }

    await timeout(10)

    category.innerHTML = ''
}

async function reloadCategory() {
    if (categoryPlaying === null)
        return;

    let old = categoryPlaying
    
    await stopCategory()
    playCategory(old)
}