document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('article-filter').addEventListener('change', function(e) {
        const articles = Array.from(document.querySelectorAll('.article-card'));
        const container = document.getElementById('articles-container');
        
        articles.sort((a, b) => {
            const ratingA = parseFloat(a.querySelector('.article-rating').textContent.split('/')[0].substring(6));
            const ratingB = parseFloat(b.querySelector('.article-rating').textContent.split('/')[0].substring(6));
            
            function parseDate(dateString) {
                const parts = dateString.trim().split(' ');
                const day = parseInt(parts[0]);
                const monthsMap = {
                    "janvier": 0, "février": 1, "mars": 2, "avril": 3, "mai": 4, "juin": 5,
                    "juillet": 6, "août": 7, "septembre": 8, "octobre": 9, "novembre": 10, "décembre": 11
                };
                const month = monthsMap[parts[1].toLowerCase()];
                const year = parseInt(parts[2]);
                return new Date(year, month, day);
            }
    
            const dateA = parseDate(a.querySelector('.article-meta span:last-child').textContent);
            const dateB = parseDate(b.querySelector('.article-meta span:last-child').textContent);
    
            switch(e.target.value) {
                case 'date-desc':
                    return dateB - dateA;
                case 'date-asc':
                    return dateA - dateB;
                case 'rating-desc':
                    return ratingB - ratingA;
                case 'rating-asc':
                    return ratingA - ratingB;
                default:
                    return 0;
            }
        });
        
        container.innerHTML = '';
        articles.forEach(article => container.appendChild(article));
    });
})