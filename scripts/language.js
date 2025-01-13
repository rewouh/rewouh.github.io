let selectedLanguage = null;

let noTranslationMessages = {
    'fr': 'Aucune traduction n\'est disponible pour cette phrase, contactez moi pour résoudre ça.',
    'en': 'No translation is available for this sentence, contact me to fix that.',
    'jp': 'この文には翻訳がありません。修正するには私に連絡してください。'
}

function selectLanguage(lang) {
    if (selectedLanguage) {
        let prevFlag = document.getElementById(`sidebar_flag_${selectedLanguage}`)
        prevFlag.classList.remove('sidebar_flag_selected')
    }

    let newFlag = document.getElementById(`sidebar_flag_${lang}`)

    newFlag.classList.add('sidebar_flag_selected')

    selectedLanguage = lang;
}

function registerFlags() {
    let flagContainer = document.getElementById('sidebar_flags')

    for (let flag of flagContainer.children) {
        let lang = flag.id.slice(13) // Removing 'sidebar_flag_' from id
        flag.onclick = () => { 
            selectLanguage(lang) 
            reloadCategory()
        }
    }
}

registerFlags()