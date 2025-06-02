sidebarCategories['hit_me_up'] = {
    'title': {
        'us': 'HIT ME UP',
        'fr': 'CONTACTE MOI',
        'jp': '連絡先'
    }
}

sidebarCategories['list'].push('hit_me_up')

categoriesHeaders['hit_me_up'] = [
    ['header_title',
        {
            'text': {
                'us': 'HIT ME UP',
                'fr': 'CONTACTE MOI'
            }
        }
    ],
]

categoriesContents['hit_me_up'] = [
    ['typewriting_text', 
        {
            'text': {
                'fr': ["Tu peux me contacter sur LinkedIn: \u200Bpierre-braud\u200B.", "Ou par mail: \u00ADpbraudcontact@gmail.com\u00AD.", "", "Je réponds également rapidement sur Discord: \u00ADrewu\u00AD."].join('\n'),
                'us': ["You can contact me on LinkedIn: \u200Bpierre-braud\u200B.", "Or by mail: \u00ADpbraudcontact@gmail.com\u00AD.", "", "You can also reach me quickly on Discord : \u00ADrewu\u00AD."].join('\n')
            },
            'hyperlinks': ['https://www.linkedin.com/in/pierre-braud/'],
            'classes': ['bold', 'bold']
        } 
    ]
]