document.querySelector('.form-select').addEventListener('change', function(e) {
    const articles = Array.from(document.querySelectorAll('.article-card'));
    const container = document.querySelector('.article-list');
    
    articles.sort((a, b) => {
        const ratingA = parseFloat(a.querySelector('.article-rating').textContent.split('/')[0].substring(6));
        const ratingB = parseFloat(b.querySelector('.article-rating').textContent.split('/')[0].substring(6));
        
        // Nous permet de parser la date en chiffre
        function parseDate(dateString) {
            const [day, month, year] = dateString.split(' ');
            const months = {
                "janvier": 0, "février": 1, "mars": 2, "avril": 3, "mai": 4, "juin": 5,
                "juillet": 6, "août": 7, "septembre": 8, "octobre": 9, "novembre": 10, "décembre": 11
            };
            return new Date(year, months[month.toLowerCase()], day);
        }

        const dateA = parseDate(a.querySelector('.article-meta span:last-child').textContent.trim());
        const dateB = parseDate(b.querySelector('.article-meta span:last-child').textContent.trim());

        switch(e.target.value) {
            case 'date-desc':
                return dateB - dateA;
            case 'date-asc':
                return dateA - dateB;
            case 'rating-desc':
                return ratingB - ratingA;
            case 'rating-asc':
                return ratingA - ratingB;
        }
    });
    
    container.innerHTML = '';
    articles.forEach(article => container.appendChild(article));
});
