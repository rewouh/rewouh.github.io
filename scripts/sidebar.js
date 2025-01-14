let sidebar = document.getElementById('sidebar')
let sideBarSelectedCategory = null

let playSpeed = 1
let playSpeeds = [0.5, 1, 3]
let lastPlaySpeed = null

let sidebarCategories = {
    'list': []
}

let sidebarFlags = ['us', 'fr', 'jp']

async function unselectCategory() {
    if (sideBarSelectedCategory === null)
        return;

    sidebarCategories[sideBarSelectedCategory]['dom'].classList.remove('sidebar-selected-category')
    await stopCategory()

    sideBarSelectedCategory = null
} 

async function selectCategory(id) {
    if (sideBarSelectedCategory === id)
        return;

    await unselectCategory()

    let sideCat = sidebarCategories[id]['dom']

    sideCat.classList.add('sidebar-selected-category')
    sideBarSelectedCategory = id

    playCategory(id)
}

function reloadSidebarCategoriesTitles() {
    for (let cat_id of sidebarCategories['list']) {
        let cat = sidebarCategories[cat_id]
        let dom = cat['dom']

        dom.innerHTML = cat['title'][selectedLanguage] ? cat['title'][selectedLanguage] : noTranslationMessages[selectedLanguage]
    }
}

function createCategories() {
    for (let cat_id of sidebarCategories['list']) {
        let dom = document.createElement('div')
        dom.classList.add('sidebar-category')
        dom.id = `sidebar_category_${cat_id}`

        let cat = sidebarCategories[cat_id]
        cat['dom'] = dom

        dom.onclick = () => { selectCategory(cat_id); }

        sidebar.appendChild(dom)
    }

    reloadSidebarCategoriesTitles()

    console.log(sidebarCategories)
}

function setPlaySpeed(speed) {
    if (lastPlaySpeed)
        lastPlaySpeed.classList.remove('sidebar-speed-selected')

    let s = document.getElementById(`sidebar_speed_${speed}`)

    s.classList.add('sidebar-speed-selected')
    
    playSpeed = speed
    lastPlaySpeed = s
}

function createSpeeds() {
    let cont = document.createElement('div')
    cont.id = 'sidebar_speeds'

    for (let s of playSpeeds) {
        let but = document.createElement('div')
        but.id = `sidebar_speed_${s}`
        but.classList.add('sidebar-speed')

        but.innerHTML = `x${s}`

        but.onclick = () => { setPlaySpeed(s) }

        cont.appendChild(but)
    }

    sidebar.appendChild(cont)
}

function createFlags() {
    let flagContainer = document.createElement('div')
    flagContainer.id = 'sidebar_flags'

    sidebar.appendChild(flagContainer)

    for (let lang of flags) {
        let flag = document.createElement('img')
        flag.src = `./images/flag_${lang}.png`
        flag.classList.add('sidebar-flag')
        flag.id = `sidebar_flag_${lang}`

        flag.onclick = () => { 
            selectLanguage(lang)
            
            reloadSidebarCategoriesTitles()
            reloadCategory()
        }

        flagContainer.appendChild(flag)
    }
}