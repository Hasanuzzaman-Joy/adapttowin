// Sample books data - Replace with your actual books
const booksData = [
    {
        id: 1,
        title: "The Journey Within",
        author: "Author Name",
        description: "A captivating tale of self-discovery and adventure that takes readers on an unforgettable journey.",
        isbn: "978-0-123456-78-9",
        cover: "📖",
        year: "2024"
    },
    {
        id: 2,
        title: "Echoes of Tomorrow",
        author: "Author Name",
        description: "A thought-provoking science fiction novel exploring the boundaries of time and human consciousness.",
        isbn: "978-0-987654-32-1",
        cover: "🚀",
        year: "2023"
    },
    {
        id: 3,
        title: "Whispers in the Wind",
        author: "Author Name",
        description: "A beautiful collection of poetry and prose that captures the essence of nature and human emotion.",
        isbn: "978-0-555555-55-5",
        cover: "🍃",
        year: "2023"
    },
    {
        id: 4,
        title: "The Last Stand",
        author: "Author Name",
        description: "An epic fantasy adventure filled with magic, courage, and the ultimate battle between good and evil.",
        isbn: "978-0-777777-77-7",
        cover: "⚔️",
        year: "2024"
    },
    {
        id: 5,
        title: "Mysteries Unveiled",
        author: "Author Name",
        description: "A thrilling mystery novel that keeps readers guessing until the very last page.",
        isbn: "978-0-999999-99-9",
        cover: "🔍",
        year: "2022"
    },
    {
        id: 6,
        title: "Dreams and Reality",
        author: "Author Name",
        description: "A philosophical exploration of the thin line between dreams and reality in modern life.",
        isbn: "978-0-444444-44-4",
        cover: "💭",
        year: "2024"
    }
];

// Generate barcode from ISBN
function generateBarcode(isbn) {
    // Remove hyphens and spaces from ISBN
    const cleanISBN = isbn.replace(/[-\s]/g, '');
    
    // Create a simple barcode representation
    // In a real application, you might use a barcode library
    let barcode = '';
    for (let i = 0; i < cleanISBN.length; i++) {
        const digit = cleanISBN[i];
        // Create visual barcode pattern
        barcode += digit + ' ';
    }
    
    return barcode.trim();
}

// Generate EAN-13 barcode pattern (visual representation)
function generateBarcodePattern(isbn) {
    const cleanISBN = isbn.replace(/[-\s]/g, '');
    let pattern = '';
    
    // Start guard
    pattern += '|';
    
    // Encode each digit
    for (let i = 0; i < cleanISBN.length; i++) {
        const digit = parseInt(cleanISBN[i]);
        // Simple pattern: 0 = thin, 1 = thick
        const patterns = {
            0: '|||  ', 1: '|| ||', 2: '||| |', 3: '|||| ', 4: '| |||',
            5: '| || |', 6: '| ||||', 7: '| | ||', 8: '| | | |', 9: '| | |||'
        };
        pattern += patterns[digit] || '|||| ';
    }
    
    // End guard
    pattern += '|';
    
    return pattern;
}

// Display books
function displayBooks() {
    const booksGrid = document.getElementById('books-grid');
    booksGrid.innerHTML = '';
    
    booksData.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.className = 'book-card';
        bookCard.innerHTML = `
            <div class="book-cover">${book.cover}</div>
            <div class="book-info">
                <h3 class="book-title">${book.title}</h3>
                <p class="book-author">By ${book.author}</p>
                <p class="book-description">${book.description}</p>
                <div class="book-actions">
                    <button class="btn btn-primary" onclick="showBookDetails(${book.id})">View Details</button>
                    <button class="btn btn-secondary" onclick="toggleBarcode(${book.id})">Show Barcode</button>
                </div>
                <div class="barcode-container" id="barcode-${book.id}">
                    <div class="barcode">${generateBarcodePattern(book.isbn)}</div>
                    <div class="barcode-label">ISBN: ${book.isbn}</div>
                    <div class="barcode-label">Barcode: ${generateBarcode(book.isbn)}</div>
                </div>
            </div>
        `;
        booksGrid.appendChild(bookCard);
    });
}

// Toggle barcode visibility
function toggleBarcode(bookId) {
    const barcodeContainer = document.getElementById(`barcode-${bookId}`);
    barcodeContainer.classList.toggle('show');
}

// Show book details in modal
function showBookDetails(bookId) {
    const book = booksData.find(b => b.id === bookId);
    if (!book) return;
    
    const modal = document.getElementById('book-modal');
    const modalBody = document.getElementById('modal-body');
    
    modalBody.innerHTML = `
        <div style="text-align: center; margin-bottom: 2rem;">
            <div style="font-size: 5rem; margin-bottom: 1rem;">${book.cover}</div>
            <h2 style="font-size: 2rem; margin-bottom: 0.5rem; color: var(--primary-color);">${book.title}</h2>
            <p style="color: var(--text-light); margin-bottom: 1rem;">By ${book.author}</p>
            <p style="color: var(--text-light);">Published: ${book.year}</p>
        </div>
        
        <div style="margin-bottom: 2rem;">
            <h3 style="margin-bottom: 1rem; color: var(--primary-color);">Description</h3>
            <p style="line-height: 1.8; color: var(--text-light);">${book.description}</p>
        </div>
        
        <div style="background: var(--bg-light); padding: 1.5rem; border-radius: 10px; margin-bottom: 2rem;">
            <h3 style="margin-bottom: 1rem; color: var(--primary-color);">Book Information</h3>
            <p style="margin-bottom: 0.5rem;"><strong>ISBN:</strong> ${book.isbn}</p>
            <p style="margin-bottom: 0.5rem;"><strong>Year:</strong> ${book.year}</p>
            <p><strong>Author:</strong> ${book.author}</p>
        </div>
        
        <div style="background: var(--bg-light); padding: 1.5rem; border-radius: 10px; text-align: center;">
            <h3 style="margin-bottom: 1rem; color: var(--primary-color);">Barcode</h3>
            <div style="font-family: 'Courier New', monospace; font-size: 1.5rem; letter-spacing: 3px; margin: 1rem 0; color: var(--primary-color);">
                ${generateBarcodePattern(book.isbn)}
            </div>
            <p style="color: var(--text-light); margin-top: 1rem;">ISBN: ${book.isbn}</p>
            <p style="color: var(--text-light);">Barcode: ${generateBarcode(book.isbn)}</p>
        </div>
    `;
    
    modal.classList.add('show');
}

// Close modal
function closeModal() {
    const modal = document.getElementById('book-modal');
    modal.classList.remove('show');
}

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
    
    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the data to a server
            // For now, we'll just show an alert
            alert(`Thank you, ${name}! Your message has been received. We'll get back to you at ${email} soon.`);
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // Newsletter form handling
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            alert(`Thank you for subscribing! We'll send updates to ${email}`);
            this.reset();
        });
    }
});

// Make functions globally available
window.toggleBarcode = toggleBarcode;
window.showBookDetails = showBookDetails;
window.closeModal = closeModal;

