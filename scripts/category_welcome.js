sidebarCategories['welcome'] = {
    'title': {
        'us': 'WELCOME',
        'fr': 'BIENVENUE',
        'jp': '歓迎'
    }
}

sidebarCategories['list'].push('welcome')

categoriesHeaders['welcome'] = [
    ['header_title',
        {
            'text': {
                'us': 'WELCOME',
                'fr': 'BIENVENUE'
            }
        }
    ],
]

categoriesContents['welcome'] = [
    ['typewriting_text', 
        {
            'text': {
                'fr': ["Bienvenue sur mon site! Tu peux te balader en cliquant sur les catégories à gauche.", "Ici, les pages racontent des histoires, qui déroulent devant tes yeux.", "", "La vitesse de déroulement des pages est ajustable avec les boutons en dessous des catégories.", "", "Tous les éléments de ce site ont été codés à la main (pas de code généré par IA, pas de bibliothèques) en pur HTML/CSS/JS."].join('\n'),
                'us': ["Welcome to my website! You can wander around by clicking on the left-hand side categories.", "Here, pages tell stories, unfolding before your eyes.", "", "The buttons below the categories allow you to change the speed.", "", "Everything on this website was handcrafted (no AI-generated code, no libraries) with pure HTML/CSS/JS."].join('\n') 
             }
        } 
    ],
]