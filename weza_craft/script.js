// Weza Craft - African Artisan Marketplace JavaScript

// Sample data for African artisan products
const products = [
    {
        id: 1,
        name: "Large Sisal Market Basket",
        price: "KSh 3,500",
        artisan: "Grace Mwangi",
        image: "https://images.unsplash.com/photo-1628926379972-9e8096907f46?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600",
        description: "Handwoven from sisal fiber with leather handles, perfect for shopping or home storage."
    },
    {
        id: 2,
        name: "Decorative Clay Pot",
        price: "KSh 2,800",
        artisan: "Elizabeth Odera",
        image: "https://images.unsplash.com/photo-1584589167171-541ce45f1eea?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600",
        description: "Hand-crafted clay pot with traditional patterns, perfect for home décor."
    },
    {
        id: 3,
        name: "Maasai Beaded Necklace",
        price: "KSh 1,500",
        artisan: "Njeri Wainaina",
        image: "https://images.unsplash.com/photo-1626875251041-0d3117cbd365?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600",
        description: "Vibrant multi-strand beaded necklace handcrafted using traditional Maasai techniques."
    },
    {
        id: 4,
        name: "Colorful Kiondo Handbag",
        price: "KSh 2,200",
        artisan: "Grace Mwangi",
        image: "https://images.unsplash.com/photo-1620783770629-122b7f187703?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600",
        description: "Stylish and durable kiondo handbag woven from sisal and wool with vibrant African patterns."
    },
    {
        id: 5,
        name: "Traditional Woven Table Mat",
        price: "KSh 800",
        artisan: "Grace Mwangi",
        image: "https://images.unsplash.com/photo-1601659856128-8a868e4f9bad?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600",
        description: "Handwoven table mat made with natural fibers and traditional patterns."
    },
    {
        id: 6,
        name: "African Print Cushion Cover",
        price: "KSh 1,200",
        artisan: "Amina Hassan",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600",
        description: "Beautiful cushion cover featuring authentic African prints and patterns."
    }
];

// Sample artisan data
const artisans = [
    {
        id: 1,
        name: "Grace Mwangi",
        craft: "Basket Weaving",
        location: "Nairobi, Kenya",
        image: "https://images.unsplash.com/photo-1531123414780-f74242c2b052?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        bio: "I've been weaving Kiondo baskets for over 25 years, preserving traditional techniques passed down from my grandmother.",
        experience: "25+ years"
    },
    {
        id: 2,
        name: "Elizabeth Odera",
        craft: "Pottery",
        location: "Kisumu, Kenya",
        image: "https://images.unsplash.com/photo-1535295972055-1c762f4483e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        bio: "As a rural caregiver, pottery has become my creative outlet and source of income. I specialize in traditional patterns.",
        experience: "15+ years"
    },
    {
        id: 3,
        name: "Njeri Wainaina",
        craft: "Beadwork",
        location: "Samburu, Kenya",
        image: "https://images.unsplash.com/photo-1543949806-2c9935b84b20?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        bio: "I create authentic Maasai beadwork while caring for my family. Each piece tells a story of our heritage.",
        experience: "20+ years"
    },
    {
        id: 4,
        name: "Amina Hassan",
        craft: "Textile Arts",
        location: "Mombasa, Kenya",
        image: "https://images.unsplash.com/photo-1494790108755-2616c4c20b44?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        bio: "I specialize in creating beautiful textiles using traditional Swahili coastal techniques and vibrant African prints.",
        experience: "18+ years"
    }
];

// Sample testimonials
const testimonials = [
    {
        id: 1,
        content: "Weza Craft has transformed my life as a rural artisan. I can now sell my kiondo baskets to customers across the world while still caring for my family.",
        author: "Grace Mwangi",
        location: "Nairobi, Kenya",
        rating: 5,
        image: "https://images.unsplash.com/photo-1531123414780-f74242c2b052?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"
    },
    {
        id: 2,
        content: "Being able to share my pottery skills with younger women in my community while earning income has been a blessing. Thank you Weza Craft!",
        author: "Elizabeth Odera",
        location: "Kisumu, Kenya",
        rating: 5,
        image: "https://images.unsplash.com/photo-1535295972055-1c762f4483e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"
    },
    {
        id: 3,
        content: "As a grandmother and caregiver, this platform allows me to preserve our cultural craft traditions while supporting my family financially.",
        author: "Njeri Wainaina",
        location: "Samburu, Kenya",
        rating: 5,
        image: "https://images.unsplash.com/photo-1543949806-2c9935b84b20?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"
    }
];

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Load products
    loadProducts();
    
    // Load artisans
    loadArtisans();
    
    // Load testimonials
    loadTestimonials();
    
    // Set up navigation
    setupNavigation();
    
    // Set up mobile menu toggle
    setupMobileMenu();
    
    // Set up smooth scrolling
    setupSmoothScrolling();
    
    // Set up scroll animations
    setupScrollAnimations();
});

// Load products into the products grid
function loadProducts() {
    const productsContainer = document.getElementById('products-container');
    if (!productsContainer) return;
    
    const productsHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/300x250?text=Product+Image'">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-artisan">By ${product.artisan}</p>
                <div class="product-price">${product.price}</div>
                <a href="#" class="btn btn-primary" onclick="viewProduct(${product.id})">View Details</a>
            </div>
        </div>
    `).join('');
    
    productsContainer.innerHTML = productsHTML;
}

// Load artisans into the artisans grid
function loadArtisans() {
    const artisansContainer = document.getElementById('artisans-container');
    if (!artisansContainer) return;
    
    const artisansHTML = artisans.map(artisan => `
        <div class="artisan-card">
            <img src="${artisan.image}" alt="${artisan.name}" class="artisan-img" onerror="this.src='https://via.placeholder.com/120x120?text=Artisan'">
            <h3 class="artisan-name">${artisan.name}</h3>
            <p class="artisan-craft">${artisan.craft}</p>
            <p class="artisan-location"><i class="fas fa-map-marker-alt"></i> ${artisan.location}</p>
            <p class="artisan-bio">${artisan.bio}</p>
            <a href="#" class="btn btn-primary" onclick="viewArtisan(${artisan.id})">View Profile</a>
        </div>
    `).join('');
    
    artisansContainer.innerHTML = artisansHTML;
}

// Load testimonials into the testimonials grid
function loadTestimonials() {
    const testimonialsContainer = document.getElementById('testimonials-container');
    if (!testimonialsContainer) return;
    
    const testimonialsHTML = testimonials.map(testimonial => `
        <div class="testimonial-card">
            <div class="testimonial-content">
                ${testimonial.content}
            </div>
            <div class="testimonial-author">
                <img src="${testimonial.image}" alt="${testimonial.author}" class="testimonial-avatar" onerror="this.src='https://via.placeholder.com/60x60?text=Avatar'">
                <div class="testimonial-info">
                    <h5>${testimonial.author}</h5>
                    <p>${testimonial.location}</p>
                    <div class="testimonial-rating">
                        ${generateStars(testimonial.rating)}
                    </div>
                </div>
            </div>
        </div>
    `).join('');
    
    testimonialsContainer.innerHTML = testimonialsHTML;
}

// Generate star rating HTML
function generateStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '<i class="fas fa-star"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    return stars;
}

// Set up navigation highlighting
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    const sections = document.querySelectorAll('section[id]');
    
    // Highlight active navigation item on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Mobile Menu Toggle
function setupMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });

        // Close menu when clicking a link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// Smooth Scrolling
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll Animations
function setupScrollAnimations() {
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add shadow to header on scroll
        if (currentScroll > 0) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Hide/show header on scroll up/down
        if (currentScroll > lastScroll && currentScroll > 100) {
            header.classList.add('header-hidden');
        } else {
            header.classList.remove('header-hidden');
        }

        lastScroll = currentScroll;
    });
}

// View product details (placeholder function)
function viewProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        alert(`Product: ${product.name}\nPrice: ${product.price}\nArtisan: ${product.artisan}\n\nDescription: ${product.description}\n\nThis would normally open a detailed product page.`);
    }
}

// View artisan profile (placeholder function)
function viewArtisan(artisanId) {
    const artisan = artisans.find(a => a.id === artisanId);
    if (artisan) {
        alert(`Artisan: ${artisan.name}\nCraft: ${artisan.craft}\nLocation: ${artisan.location}\nExperience: ${artisan.experience}\n\nBio: ${artisan.bio}\n\nThis would normally open a detailed artisan profile page.`);
    }
}

// Add fade-in animation for elements when they come into view
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all cards and major elements
    const elementsToAnimate = document.querySelectorAll('.category-card, .product-card, .artisan-card, .testimonial-card, .impact-item');
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Initialize scroll animations after content is loaded
window.addEventListener('load', setupScrollAnimations);

// Add some interactivity to category cards
document.addEventListener('DOMContentLoaded', function() {
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const categoryName = this.querySelector('h3').textContent;
            // Scroll to products section
            document.querySelector('#shop').scrollIntoView({ behavior: 'smooth' });
            
            // Show a message about filtering (since this is a demo)
            setTimeout(() => {
                console.log(`Filtering products by category: ${categoryName}`);
            }, 1000);
        });
    });
});

// Handle Contact Form
function handleContactForm(event) {
    event.preventDefault();
    // Add your contact form handling logic here
}

// Handle Newsletter Signup
function handleNewsletterSignup(event) {
    event.preventDefault();
    // Add your newsletter signup logic here
}