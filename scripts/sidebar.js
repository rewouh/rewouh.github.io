let sidebar = document.getElementById('sidebar')
let sideBarSelectedCategory = null

let sidebarCategories = {}

async function unselectCategory() {
    if (sideBarSelectedCategory === null)
        return;

    sidebarCategories[sideBarSelectedCategory]['dom'].classList.remove('sidebar-selected-category')
    await stopCategory()

    for (var subcat of sidebarCategories[sideBarSelectedCategory]['subcategories'])
        subcat['dom'].classList.add('hidden')

    sideBarSelectedCategory = null
} 

async function selectCategory(id) {
    if (sideBarSelectedCategory === id)
        return;

    await unselectCategory()

    let sideCat = document.getElementById(id)

    sideCat.classList.add('sidebar-selected-category')
    sideBarSelectedCategory = id

    for (var subcat of sidebarCategories[id]['subcategories'])
        subcat['dom'].classList.remove('hidden')

    playCategory(sidebarCategories[id]['cat_id'])
}

function registerCategories() {
    let lastCategory = null
    let lastCategorySubCategories = []

    for (let cat of sidebar.children) {
        if (cat.id.startsWith('sidebar_category')) 
        {
            if (lastCategory !== null)
            {
                sidebarCategories[lastCategory]['subcategories'] = lastCategorySubCategories
                lastCategory = cat.id
                lastCategorySubCategories  = []
            }
            else
                lastCategory = cat.id

            cat.onclick = () => { selectCategory(cat.id); }

            sidebarCategories[cat.id] = {
                'dom': cat,
                'name': cat.textContent,
                'cat_id': cat.id.slice(17), // removing 'category_' from id
            } 
        } else if (cat.id.startsWith('sidebar_subcategory')) {
            cat.classList.add('hidden')

            lastCategorySubCategories.push({
                'dom': cat,
                'name': cat.textContent,
            })
        }
    }

    sidebarCategories[lastCategory]['subcategories'] = lastCategorySubCategories

    console.log(sidebarCategories)
}

registerCategories()