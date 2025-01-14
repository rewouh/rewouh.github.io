let selectedLanguage = 'us';

let flags = ['us', 'fr', 'jp']

let noTranslationMessages = {
    'fr': 'Aucune traduction n\'est disponible pour cette phrase, contactez moi pour résoudre ça.',
    'us': 'No translation is available for this sentence, contact me to fix that.',
    'jp': 'この文には翻訳がありません。修正するには私に連絡してください。'
}

function selectLanguage(lang) {
    if (selectedLanguage) {
        let prevFlag = document.getElementById(`sidebar_flag_${selectedLanguage}`)
        prevFlag.classList.remove('sidebar-flag-selected')
    }

    let newFlag = document.getElementById(`sidebar_flag_${lang}`)
    newFlag.classList.add('sidebar-flag-selected')

    selectedLanguage = lang;
}