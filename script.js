

// Display books
// function displayBooks() {
//     const booksGrid = document.getElementById('books-grid');
//     booksGrid.innerHTML = '';
    
//     booksData.forEach(book => {
//         const bookCard = document.createElement('div');
//         bookCard.className = 'book-card';
//         bookCard.innerHTML = `
//             <div class="book-cover">${book.cover}</div>
//             <div class="book-info">
//                 <h3 class="book-title">${book.title}</h3>
//                 <p class="book-author">By ${book.author}</p>
//                 <p class="book-description">${book.description}</p>
//                 <div class="book-actions">
//                     <button class="btn btn-primary" onclick="showBookDetails(${book.id})">View Details</button>
//                     <button class="btn btn-secondary" onclick="toggleBarcode(${book.id})">Show Barcode</button>
//                 </div>
//                 <div class="barcode-container" id="barcode-${book.id}">
//                     <div class="barcode">${generateBarcodePattern(book.isbn)}</div>
//                     <div class="barcode-label">ISBN: ${book.isbn}</div>
//                     <div class="barcode-label">Barcode: ${generateBarcode(book.isbn)}</div>
//                 </div>
//             </div>
//         `;
//         booksGrid.appendChild(bookCard);
//     });
// }



// Show book details in modal
// function showBookDetails(bookId) {
//     const book = booksData.find(b => b.id === bookId);
//     if (!book) return;
    
//     const modal = document.getElementById('book-modal');
//     const modalBody = document.getElementById('modal-body');
    
//     modalBody.innerHTML = `
//         <div style="text-align: center; margin-bottom: 2rem;">
//             <div style="font-size: 5rem; margin-bottom: 1rem;">${book.cover}</div>
//             <h2 style="font-size: 2rem; margin-bottom: 0.5rem; color: var(--primary-color);">${book.title}</h2>
//             <p style="color: var(--text-light); margin-bottom: 1rem;">By ${book.author}</p>
//             <p style="color: var(--text-light);">Published: ${book.year}</p>
//         </div>
        
//         <div style="margin-bottom: 2rem;">
//             <h3 style="margin-bottom: 1rem; color: var(--primary-color);">Description</h3>
//             <p style="line-height: 1.8; color: var(--text-light);">${book.description}</p>
//         </div>
        
//         <div style="background: var(--bg-light); padding: 1.5rem; border-radius: 10px; margin-bottom: 2rem;">
//             <h3 style="margin-bottom: 1rem; color: var(--primary-color);">Book Information</h3>
//             <p style="margin-bottom: 0.5rem;"><strong>ISBN:</strong> ${book.isbn}</p>
//             <p style="margin-bottom: 0.5rem;"><strong>Year:</strong> ${book.year}</p>
//             <p><strong>Author:</strong> ${book.author}</p>
//         </div>
        
//         <div style="background: var(--bg-light); padding: 1.5rem; border-radius: 10px; text-align: center;">
//             <h3 style="margin-bottom: 1rem; color: var(--primary-color);">Barcode</h3>
//             <div style="font-family: 'Courier New', monospace; font-size: 1.5rem; letter-spacing: 3px; margin: 1rem 0; color: var(--primary-color);">
//                 ${generateBarcodePattern(book.isbn)}
//             </div>
//             <p style="color: var(--text-light); margin-top: 1rem;">ISBN: ${book.isbn}</p>
//             <p style="color: var(--text-light);">Barcode: ${generateBarcode(book.isbn)}</p>
//         </div>
//     `;
    
//     modal.classList.add('show');
// }

// Close modal
// function closeModal() {
//     const modal = document.getElementById('book-modal');
//     modal.classList.remove('show');
// }

// Set active navigation link based on current page
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        
        if (currentPage === 'index.html' && (href === 'index.html' || href === '#')) {
            link.classList.add('active');
        } else if (currentPage === 'details.html' && href === 'details.html') {
            link.classList.add('active');
        } else if (currentPage === 'resources.html' && href === 'resources.html') {
            link.classList.add('active');
        } else if (currentPage === 'services.html' && href === 'services.html') {
            link.classList.add('active');
        } else if (currentPage === 'author.html' && href === 'author.html') {
            link.classList.add('active');
        }
    });
}

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Display books if on details page
    const booksGrid = document.getElementById('books-grid');
    if (booksGrid) {
        displayBooks();
    }
    
    // Set active nav link
    setActiveNavLink();
    
    // Navigation links - handle both page navigation and smooth scrolling
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // If it's a hash link (anchor), handle smooth scrolling
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(href);
                
                if (targetSection) {
                    const navHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = targetSection.offsetTop - navHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    const navMenu = document.getElementById('nav-menu');
                    if (navMenu) {
                        navMenu.classList.remove('active');
                    }
                }
            }
            // Otherwise, let the browser handle page navigation normally
        });
    });
    
    // Mobile menu toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // Close modal when clicking outside
    const modal = document.getElementById('book-modal');
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close modal button
    const closeModalBtn = document.getElementById('close-modal');
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }
    
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    if (navbar) {
        let lastScroll = 0;
        
        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            lastScroll = currentScroll;
        });
    }
});

// Make functions globally available
// window.toggleBarcode = toggleBarcode;
// window.showBookDetails = showBookDetails;
// window.closeModal = closeModal;

window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

setTimeout(function() {
    document.body.classList.add('loaded');
}, 100000);

