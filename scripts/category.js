const templates = document.getElementById('templates')
const categoryHeader = document.getElementById('category_header')
const categoryBody = document.getElementById('category_body')
let categoriesContents = {}
let categoriesHeaders = {}

let categoryPlaying = null
let categoryPlayingTimeout = null

const specialModifiersCodes = {
     '\u00AD': ['classes', [], [['class', 'classes']]],
     '\u200B': ['a', [['target', '_blank']], [['href', 'hyperlinks']]]
}

async function categoryTimeout(duration) {
    let ts = duration / playSpeed

    if (ts < 1)
        return

    let [promise, id] = _timeout(ts)

    categoryPlayingTimeout = id
    await promise
}

function getTranslatedText(data) {
    return data[selectedLanguage] ? data[selectedLanguage] : noTranslationMessages[selectedLanguage]
}

async function categoryHeaderTitle(data) {
    let title = document.createElement('p')
    title.classList.add('category_header_title')
    title.innerText = getTranslatedText(data['text'])

    categoryHeader.appendChild(title)
}

async function categoryHeaderBalatroTimeline(id, data) {
    let timeline = templates.querySelector('.balatro-timeline').cloneNode(true)

    let def = data['default']

    let cards = timeline.querySelector('.balatro-timeline-cards')    
    let cardTemplate = cards.querySelector('.balatro-timeline-card')

    for (let pname in data) {
        if (pname === 'default')
            continue

        let pdata = data[pname]
        let card = cardTemplate.cloneNode(true)
    
        card.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('images/cards/card_${pdata['card'][0]}.png')`
        card.style.backgroundSize = 'cover'
        card.style.backgroundPosition = 'center'

        card.querySelector('.balatro-timeline-card-year').innerText = pdata['card'][1]
        card.querySelector('.balatro-timeline-card-type').innerText = getTranslatedText(pdata['card'][2])
        card.querySelector('.balatro-timeline-card-desc').innerText = getTranslatedText(pdata['card'][3])
        card.querySelector('.balatro-timeline-card-title').innerText = pdata['card'][4]
        card.querySelector('.balatro-timeline-card-techs').innerText = pdata['card'][5]

        card.onclick = async () => {
            categoriesContents[id] = pdata['content']
            await reloadCategory(true)
        }

        cards.appendChild(card)
    }

    timeline.querySelector('.balatro-timeline-left-arrow').onclick = () => {
        cards.scrollBy({ left: -cards.scrollWidth / 2, behavior: 'smooth' })
    }

    timeline.querySelector('.balatro-timeline-right-arrow').onclick = () => {
        cards.scrollBy({ left: cards.scrollWidth / 2, behavior: 'smooth' })
    }

    cardTemplate.remove()
    categoryHeader.appendChild(timeline)

    cards.scrollLeft = cards.scrollWidth;
}

async function categoryPlayableImagesRow(data) {
    let row = templates.querySelector('.images-row').cloneNode(true)

    let unitTemplate = row.querySelector('.images-row-unit')

    for (let image of data['images']) {
        let unit = unitTemplate.cloneNode(true)

        unit.style.backgroundImage = `url('images/${image}')`

        row.appendChild(unit)
    }

    unitTemplate.remove()
    categoryBody.appendChild(row)
}

async function categoryPlayableTypewritingText(data) {
    let p = document.createElement('p')
    p.classList.add('category_p')

    categoryBody.appendChild(p)

    let deepData = JSON.parse(JSON.stringify(data))

    let speed = data['speed'] ? data['speed'] : 20
    let text = getTranslatedText(data['text']).split('')

    let modifier = null
    let modifierClosingLength = null

    let index = 0

    console.log(deepData)

    while (text.length > 0 && categoryPlaying !== null) {
        let c = text.shift()

        if (specialModifiersCodes[c]) {
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
        
            await categoryTimeout(speed)
        }
    }
}

async function playCategoryHeader(id) {
    categoryPlaying = id

    for (var [type, data] of categoriesHeaders[id]) {
        if (categoryPlaying === null)
            break;

        if (type == 'header_title')
            await categoryHeaderTitle(data)

        if (type == 'balatro_timeline')
            await categoryHeaderBalatroTimeline(id, data)
    }
}

async function playCategoryBody(id) {
    categoryPlaying = id

    console.log(id)
    console.log(categoriesContents[id])

    for (var [type, data] of categoriesContents[id]) {
        if (categoryPlaying === null)
            break;

        if (type === 'typewriting_text')
            await categoryPlayableTypewritingText(data)

        if (type === 'images_row')
            await categoryPlayableImagesRow(data)
    }
}

async function playCategory(id, bodyOnly = false) {
    if (!bodyOnly)
        await playCategoryHeader(id)
    await playCategoryBody(id)
}

async function stopCategory(bodyOnly = false) {
    if (categoryPlaying === null)
        return;

    console.log(categoryPlaying)

    categoryPlaying = null;
    if (categoryPlayingTimeout) {
        clearTimeout(categoryPlayingTimeout)
        categoryPlayingTimeout = null
    }

    await timeout(10)

    categoryBody.innerHTML = ''
    
    if (!bodyOnly)
        categoryHeader.innerHTML = ''
}

async function reloadCategory(bodyOnly = false) {
    if (categoryPlaying === null)
        return;

    let old = categoryPlaying
    
    await stopCategory(bodyOnly)
    playCategory(old, bodyOnly)
}