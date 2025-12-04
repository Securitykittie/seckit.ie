// ============================================
// ADVANCED JAVASCRIPT - Security Kitty
// Improved Order Flow with Quantity Management
// ============================================

// Pricing data
const pricingData = {
    1: { total: 10, perItem: 10.00, savings: 0 },
    2: { total: 18, perItem: 9.00, savings: 2 },
    3: { total: 25, perItem: 8.33, savings: 5 },
    4: { total: 30, perItem: 7.50, savings: 10 },
    5: { total: 35, perItem: 7.00, savings: 15, bonus: true }
};

// Cart state - stores product name and quantity
let cart = {};
let previousQuantity = 0;
let freeGiftModalShown = false;

// Load cart from localStorage on page load
function loadCartFromStorage() {
    try {
        if (typeof localStorage === 'undefined') {
            console.warn('localStorage not available');
            cart = {};
            return;
        }
        const cartData = localStorage.getItem('securityKittyCart');
        if (cartData) {
            const parsedCart = JSON.parse(cartData);
            // Replace cart entirely (don't merge, just use what's in storage)
            cart = {};
            // Only keep items with quantity > 0
            Object.keys(parsedCart).forEach(key => {
                if (parsedCart[key] > 0) {
                    cart[key] = parsedCart[key];
                }
            });
            console.log('Cart loaded from localStorage:', cart);
            console.log('Total items in cart:', Object.keys(cart).length);
            
            // If cart has items, log them for debugging
            if (Object.keys(cart).length > 0) {
                console.log('Cart contains:', cart);
            }
        } else {
            console.log('No cart found in localStorage, starting with empty cart');
            cart = {};
        }
    } catch (e) {
        console.error('Error loading cart from storage:', e);
        cart = {};
    }
}

// Function to clear cart (for testing/debugging)
function clearCart() {
    cart = {};
    localStorage.removeItem('securityKittyCart');
    updateCart();
    console.log('Cart cleared');
}
window.clearCart = clearCart; // Make it accessible from console

// Save cart to localStorage
function saveCartToStorage() {
    try {
        localStorage.setItem('securityKittyCart', JSON.stringify(cart));
    } catch (e) {
        console.error('Error saving cart to storage:', e);
    }
}

// ============================================
// PARTICLE SYSTEM
// ============================================

function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        particlesContainer.appendChild(particle);
    }
}

// ============================================
// NAVBAR SCROLL EFFECTS
// ============================================

const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ============================================
// SMOOTH SCROLLING
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// ACTIVE NAVIGATION HIGHLIGHTING
// ============================================

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNav() {
    let current = '';
    const scrollPosition = window.pageYOffset + 150;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// ============================================
// HERO STATS COUNTER
// ============================================

function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                entry.target.classList.add('counted');
                animateCounter(entry.target, target);
            }
        });
    }, observerOptions);

    statNumbers.forEach(stat => observer.observe(stat));
}

// ============================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================

function initScrollAnimations() {
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

    const animateElements = document.querySelectorAll('.product-card, .step, .pricing-card, .feature-card, .glass-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
}

// ============================================
// CART MANAGEMENT
// ============================================

function getTotalQuantity() {
    return Object.values(cart).reduce((sum, qty) => sum + qty, 0);
}

function updateCart() {
    const totalQty = getTotalQuantity();
    
    // Check if they just reached 5 items (free gift tier)
    if (previousQuantity < 5 && totalQty >= 5 && !freeGiftModalShown) {
        // Small delay to ensure UI is updated
        setTimeout(() => {
            showFreeGiftModal();
            freeGiftModalShown = true;
        }, 500);
    }
    
    // Update previous quantity
    previousQuantity = totalQty;
    
    // Reset modal flag if they go below 5
    if (totalQty < 5) {
        freeGiftModalShown = false;
    }
    
    // Update cart badge
    const cartBadge = document.getElementById('cartBadge');
    if (cartBadge) {
        cartBadge.textContent = totalQty;
        cartBadge.style.display = totalQty > 0 ? 'flex' : 'none';
    }
    
    // Update cart items count
    const cartItemsCount = document.getElementById('cartItemsCount');
    if (cartItemsCount) {
        cartItemsCount.textContent = totalQty === 0 ? '0 items' : `${totalQty} ${totalQty === 1 ? 'item' : 'items'}`;
    }
    
    // Update cart total
    const cartTotal = document.getElementById('cartTotal');
    if (cartTotal) {
        const pricing = getPricingForQuantity(totalQty);
        cartTotal.textContent = `€${pricing.total}`;
    }
    
    // Update floating cart visibility
    const floatingCart = document.getElementById('floatingCart');
    if (floatingCart) {
        if (totalQty > 0) {
            floatingCart.classList.remove('hidden');
        } else {
            floatingCart.classList.add('hidden');
        }
    }
    
    // Update cart items list
    updateCartItems();
    
    // Update pricing display
    updatePricingDisplay();
    
    // Update order summary
    updateOrderSummary();
    
    // Update progress indicator
    updateProgressIndicator();
    
    // Update selection guide if active
    updateSelectionGuide();
    
    // Show smart upsell if applicable
    showSmartUpsell();
    
    // Update checkout progress
    updateCheckoutProgress();
}

function updateCartItems() {
    const cartItems = document.getElementById('cartItems');
    if (!cartItems) return;
    
    const totalQty = getTotalQuantity();
    
    if (totalQty === 0) {
        cartItems.innerHTML = '<p class="cart-empty">Your cart is empty</p>';
        return;
    }
    
    let html = '';
    const pricing = getPricingForQuantity(totalQty);
    
    Object.entries(cart).forEach(([productName, quantity]) => {
        if (quantity > 0) {
            const itemTotal = quantity * pricing.perItem;
            const imageSrc = getProductImage(productName);
            html += `
                <div class="cart-item">
                    <div class="cart-item-image">
                        ${imageSrc ? `<img src="${imageSrc}" alt="${productName}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;">` : getProductEmoji(productName)}
                    </div>
                    <div class="cart-item-info">
                        <div class="cart-item-name">${productName}</div>
                        <div class="cart-item-qty-controls">
                            <button class="cart-qty-btn" onclick="updateProductQuantity('${productName}', -1)" title="Decrease quantity">−</button>
                            <span class="cart-item-qty">Qty: ${quantity}</span>
                            <button class="cart-qty-btn" onclick="updateProductQuantity('${productName}', 1)" title="Increase quantity">+</button>
                        </div>
                    </div>
                    <div class="cart-item-price">€${itemTotal.toFixed(2)}</div>
                    <button class="cart-item-remove" onclick="removeFromCart('${productName}')">×</button>
                </div>
            `;
        }
    });
    
    // Add bonus item if applicable
    if (pricing.bonus) {
        const bonusImageSrc = getProductImage('Black & Blue');
        html += `
            <div class="cart-item" style="background: rgba(245, 158, 11, 0.1); border: 1px solid rgba(245, 158, 11, 0.3);">
                <div class="cart-item-image">
                    ${bonusImageSrc ? `<img src="${bonusImageSrc}" alt="Black & Blue" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;">` : '🖤💙'}
                </div>
                <div class="cart-item-info">
                    <div class="cart-item-name">Black & Blue</div>
                    <div class="cart-item-qty">Free Bonus!</div>
                </div>
                <div class="cart-item-price" style="color: var(--accent-light);">FREE</div>
            </div>
        `;
    }
    
    cartItems.innerHTML = html;
}

function getProductEmoji(productName) {
    const emojiMap = {
        'Sugar Punch': '🐱',
        'Violet Voltage': '⚡',
        'Hello Kitty': '😸',
        'Purple Reign': '👑',
        'Blue Steel': '💎',
        'Midnight Mischief': '🌙',
        'Cold Snap': '❄️',
        'The BlackEye': '🖤',
        'Garden Party': '🌺',
        'Witchy Woman': '🔮',
        'Mint Condition': '🌿',
        'Welcome to the Jungle': '🌴',
        'BlackCat': '🐈‍⬛',
        'Drama Queen': '💅',
        'Total Whiteout': '⚪',
        'Silent Alarm': '🔇',
        'Black & Blue': '🖤💙'
    };
    return emojiMap[productName] || '🐾';
}

function getProductImage(productName) {
    const imageMap = {
        'Sugar Punch': 'STYLES/Sugar Punch.png',
        'Violet Voltage': 'STYLES/Violet Voltage.png',
        'Hello Kitty': 'STYLES/Hello Kitty.png',
        'Purple Reign': 'STYLES/Purple Reign.png',
        'Blue Steel': 'STYLES/Blue Steel.png',
        'Midnight Mischief': 'STYLES/Midnight Mischief.png',
        'Cold Snap': 'STYLES/Cold Snap.png',
        'The BlackEye': 'STYLES/The BlackEye.png',
        'Garden Party': 'STYLES/Garden Party.png',
        'Witchy Woman': 'STYLES/Witchy Woman.png',
        'Mint Condition': 'STYLES/Mint Condition.png',
        'Welcome to the Jungle': 'STYLES/Welcome to the Jungle.png',
        'BlackCat': 'STYLES/BlackCat.png',
        'Drama Queen': 'STYLES/Drama Queen.png',
        'Total Whiteout': 'STYLES/Total Whiteout.png',
        'Silent Alarm': 'STYLES/Silent Alarm.png',
        'Black & Blue': 'STYLES/Black & Blue.png'
    };
    return imageMap[productName] || '';
}

// ============================================
// PRODUCT QUANTITY MANAGEMENT
// ============================================

function initProductSelection() {
    console.log('Initializing product selection...');
    const productCards = document.querySelectorAll('.product-card');
    console.log('Found product cards:', productCards.length);
    
    productCards.forEach((card, index) => {
        const productName = card.getAttribute('data-name');
        if (!productName) {
            console.warn('Card', index, 'has no data-name attribute');
            return;
        }
        
        // Skip Black & Blue as it's a bonus
        if (productName === 'Black & Blue') return;
        
        console.log('Setting up card for:', productName);
        
        const decreaseBtn = card.querySelector('[data-action="decrease"]');
        const increaseBtn = card.querySelector('[data-action="increase"]');
        const qtyDisplay = card.querySelector('.product-qty');
        const cardInner = card.querySelector('.product-card-inner');
        
        // Make quantity control buttons stop propagation
        if (decreaseBtn) {
            decreaseBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Decrease clicked for:', productName);
                updateProductQuantity(productName, -1);
            });
        } else {
            console.warn('Decrease button not found for:', productName);
        }
        
        if (increaseBtn) {
            increaseBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Increase clicked for:', productName);
                updateProductQuantity(productName, 1);
            });
        } else {
            console.warn('Increase button not found for:', productName);
        }
        
        // Make the entire card clickable to add one item
        if (cardInner) {
            cardInner.style.cursor = 'pointer';
            cardInner.addEventListener('click', (e) => {
                // Only trigger if not clicking on quantity controls
                const clickedElement = e.target;
                const isQtyControl = clickedElement.closest('.product-quantity-controls') || 
                                   clickedElement.closest('[data-action]') ||
                                   clickedElement.hasAttribute('data-action');
                
                if (!isQtyControl) {
                    console.log('Card clicked for:', productName);
                    // Add one item when clicking the card
                    updateProductQuantity(productName, 1);
                    
                    // Visual feedback
                    cardInner.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        cardInner.style.transform = '';
                    }, 200);
                } else {
                    console.log('Click was on quantity control, ignoring');
                }
            });
        } else {
            console.warn('Card inner not found for:', productName);
        }
        
        // Initialize quantity display
        if (qtyDisplay) {
            const currentQty = cart[productName] || 0;
            qtyDisplay.textContent = currentQty;
            qtyDisplay.setAttribute('data-qty', currentQty);
            
            // Update card selected state based on cart
            if (currentQty > 0) {
                card.classList.add('selected');
            } else {
                card.classList.remove('selected');
            }
            
            // Update button states
            if (decreaseBtn) {
                decreaseBtn.disabled = currentQty === 0;
            }
        }
    });
    
    console.log('Product selection initialization complete');
}

// Make functions globally accessible
window.updateProductQuantity = updateProductQuantity;
window.removeFromCart = function(productName) {
    updateProductQuantity(productName, -cart[productName] || 0);
};

function updateProductQuantity(productName, change) {
    console.log('updateProductQuantity called:', productName, change);
    
    if (!productName) {
        console.error('No product name provided');
        return;
    }
    
    if (!cart[productName]) {
        cart[productName] = 0;
    }
    
    const newQty = Math.max(0, cart[productName] + change);
    cart[productName] = newQty;
    
    console.log('Updated cart:', cart);
    console.log('New quantity for', productName, ':', newQty);
    
    // Save cart to localStorage
    saveCartToStorage();
    
    // Update product card display
    const productCard = document.querySelector(`[data-name="${productName}"]`);
    if (productCard) {
        const qtyDisplay = productCard.querySelector('.product-qty');
        if (qtyDisplay) {
            qtyDisplay.textContent = newQty;
            qtyDisplay.setAttribute('data-qty', newQty);
        }
        
        // Update card selected state
        if (newQty > 0) {
            productCard.classList.add('selected');
        } else {
            productCard.classList.remove('selected');
        }
        
        // Update button states
        const decreaseBtn = productCard.querySelector('[data-action="decrease"]');
        if (decreaseBtn) {
            decreaseBtn.disabled = newQty === 0;
        }
        
        const increaseBtn = productCard.querySelector('[data-action="increase"]');
        // No max limit - users can add as many as they want
    } else {
        console.warn('Product card not found for:', productName);
    }
    
    updateCart();
    
    // Show notification
    if (change > 0) {
        showNotification(`${productName} added to cart`, 'success');
    } else if (change < 0 && newQty === 0) {
        showNotification(`${productName} removed from cart`, 'info');
    }
}

function removeFromCart(productName) {
    cart[productName] = 0;
    updateProductQuantity(productName, 0);
    showNotification(`${productName} removed`, 'info');
}

// ============================================
// PRICING CALCULATIONS
// ============================================

function getPricingForQuantity(qty) {
    if (qty <= 0) return { total: 0, perItem: 0, savings: 0 };
    
    // For quantities 1-5, use tier pricing
    if (qty <= 5) {
        return pricingData[qty] || pricingData[1];
    }
    
    // For quantities > 5, use the 5-item tier rate per item
    // Base price for 5 items is €35 (€7 per item)
    // Additional items beyond 5 are also €7 each
    const basePrice = pricingData[5].total; // €35 for first 5 items
    const additionalItems = qty - 5;
    const additionalPrice = additionalItems * pricingData[5].perItem; // €7 per additional item
    const total = basePrice + additionalPrice;
    const perItem = pricingData[5].perItem; // €7.00
    const savings = (qty * 10) - total; // Compare to single-item pricing
    
    return {
        total: total,
        perItem: perItem,
        savings: savings,
        bonus: qty >= 5 // Bonus applies if at least 5 items
    };
}

function updatePricingDisplay() {
    const totalQty = getTotalQuantity();
    const pricing = getPricingForQuantity(totalQty);
    const currentPricing = document.getElementById('currentPricing');
    
    if (!currentPricing) return;
    
    if (totalQty === 0) {
        currentPricing.innerHTML = `
            <div class="pricing-status">
                <p class="status-text">Add items to your cart to see pricing</p>
            </div>
        `;
        return;
    }
    
    let html = '<div class="pricing-active">';
    html += `
        <div class="pricing-active-item">
            <div class="pricing-active-label">Total Items</div>
            <div class="pricing-active-value">${totalQty}</div>
        </div>
        <div class="pricing-active-item">
            <div class="pricing-active-label">Total Price</div>
            <div class="pricing-active-value">€${pricing.total}</div>
        </div>
        <div class="pricing-active-item">
            <div class="pricing-active-label">Per Item</div>
            <div class="pricing-active-value">€${pricing.perItem.toFixed(2)}</div>
        </div>
    `;
    
    if (pricing.savings > 0) {
        html += `
            <div class="pricing-active-item" style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3);">
                <div class="pricing-active-label">You Save</div>
                <div class="pricing-active-value" style="color: #10b981;">€${pricing.savings}</div>
            </div>
        `;
    }
    
    if (pricing.bonus) {
        html += `
            <div class="pricing-active-item" style="background: rgba(245, 158, 11, 0.1); border: 1px solid rgba(245, 158, 11, 0.3);">
                <div class="pricing-active-label">Bonus</div>
                <div class="pricing-active-value" style="color: var(--accent-light);">🎁 Free!</div>
            </div>
        `;
    }
    
    html += '</div>';
    currentPricing.innerHTML = html;
}

// ============================================
// ORDER SUMMARY
// ============================================

function updateOrderSummary() {
    const summaryContent = document.getElementById('summaryContent');
    if (!summaryContent) return;
    
    const totalQty = getTotalQuantity();
    
    if (totalQty === 0) {
        summaryContent.innerHTML = `
            <div class="empty-state">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" style="opacity: 0.3; margin-bottom: 1rem;">
                    <path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z" stroke="currentColor" stroke-width="2"/>
                    <path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z" stroke="currentColor" stroke-width="2"/>
                    <path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <p>Your cart is empty</p>
                <p class="empty-hint">Select items from the Products section above to get started</p>
            </div>
        `;
        
        // Disable order button
        const orderButton = document.getElementById('orderButton');
        if (orderButton) {
            orderButton.disabled = true;
        }
        return;
    }
    
    const pricing = getPricingForQuantity(totalQty);
    let html = '';
    
    // Group products by name with quantities
    Object.entries(cart).forEach(([productName, quantity]) => {
        if (quantity > 0) {
            const itemTotal = quantity * pricing.perItem;
            html += `
                <div class="summary-item">
                    <span>${productName} <strong>(x${quantity})</strong></span>
                    <span>€${itemTotal.toFixed(2)}</span>
                </div>
            `;
        }
    });
    
    // Add bonus if applicable
    if (pricing.bonus) {
        html += `
            <div class="summary-item" style="background: rgba(245, 158, 11, 0.1); border: 1px solid rgba(245, 158, 11, 0.3);">
                <span>🎁 Black & Blue (Bonus)</span>
                <span style="color: var(--accent-light);">FREE</span>
            </div>
        `;
    }
    
    html += `
        <div class="summary-total">
            <span>Total:</span>
            <span>€${pricing.total}</span>
        </div>
    `;
    
    if (pricing.savings > 0) {
        html += `
            <div class="summary-item" style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); margin-top: 0.5rem;">
                <span>💰 You Saved:</span>
                <span style="color: #10b981; font-weight: 700;">€${pricing.savings}</span>
            </div>
        `;
    }
    
    summaryContent.innerHTML = html;
    
    // Enable order button
    const orderButton = document.getElementById('orderButton');
    if (orderButton) {
        orderButton.disabled = false;
    }
}

// ============================================
// PROGRESS INDICATOR
// ============================================

function updateProgressIndicator() {
    const totalQty = getTotalQuantity();
    const steps = document.querySelectorAll('.progress-step');
    
    steps.forEach((step, index) => {
        step.classList.remove('active', 'completed');
        
        if (totalQty === 0) {
            if (index === 0) step.classList.add('active');
        } else {
            if (index < 2) {
                step.classList.add('completed');
            }
            if (index === 2) {
                step.classList.add('active');
            }
        }
    });
    
    // Update progress lines
    const lines = document.querySelectorAll('.progress-line');
    lines.forEach((line, index) => {
        line.classList.remove('completed');
        if (totalQty > 0 && index < 1) {
            line.classList.add('completed');
        }
    });
}

// ============================================
// PRODUCT FILTER
// ============================================

function initProductFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            productCards.forEach(card => {
                const cardFilter = card.getAttribute('data-filter') || 'all';
                
                if (filter === 'all' || cardFilter === filter) {
                    card.style.display = '';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ============================================
// FLOATING CART
// ============================================

function initFloatingCart() {
    const cartToggle = document.getElementById('cartToggle');
    const cartContent = document.getElementById('cartContent');
    
    if (cartToggle && cartContent) {
        cartToggle.addEventListener('click', () => {
            cartContent.classList.toggle('open');
            cartToggle.classList.toggle('active');
        });
    }
    
    const goToCheckout = document.getElementById('goToCheckout');
    if (goToCheckout) {
        goToCheckout.addEventListener('click', () => {
            const orderSection = document.getElementById('order');
            if (orderSection) {
                const offsetTop = orderSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close cart
                if (cartContent) cartContent.classList.remove('open');
                if (cartToggle) cartToggle.classList.remove('active');
            }
        });
    }
}

// ============================================
// ORDER BUTTON
// ============================================

const orderButton = document.getElementById('orderButton');
if (orderButton) {
    orderButton.addEventListener('click', async () => {
        const totalQty = getTotalQuantity();
        
        if (totalQty === 0) {
            showNotification('Please add items to your cart first', 'warning');
            return;
        }
        
        // Get customer details
        const customerName = document.getElementById('customerName')?.value.trim() || '';
        const deliveryAddress = document.getElementById('deliveryAddress')?.value.trim() || '';
        const eircode = document.getElementById('eircode')?.value.trim() || '';
        const customerEmail = document.getElementById('customerEmail')?.value.trim() || '';
        const customerPhone = document.getElementById('customerPhone')?.value.trim() || '';
        
        // Validate required fields
        if (!customerName || !deliveryAddress || !eircode || !customerEmail) {
            showNotification('Please fill in all required fields (Name, Address, Eircode, and Email)', 'warning');
            return;
        }
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(customerEmail)) {
            showNotification('Please enter a valid email address', 'warning');
            return;
        }
        
        // Combine email and phone for contact info (for business owner email)
        const contactInfo = customerPhone ? `${customerEmail} | Phone: ${customerPhone}` : customerEmail;
        
        // Show loading state
        orderButton.disabled = true;
        orderButton.innerHTML = '<span>Sending Order...</span>';
        
        // Generate order details
        const pricing = getPricingForQuantity(totalQty);
        const orderDetails = generateOrderDetails(pricing);
        const orderText = formatOrderText(orderDetails, customerName, deliveryAddress, eircode, customerEmail, customerPhone);
        
        // Generate order number
        const orderNumber = generateOrderNumber();
        
        // Try to send emails via EmailJS
        try {
            // Send email to business owner
            await sendOrderEmail(orderDetails, customerName, deliveryAddress, eircode, contactInfo, orderNumber);
            
            // Send confirmation email to customer (use email directly)
            await sendCustomerConfirmationEmail(orderDetails, customerName, deliveryAddress, eircode, customerEmail, orderNumber);
            
            // Success - show confirmation modal
            showOrderConfirmationModal(orderNumber, customerEmail, orderDetails.total);
            
            // Open Revolut payment link in new tab
            const paymentAmountInCents = Math.round(orderDetails.total * 100);
            const encodedOrderNumber = encodeURIComponent(orderNumber);
            const revolutLink = `https://revolut.me/seckit?amount=${paymentAmountInCents}&note=${encodedOrderNumber}`;
            window.open(revolutLink, '_blank');
            
            // Clear form after successful submission
            setTimeout(() => {
                document.getElementById('customerName').value = '';
                document.getElementById('deliveryAddress').value = '';
                document.getElementById('eircode').value = '';
                document.getElementById('customerEmail').value = '';
                document.getElementById('customerPhone').value = '';
                // Clear cart
                cart = {};
                saveCartToStorage();
                updateCart();
            }, 2000);
            
        } catch (error) {
            console.error('Email sending failed:', error);
            
            // Check if it's a configuration error
            const errorMessage = error.message || error.toString();
            if (errorMessage.includes('not configured') || errorMessage.includes('YOUR_')) {
                // Configuration not set up yet
                copyToClipboard(orderText);
                showNotification('📧 EmailJS not configured yet. Order details copied to clipboard. See EMAILJS_SETUP.md to enable email notifications.', 'warning');
            } else {
                // Other error (network, API, etc.)
                copyToClipboard(orderText);
                showNotification('⚠️ Email failed. Order details copied to clipboard as backup. Please email us directly.', 'warning');
            }
        }
        
        // Reset button after a delay
        setTimeout(() => {
            orderButton.disabled = false;
            orderButton.innerHTML = '<span>Submit Order Request</span><svg class="btn-arrow" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
        }, 3000);
    });
}

function generateOrderDetails(pricing) {
    const items = [];
    
    // Group products by name with quantities
    Object.entries(cart).forEach(([productName, quantity]) => {
        if (quantity > 0) {
            items.push(`${productName} (x${quantity})`);
        }
    });
    
    if (pricing.bonus) {
        items.push(`Black & Blue (FREE BONUS)`);
    }
    
    return {
        items,
        quantity: getTotalQuantity(),
        total: pricing.total,
        perItem: pricing.perItem,
        savings: pricing.savings,
        bonus: pricing.bonus
    };
}

function formatOrderText(orderDetails, customerName, deliveryAddress, eircode, customerEmail, customerPhone) {
    let text = `SECURITY KITTY ORDER\n\n`;
    text += `NAME: ${customerName || '[Your Name]'}\n`;
    text += `DELIVERY ADDRESS: ${deliveryAddress || '[Your Address]'}\n`;
    text += `EIRCODE: ${eircode || '[Your Eircode]'}\n`;
    text += `EMAIL: ${customerEmail || '[Your Email]'}\n`;
    if (customerPhone) {
        text += `PHONE: ${customerPhone}\n`;
    }
    text += '\n';
    text += `SECURITY KITTY STYLES:\n`;
    orderDetails.items.forEach(item => {
        text += `${item}\n`;
    });
    text += `\nQUANTITY: ${orderDetails.quantity}\n`;
    text += `TOTAL: €${orderDetails.total}\n`;
    if (orderDetails.savings > 0) {
        text += `SAVINGS: €${orderDetails.savings}\n`;
    }
    if (orderDetails.bonus) {
        text += `BONUS: Black & Blue Edition (FREE)\n`;
    }
    return text;
}

function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).catch(err => {
            console.error('Failed to copy:', err);
            fallbackCopy(text);
        });
    } else {
        fallbackCopy(text);
    }
}

function fallbackCopy(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
        document.execCommand('copy');
    } catch (err) {
        console.error('Fallback copy failed:', err);
    }
    document.body.removeChild(textarea);
}

// ============================================
// EMAIL ORDER FUNCTIONALITY
// ============================================

/**
 * Send order email via EmailJS
 * 
 * SETUP INSTRUCTIONS:
 * 1. Sign up for free at https://www.emailjs.com/
 * 2. Create an email service (Gmail, Outlook, etc.)
 * 3. Create an email template with these variables:
 *    - {{customer_name}}
 *    - {{delivery_address}}
 *    - {{eircode}}
 *    - {{contact_info}}
 *    - {{order_items}}
 *    - {{total_quantity}}
 *    - {{total_price}}
 *    - {{savings}}
 *    - {{bonus_item}}
 * 4. Get your Service ID, Template ID, and Public Key
 * 5. Replace the values below with your actual IDs
 */
// Generate unique order number
function generateOrderNumber() {
    // Generate a random number between 100 and 99999 (3-5 digits)
    const random = Math.floor(Math.random() * 99900) + 100;
    return `SK${random}`;
}

async function sendOrderEmail(orderDetails, customerName, deliveryAddress, eircode, contactInfo, orderNumber) {
    // Check if EmailJS is loaded
    if (typeof emailjs === 'undefined') {
        throw new Error('EmailJS not configured. Please set up EmailJS first. See EMAILJS_SETUP.md for instructions.');
    }
    
    // CONFIGURATION - EmailJS details
    const EMAILJS_SERVICE_ID = 'service_dwfdblm';
    const EMAILJS_TEMPLATE_ID = 'template_vjhd31z';
    
    // Check if EmailJS is properly configured
    if (EMAILJS_SERVICE_ID === 'YOUR_SERVICE_ID' || EMAILJS_TEMPLATE_ID === 'YOUR_TEMPLATE_ID') {
        throw new Error('EmailJS not configured. Please update EMAILJS_SERVICE_ID and EMAILJS_TEMPLATE_ID in script.js. See EMAILJS_SETUP.md for instructions.');
    }
    
    // Format order items for email
    const orderItemsList = orderDetails.items.join('\n');
    
    // Prepare email template parameters
    const templateParams = {
        customer_name: customerName,
        delivery_address: deliveryAddress,
        eircode: eircode,
        customer_email: contactInfo.split(' | Phone: ')[0], // Extract email (before " | Phone:")
        customer_phone: contactInfo.includes(' | Phone: ') ? contactInfo.split(' | Phone: ')[1] : '',
        contact_info: contactInfo, // Keep for backward compatibility
        order_items: orderItemsList,
        total_quantity: orderDetails.quantity.toString(),
        total_price: `€${orderDetails.total}`,
        savings: orderDetails.savings > 0 ? `€${orderDetails.savings}` : '€0',
        bonus_item: orderDetails.bonus ? 'Yes - Black & Blue Edition (FREE)' : 'No',
        order_number: orderNumber,
        order_date: new Date().toLocaleDateString('en-IE', { 
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    };
    
    // Send email via EmailJS
    try {
        const response = await emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            templateParams
        );
        
        console.log('Email sent successfully:', response);
        return response;
    } catch (error) {
        console.error('EmailJS error:', error);
        // Provide more helpful error message
        if (error.text) {
            console.error('EmailJS error details:', error.text);
        }
        throw error;
    }
}

// ============================================
// CUSTOMER CONFIRMATION EMAIL
// ============================================

/**
 * Send order confirmation email to customer with payment instructions
 * 
 * You'll need to create a second EmailJS template for customer confirmations
 * Template ID will be set below
 */
async function sendCustomerConfirmationEmail(orderDetails, customerName, deliveryAddress, eircode, customerEmail, orderNumber) {
    // Check if EmailJS is loaded
    if (typeof emailjs === 'undefined') {
        throw new Error('EmailJS not configured.');
    }
    
    // CONFIGURATION - Use same service as business owner emails
    const EMAILJS_SERVICE_ID = 'service_dwfdblm';
    
    // CONFIGURATION - Customer confirmation template
    const EMAILJS_CUSTOMER_TEMPLATE_ID = 'template_n9q4uzu';
    
    // CONFIGURATION - Your Revolut payment link base URL
    const REVOLUT_PAYMENT_BASE = 'https://revolut.me/seckit';
    
    // Format order items for customer email (more customer-friendly format)
    const orderItemsList = orderDetails.items.map((item, index) => {
        return `${index + 1}. ${item}`;
    }).join('\n');
    
    // Validate email address
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!customerEmail || !emailRegex.test(customerEmail)) {
        console.error('Invalid email address provided:', customerEmail);
        console.log('Skipping customer confirmation email.');
        return;
    }
    
    console.log('Sending customer confirmation email to:', customerEmail);
    
    // Build Revolut payment link with pre-filled amount and order number
    // Revolut.me supports URL parameters: ?amount=XX.XX&note=ORDER_NUMBER
    // IMPORTANT: Revolut expects amount in cents (smallest currency unit), so multiply by 100
    const paymentAmountInCents = Math.round(orderDetails.total * 100); // Convert euros to cents
    const encodedOrderNumber = encodeURIComponent(orderNumber); // URL encode the order number
    const revolutLink = `${REVOLUT_PAYMENT_BASE}?amount=${paymentAmountInCents}&note=${encodedOrderNumber}`;
    
    // Prepare customer email template parameters
    const templateParams = {
        to_email: customerEmail, // EmailJS will use this if template "To Email" field is set to {{to_email}}
        customer_name: customerName,
        order_number: orderNumber,
        order_items: orderItemsList,
        total_quantity: orderDetails.quantity.toString(),
        total_price: `€${orderDetails.total}`,
        payment_amount: `€${orderDetails.total}`,
        revolut_link: revolutLink,
        order_date: new Date().toLocaleDateString('en-IE', { 
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }),
        delivery_address: deliveryAddress,
        eircode: eircode
    };
    
    // Send email to customer
    try {
        const response = await emailjs.send(
            EMAILJS_SERVICE_ID, // Use same service
            EMAILJS_CUSTOMER_TEMPLATE_ID,
            templateParams
        );
        
        console.log('Customer confirmation email sent successfully:', response);
        return response;
    } catch (error) {
        console.error('Customer email error:', error);
        // Don't throw - customer email failure shouldn't block the order
        // The business owner still gets the order notification
    }
}

// ============================================
// NOTIFICATION SYSTEM
// ============================================

function showNotification(message, type = 'info') {
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Check if mobile
    const isMobile = window.innerWidth <= 768;
    
    notification.style.cssText = `
        position: fixed;
        top: ${isMobile ? '80px' : '100px'};
        ${isMobile ? 'left: 0.75rem; right: 0.75rem;' : 'right: 20px;'}
        padding: ${isMobile ? '0.75rem 1rem' : '1rem 1.5rem'};
        background: ${type === 'success' ? 'rgba(16, 185, 129, 0.9)' : type === 'warning' ? 'rgba(245, 158, 11, 0.9)' : 'rgba(99, 102, 241, 0.9)'};
        color: white;
        border-radius: ${isMobile ? '10px' : '12px'};
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        backdrop-filter: blur(10px);
        font-weight: 500;
        font-size: ${isMobile ? '0.875rem' : '1rem'};
        max-width: ${isMobile ? 'none' : '400px'};
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ============================================
// ORDER CONFIRMATION MODAL
// ============================================

function showOrderConfirmationModal(orderNumber, customerEmail, orderTotal) {
    const modal = document.getElementById('orderConfirmationModal');
    const emailSpan = document.getElementById('confirmationEmail');
    const orderNumberSpan = document.getElementById('confirmationOrderNumber');
    
    if (emailSpan) emailSpan.textContent = customerEmail;
    if (orderNumberSpan) orderNumberSpan.textContent = orderNumber;
    
    if (modal) {
        modal.classList.add('show');
        // Prevent body scroll when modal is open
        document.body.style.overflow = 'hidden';
    }
}

function closeOrderConfirmationModal() {
    const modal = document.getElementById('orderConfirmationModal');
    if (modal) {
        modal.classList.remove('show');
        // Restore body scroll
        document.body.style.overflow = '';
    }
}

// Close modal when clicking outside
document.addEventListener('click', function(e) {
    const modal = document.getElementById('orderConfirmationModal');
    if (modal && e.target === modal.querySelector('.info-popup-overlay')) {
        closeOrderConfirmationModal();
    }
});

// ============================================
// CONTACT FORM
// ============================================

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = document.getElementById('contactSubmitBtn');
        const contactName = document.getElementById('contactName').value.trim();
        const contactEmail = document.getElementById('contactEmail').value.trim();
        const contactMessage = document.getElementById('contactMessage').value.trim();
        
        // Validate
        if (!contactName || !contactEmail || !contactMessage) {
            showNotification('Please fill in all fields', 'warning');
            return;
        }
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(contactEmail)) {
            showNotification('Please enter a valid email address', 'warning');
            return;
        }
        
        // Disable button and show loading
        submitBtn.disabled = true;
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>Sending...</span>';
        
        try {
            // Send contact form email via EmailJS
            const EMAILJS_SERVICE_ID = 'service_dwfdblm';
            const EMAILJS_CONTACT_TEMPLATE_ID = 'YOUR_CONTACT_TEMPLATE_ID'; // Replace with your contact template ID
            
            if (EMAILJS_CONTACT_TEMPLATE_ID === 'YOUR_CONTACT_TEMPLATE_ID') {
                // Fallback: Use the order template if contact template not set up yet
                const templateParams = {
                    customer_name: contactName,
                    customer_email: contactEmail, // Make email visible in customer_email field
                    customer_phone: '', // Empty for contact forms
                    contact_info: `📧 EMAIL: ${contactEmail} | 📝 CONTACT FORM SUBMISSION`, // Make it very clear this is the email
                    delivery_address: 'Contact Form Submission - Not a delivery address',
                    eircode: 'N/A',
                    order_items: `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n📝 CONTACT FORM MESSAGE\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n${contactMessage}\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
                    total_quantity: '1',
                    total_price: 'Contact Form',
                    savings: '€0',
                    bonus_item: 'No',
                    order_number: 'CONTACT-' + Date.now().toString().slice(-6),
                    order_date: new Date().toLocaleDateString('en-IE', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    })
                };
                
                await emailjs.send(
                    EMAILJS_SERVICE_ID,
                    'template_vjhd31z', // Using order template as fallback
                    templateParams
                );
            } else {
                // Use dedicated contact template (recommended)
                const templateParams = {
                    from_name: contactName,
                    from_email: contactEmail,
                    message: contactMessage,
                    reply_to: contactEmail,
                    date: new Date().toLocaleDateString('en-IE', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    })
                };
                
                await emailjs.send(
                    EMAILJS_SERVICE_ID,
                    EMAILJS_CONTACT_TEMPLATE_ID,
                    templateParams
                );
            }
            
            // Success
            showNotification('✅ Message sent successfully! We\'ll get back to you soon.', 'success');
            
            // Clear form
            contactForm.reset();
            
        } catch (error) {
            console.error('Contact form error:', error);
            showNotification('⚠️ Failed to send message. Please try again or email us directly.', 'warning');
        } finally {
            // Re-enable button
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }
    });
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ============================================
// MOBILE MENU
// ============================================

const mobileMenuToggle = document.getElementById('mobileMenuToggle');
if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        const navLinks = document.querySelector('.nav-links');
        navLinks.classList.toggle('mobile-open');
        mobileMenuToggle.classList.toggle('active');
    });
}

// ============================================
// PARALLAX EFFECTS
// ============================================

function initParallax() {
    const parallaxElements = document.querySelectorAll('.hero-shapes .shape, .gradient-orb');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.5;
        
        parallaxElements.forEach((element, index) => {
            const speed = (index + 1) * 0.1;
            element.style.transform = `translateY(${rate * speed}px)`;
        });
    });
}

// Note: Enhanced parallax is also initialized in initEnhancedParallax() 
// which provides more advanced parallax effects on hero content and shapes

// ============================================
// SMART UPSELL SYSTEM
// ============================================

function showSmartUpsell() {
    const totalQty = getTotalQuantity();
    
    // Remove existing upsell if any
    const existingUpsell = document.getElementById('smartUpsell');
    if (existingUpsell) {
        existingUpsell.remove();
    }
    
    // Don't show if cart is empty
    if (totalQty === 0) {
        return;
    }
    
    // If they've reached 5+ items, don't show upsell (they're at max tier)
    if (totalQty >= 5) {
        return;
    }
    
    // Calculate next tier benefits
    const currentPricing = getPricingForQuantity(totalQty);
    const nextTierQty = totalQty < 5 ? totalQty + 1 : null;
    
    if (!nextTierQty || nextTierQty > 5) return;
    
    const nextTierPricing = getPricingForQuantity(nextTierQty);
    const additionalCost = nextTierPricing.total - currentPricing.total;
    const additionalSavings = nextTierPricing.savings - currentPricing.savings;
    const itemsNeeded = nextTierQty - totalQty;
    
    // Only show if there's a meaningful benefit
    if (additionalSavings <= 0 && !nextTierPricing.bonus) return;
    
    // Create upsell banner
    const upsell = document.createElement('div');
    upsell.id = 'smartUpsell';
    upsell.className = 'smart-upsell';
    
    let message = '';
    let highlight = '';
    let giftInfo = '';
    
    // Calculate items needed for free gift
    const itemsNeededForGift = 5 - totalQty;
    
    // Calculate pricing if they reach free gift tier (5 items)
    const freeGiftPricing = getPricingForQuantity(5);
    const freeGiftCost = freeGiftPricing.total - currentPricing.total;
    const freeGiftSavings = freeGiftPricing.savings - currentPricing.savings;
    
    if (totalQty === 4) {
        // Special case: 4 -> 5 (free gift!)
        message = `Add just <strong>1 more item</strong> and get the <strong>Black & Blue Edition FREE</strong>!`;
        highlight = `Save an extra €${additionalSavings.toFixed(2)} + Free Gift`;
        giftInfo = `🎁 Free Black & Blue Edition included!`;
    } else if (totalQty === 3) {
        message = `Add <strong>1 more item</strong> to unlock better pricing!`;
        highlight = `Save an extra €${additionalSavings.toFixed(2)}`;
        giftInfo = `🎁 Just ${itemsNeededForGift} more item${itemsNeededForGift > 1 ? 's' : ''} to get the Free Gift!`;
    } else if (totalQty === 2) {
        message = `Add <strong>1 more item</strong> to unlock better pricing!`;
        highlight = `Save an extra €${additionalSavings.toFixed(2)}`;
        giftInfo = `🎁 Just ${itemsNeededForGift} more items to get the Free Gift!`;
    } else if (totalQty === 1) {
        message = `Add <strong>1 more item</strong> to start saving!`;
        highlight = `Save €${additionalSavings.toFixed(2)}`;
        giftInfo = `🎁 Just ${itemsNeededForGift} more items to get the Free Gift!`;
    }
    
    // Build button HTML - always show "Add 1 More", and show "Add X for Free Gift" if not at 4 items
    let buttonsHTML = `
        <button class="upsell-action-btn" onclick="addOneMoreForUpsell()">
            <span>Add 1 More</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 3V13M3 8H13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
        </button>
    `;
    
    // Add "Add X for Free Gift" button if not already at 4 items (and not at 5+)
    if (totalQty < 4 && itemsNeededForGift > 1) {
        buttonsHTML += `
            <button class="upsell-action-btn upsell-gift-btn" onclick="addMoreForFreeGift(${itemsNeededForGift})">
                <span>Add ${itemsNeededForGift} More for Free Gift</span>
                <div class="gift-btn-savings">Save €${freeGiftSavings.toFixed(2)} + Free Gift</div>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 1L10.09 5.26L15 6.27L11.5 9.14L12.18 14.02L8 11.77L3.82 14.02L4.5 9.14L1 6.27L5.91 5.26L8 1Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
        `;
    }
    
    upsell.innerHTML = `
        <div class="upsell-content">
            <div class="upsell-icon">💡</div>
            <div class="upsell-text">
                <div class="upsell-message">${message}</div>
                <div class="upsell-highlight">${highlight}</div>
                ${giftInfo ? `<div class="upsell-gift-info">${giftInfo}</div>` : ''}
                <div class="upsell-detail">Only €${additionalCost.toFixed(2)} more for ${itemsNeeded} more item${itemsNeeded > 1 ? 's' : ''}</div>
            </div>
            <div class="upsell-buttons">
                ${buttonsHTML}
            </div>
            <button class="upsell-close" onclick="closeUpsell()">×</button>
        </div>
    `;
    
    // Insert after products section or in floating cart area
    const productsSection = document.getElementById('products');
    if (productsSection) {
        productsSection.insertAdjacentElement('afterend', upsell);
    } else {
        document.body.appendChild(upsell);
    }
    
    // Check if user just completed a tier - if so, scroll to upsell
    if (targetQuantity && totalQty >= targetQuantity) {
        // User just completed their selected tier
        setTimeout(() => {
            scrollToUpsell();
        }, 800);
    }
}

function closeUpsell() {
    const upsell = document.getElementById('smartUpsell');
    if (upsell) {
        upsell.style.animation = 'slideOutUp 0.3s ease-out';
        setTimeout(() => {
            upsell.remove();
            // Scroll to checkout when upsell is dismissed
            scrollToCheckout();
        }, 300);
    }
}

window.closeUpsell = closeUpsell;
window.addOneMoreForUpsell = addOneMoreForUpsell;
window.addMoreForFreeGift = addMoreForFreeGift;

// ============================================
// FREE GIFT CONGRATULATORY MODAL
// ============================================

function showFreeGiftModal() {
    // Remove existing modal if any
    const existingModal = document.getElementById('freeGiftModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    const modal = document.createElement('div');
    modal.id = 'freeGiftModal';
    modal.className = 'free-gift-modal';
    modal.innerHTML = `
        <div class="free-gift-modal-overlay" onclick="closeFreeGiftModal()"></div>
        <div class="free-gift-modal-content">
            <button class="free-gift-close" onclick="closeFreeGiftModal()" aria-label="Close">×</button>
            <div class="free-gift-header">
                <div class="free-gift-icon">🎉</div>
                <h2>Congratulations!</h2>
                <p class="free-gift-subtitle">You've unlocked the Ultimate Tier!</p>
            </div>
            
            <div class="free-gift-body">
                <div class="free-gift-highlight">
                    <div class="free-gift-image-wrapper">
                        <img src="STYLES/Black & Blue.png" alt="Black & Blue Edition" class="free-gift-image">
                        <div class="free-gift-emoji-overlay">🖤💙</div>
                    </div>
                    <h3>Black & Blue Edition</h3>
                    <p class="free-gift-label">Your FREE Bonus Gift!</p>
                </div>
                
                <div class="free-gift-benefits">
                    <div class="benefit-item">
                        <span class="benefit-icon">✓</span>
                        <span>Free Black & Blue Edition included</span>
                    </div>
                    <div class="benefit-item">
                        <span class="benefit-icon">✓</span>
                        <span>Maximum savings unlocked</span>
                    </div>
                    <div class="benefit-item">
                        <span class="benefit-icon">✓</span>
                        <span>Best value per item</span>
                    </div>
                </div>
            </div>
            
            <div class="free-gift-footer">
                <button class="btn-primary btn-large" onclick="proceedToCheckoutFromModal()">
                    <span>Proceed to Checkout</span>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
                <button class="btn-secondary" onclick="closeFreeGiftModal()">
                    Continue Shopping
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Animate in
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
}

function closeFreeGiftModal() {
    const modal = document.getElementById('freeGiftModal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

function proceedToCheckoutFromModal() {
    closeFreeGiftModal();
    setTimeout(() => {
        scrollToCheckout();
    }, 300);
}

window.closeFreeGiftModal = closeFreeGiftModal;
window.proceedToCheckoutFromModal = proceedToCheckoutFromModal;

function addOneMoreForUpsell() {
    const currentQty = getTotalQuantity();
    const nextQty = currentQty + 1;
    
    // Close upsell
    const upsell = document.getElementById('smartUpsell');
    if (upsell) {
        upsell.style.animation = 'slideOutUp 0.3s ease-out';
        setTimeout(() => upsell.remove(), 300);
    }
    
    // Set target quantity and show selection guide
    targetQuantity = nextQty;
    createSelectionGuide(nextQty, true); // true = from upsell, so scroll to checkout when done
    
    // Scroll to products section
    setTimeout(() => {
        scrollToProducts();
        showNotification('Select one more style from the collection above', 'info');
    }, 300);
}

function addMoreForFreeGift(itemsNeeded) {
    // Close upsell
    const upsell = document.getElementById('smartUpsell');
    if (upsell) {
        upsell.style.animation = 'slideOutUp 0.3s ease-out';
        setTimeout(() => upsell.remove(), 300);
    }
    
    // Set target quantity to 5 (for free gift) and show selection guide
    targetQuantity = 5;
    createSelectionGuide(5, true); // true = from upsell, so scroll to checkout when done
    
    // Scroll to products section with message about free gift
    setTimeout(() => {
        scrollToProducts();
        showNotification(`Add ${itemsNeeded} more style${itemsNeeded > 1 ? 's' : ''} to get the FREE Black & Blue Edition!`, 'success');
    }, 300);
}

window.addOneMoreForUpsell = addOneMoreForUpsell;

// ============================================
// PRICING CARD INTERACTION
// ============================================

let targetQuantity = null;

function initPricingCardClicks() {
    // Use event delegation on the pricing cards container for better reliability
    const pricingTable = document.querySelector('.pricing-cards');
    
    if (!pricingTable) {
        console.warn('Pricing cards container not found!');
        // Fallback: try direct selection
        setTimeout(() => {
            const pricingCards = document.querySelectorAll('.pricing-card[data-qty]');
            if (pricingCards.length > 0) {
                console.log('Found pricing cards via fallback:', pricingCards.length);
                attachPricingCardListeners(pricingCards);
            }
        }, 500);
        return;
    }
    
    // Add click listener to the container (event delegation)
    pricingTable.addEventListener('click', (e) => {
        // Find the clicked pricing card
        const card = e.target.closest('.pricing-card[data-qty]');
        if (!card) return;
        
        e.preventDefault();
        e.stopPropagation();
        
        const qty = parseInt(card.getAttribute('data-qty'));
        console.log('Pricing card clicked, qty:', qty);
        
        if (isNaN(qty) || qty <= 0) {
            console.error('Invalid quantity:', qty);
            return;
        }
        
        handlePricingCardClick(card, qty);
    });
    
    // Also attach directly to cards as backup
    const pricingCards = document.querySelectorAll('.pricing-card[data-qty]');
    console.log('Found pricing cards:', pricingCards.length);
    attachPricingCardListeners(pricingCards);
}

function attachPricingCardListeners(cards) {
    cards.forEach((card, index) => {
        const qty = parseInt(card.getAttribute('data-qty'));
        console.log(`Card ${index + 1}: qty=${qty}`);
        
        // Make sure card is clickable
        card.style.cursor = 'pointer';
        card.style.userSelect = 'none';
        
        // Remove any existing listeners
        const newCard = card.cloneNode(true);
        card.parentNode.replaceChild(newCard, card);
        
        newCard.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Direct click on card, qty:', qty);
            handlePricingCardClick(newCard, qty);
        });
    });
}

function handlePricingCardClick(card, qty) {
    console.log('handlePricingCardClick called with qty:', qty);
    
    if (!card || !qty || qty <= 0) {
        console.error('Invalid parameters:', { card, qty });
        return;
    }
    
    targetQuantity = qty;
    
    // Visual feedback
    const allCards = document.querySelectorAll('.pricing-card[data-qty]');
    allCards.forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
    
    // Show prompt
    showPricingPrompt(qty);
    
    // Scroll to products section
    const productsSection = document.getElementById('products');
    if (productsSection) {
        const offsetTop = productsSection.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
    
    // Highlight products section after scroll
    setTimeout(() => {
        if (productsSection) {
            productsSection.style.animation = 'pulseHighlight 2s ease-out';
        }
    }, 500);
}

// Make function globally accessible
window.handlePricingCardClick = handlePricingCardClick;

function showPricingPrompt(qty) {
    const tierNames = {
        1: 'Single',
        2: 'Duo',
        3: 'Trio',
        4: 'Quad',
        5: 'Ultimate'
    };
    
    const tierName = tierNames[qty] || `${qty} Items`;
    const itemText = qty === 1 ? 'item' : 'items';
    
    showNotification(
        `Great choice! Select ${qty} ${itemText} from the styles below to get the ${tierName} pricing.`,
        'info'
    );
    
    // Create a persistent guide banner
    createSelectionGuide(qty);
}

function createSelectionGuide(targetQty, fromUpsell = false) {
    // Remove existing guide if any
    const existingGuide = document.getElementById('selectionGuide');
    if (existingGuide) {
        existingGuide.remove();
    }
    
    const guide = document.createElement('div');
    guide.id = 'selectionGuide';
    guide.className = 'selection-guide';
    
    // Determine message based on context
    let guideMessage = '';
    if (fromUpsell) {
        if (targetQty === 5) {
            guideMessage = `<strong>Add ${targetQty - getTotalQuantity()} more ${targetQty - getTotalQuantity() === 1 ? 'style' : 'styles'}</strong><span>to get the FREE Black & Blue Edition!</span>`;
        } else {
            guideMessage = `<strong>Add 1 more style</strong><span>to unlock better pricing</span>`;
        }
    } else {
        guideMessage = `<strong>Select ${targetQty} ${targetQty === 1 ? 'style' : 'styles'}</strong><span>to unlock ${targetQty === 1 ? 'this' : 'this'} pricing tier</span>`;
    }
    
    guide.innerHTML = `
        <div class="guide-content">
            <div class="guide-icon">🎯</div>
            <div class="guide-text">
                ${guideMessage}
            </div>
            <div class="guide-progress">
                <span class="current-count">${getTotalQuantity()}</span> / <span class="target-count">${targetQty}</span>
            </div>
            <button class="guide-close" onclick="closeSelectionGuide()">×</button>
        </div>
    `;
    
    // Store if this is from upsell
    guide.setAttribute('data-from-upsell', fromUpsell ? 'true' : 'false');
    
    document.body.appendChild(guide);
    
    // Update guide when cart changes
    updateSelectionGuide();
}

function updateSelectionGuide() {
    const guide = document.getElementById('selectionGuide');
    if (!guide || !targetQuantity) return;
    
    const currentQty = getTotalQuantity();
    const currentCount = guide.querySelector('.current-count');
    const guideText = guide.querySelector('.guide-text strong');
    const fromUpsell = guide.getAttribute('data-from-upsell') === 'true';
    
    if (currentCount) {
        currentCount.textContent = currentQty;
        
        // Update color based on progress
        if (currentQty >= targetQuantity) {
            currentCount.style.color = '#10b981';
            if (guideText) {
                guideText.textContent = `✓ ${targetQuantity} styles selected!`;
            }
            
            // Auto-close and scroll after 1.5 seconds
            setTimeout(() => {
                closeSelectionGuide();
                targetQuantity = null;
                
                // If from upsell, scroll to checkout; otherwise scroll to upsell
                setTimeout(() => {
                    if (fromUpsell) {
                        scrollToCheckout();
                        showNotification('Perfect! Ready to checkout', 'success');
                    } else {
                        scrollToUpsell();
                    }
                }, 500);
            }, 1500);
        } else if (currentQty > 0) {
            currentCount.style.color = 'var(--accent-light)';
        }
    }
}

function scrollToUpsell() {
    const upsell = document.getElementById('smartUpsell');
    if (upsell) {
        const offsetTop = upsell.offsetTop - 100;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
        
        // Highlight the upsell
        upsell.style.animation = 'pulseHighlight 2s ease-out';
    } else {
        // If no upsell (already at max tier), scroll to checkout
        scrollToCheckout();
    }
}

function scrollToCheckout() {
    const checkoutSection = document.getElementById('order');
    if (checkoutSection) {
        const offsetTop = checkoutSection.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

function scrollToProducts() {
    const productsSection = document.getElementById('products');
    if (productsSection) {
        const offsetTop = productsSection.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

function closeSelectionGuide() {
    const guide = document.getElementById('selectionGuide');
    if (guide) {
        guide.style.animation = 'slideOutUp 0.3s ease-out';
        setTimeout(() => guide.remove(), 300);
    }
    targetQuantity = null;
    
    // Remove selected state from pricing cards
    document.querySelectorAll('.pricing-card').forEach(card => {
        card.classList.remove('selected');
    });
}

// Make globally accessible
window.closeSelectionGuide = closeSelectionGuide;


// ============================================
// LIMITED OFFER POPUP
// ============================================

function showLimitedOfferPopup() {
    // Check if already shown/closed
    if (localStorage.getItem('limitedOfferShown') === 'true') {
        return;
    }
    
    const popup = document.getElementById('limitedOfferPopup');
    if (popup) {
        popup.classList.add('show');
        updateStockCount(); // Update stock count
    }
}

function closeLimitedOfferPopup() {
    const popup = document.getElementById('limitedOfferPopup');
    if (popup) {
        popup.classList.remove('show');
        localStorage.setItem('limitedOfferShown', 'true');
    }
}

window.closeLimitedOfferPopup = closeLimitedOfferPopup;

function initLimitedOffer() {
    // Show limited offer popup on page load
    setTimeout(() => {
        showLimitedOfferPopup();
    }, 1500); // Show after 1.5 seconds
}

// ============================================
// STOCK COUNT UPDATES
// ============================================

function updateStockCount() {
    // Simulate decreasing stock (you can replace with real stock management)
    let stock = parseInt(localStorage.getItem('remainingStock')) || 47;
    
    // Decrease by 1 every time someone adds to cart (optional)
    const stockElements = document.querySelectorAll('#popupStockCount, #popupStock');
    stockElements.forEach(el => {
        if (el) el.textContent = stock;
    });
    
    return stock;
}

// ============================================
// CHECKOUT PROGRESS BAR
// ============================================

function updateCheckoutProgress() {
    const totalQty = getTotalQuantity();
    const customerName = document.getElementById('customerName')?.value.trim();
    const deliveryAddress = document.getElementById('deliveryAddress')?.value.trim();
    
    const steps = document.querySelectorAll('.progress-step');
    const lines = document.querySelectorAll('.progress-line');
    
    // Step 1: Select Items
    if (totalQty > 0) {
        steps[0].classList.add('completed');
        steps[0].classList.remove('active');
        if (lines[0]) lines[0].classList.add('completed');
        
        // Step 2: Your Details
        if (customerName && deliveryAddress) {
            steps[1].classList.add('completed');
            steps[1].classList.remove('active');
            if (lines[1]) lines[1].classList.add('completed');
            
            // Step 3: Payment
            steps[2].classList.add('active');
        } else {
            steps[1].classList.add('active');
            steps[1].classList.remove('completed');
            steps[2].classList.remove('active');
        }
    } else {
        steps[0].classList.add('active');
        steps[0].classList.remove('completed');
        steps[1].classList.remove('active', 'completed');
        steps[2].classList.remove('active');
        lines.forEach(line => line.classList.remove('completed'));
    }
}

// ============================================
// ENHANCED PARALLAX SCROLLING
// ============================================

function initEnhancedParallax() {
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    const heroShapes = document.querySelectorAll('.hero-shapes .shape');
    const heroBadge = document.querySelector('.hero-badge');
    const heroTitle = document.querySelector('.hero-title');
    const heroTagline = document.querySelector('.hero-tagline');
    const heroButtons = document.querySelector('.hero-buttons');
    const heroStats = document.querySelector('.hero-stats');
    const gradientOrbs = document.querySelectorAll('.gradient-orb');
    
    if (!hero) return;
    
    // Use requestAnimationFrame for smoother performance
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const heroHeight = hero.offsetHeight;
        const heroTop = hero.offsetTop;
        const windowHeight = window.innerHeight;
        
        // Calculate how far through the hero section we are (0 to 1)
        const scrollProgress = Math.min(scrolled / (heroHeight + heroTop), 1);
        
        // Only apply parallax when hero is in view
        if (scrolled < heroHeight + heroTop + windowHeight) {
            // Base rate for parallax calculations
            const baseRate = scrolled;
            
            // Hero content - moves slower (foreground)
            if (heroContent) {
                const contentSpeed = 0.4;
                const contentY = baseRate * contentSpeed;
                const contentOpacity = Math.max(0, 1 - (scrolled / heroHeight) * 0.6);
                heroContent.style.transform = `translateY(${contentY}px)`;
                heroContent.style.opacity = contentOpacity;
            }
            
            // Individual elements with different speeds for depth
            if (heroBadge) {
                const badgeY = baseRate * 0.2;
                heroBadge.style.transform = `translateY(${badgeY}px)`;
                heroBadge.style.opacity = Math.max(0, 1 - (scrolled / heroHeight) * 0.8);
            }
            
            if (heroTitle) {
                const titleY = baseRate * 0.35;
                heroTitle.style.transform = `translateY(${titleY}px)`;
            }
            
            if (heroTagline) {
                const taglineY = baseRate * 0.45;
                heroTagline.style.transform = `translateY(${taglineY}px)`;
                heroTagline.style.opacity = Math.max(0, 1 - (scrolled / heroHeight) * 0.7);
            }
            
            if (heroButtons) {
                const buttonsY = baseRate * 0.5;
                heroButtons.style.transform = `translateY(${buttonsY}px)`;
            }
            
            if (heroStats) {
                const statsY = baseRate * 0.55;
                heroStats.style.transform = `translateY(${statsY}px)`;
                heroStats.style.opacity = Math.max(0, 1 - (scrolled / heroHeight) * 0.6);
            }
            
            // Enhanced parallax on shapes - move faster (background)
            heroShapes.forEach((shape, index) => {
                const speed = 0.6 + (index * 0.2); // Different speeds: 0.6, 0.8, 1.0
                const shapeY = baseRate * speed;
                const scale = 1 + (scrolled * 0.0002); // Subtle scale effect
                const opacity = Math.max(0.1, 0.2 - (scrolled / heroHeight) * 0.1);
                shape.style.transform = `translateY(${shapeY}px) scale(${scale})`;
                shape.style.opacity = opacity;
            });
            
            // Parallax on gradient orbs
            gradientOrbs.forEach((orb, index) => {
                const orbSpeed = 0.3 + (index * 0.15); // Different speeds for each orb
                const orbY = baseRate * orbSpeed;
                const orbX = Math.sin(scrolled * 0.001 + index) * 20; // Subtle horizontal movement
                orb.style.transform = `translate(${orbX}px, ${orbY}px)`;
            });
        }
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    // Throttle scroll events with requestAnimationFrame
    window.addEventListener('scroll', requestTick, { passive: true });
    
    // Initial call
    updateParallax();
}


// ============================================
// MOBILE IMPROVEMENTS
// ============================================

function initMobileImprovements() {
    // Improve touch targets
    const touchTargets = document.querySelectorAll('button, a, .product-card');
    touchTargets.forEach(target => {
        target.style.webkitTapHighlightColor = 'rgba(99, 102, 241, 0.2)';
    });
    
    // Prevent zoom on input focus (iOS)
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        if (input.style.fontSize === '') {
            input.style.fontSize = '16px'; // Prevents iOS zoom
        }
    });
    
    // Better scroll behavior on mobile
    if ('scrollBehavior' in document.documentElement.style) {
        document.documentElement.style.scrollBehavior = 'smooth';
    }
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    try {
        // Load cart from localStorage first
        loadCartFromStorage();
        
        createParticles();
        initStatsCounter();
        initScrollAnimations();
        initProductSelection();
        initProductFilter();
        initParallax();
        initEnhancedParallax();
        initFloatingCart();
        initPricingCardClicks();
        
        // Retry pricing card clicks after a delay to ensure DOM is ready
        setTimeout(() => {
            const pricingCards = document.querySelectorAll('.pricing-card[data-qty]');
            if (pricingCards.length > 0) {
                console.log('Retry: Found pricing cards:', pricingCards.length);
                attachPricingCardListeners(pricingCards);
            }
        }, 300);
        
        initLimitedOffer();
        initMobileImprovements();
        updateStockCount();
        
        // Update cart and UI after a small delay to ensure DOM is ready
        setTimeout(() => {
            try {
                // Ensure cart is hidden initially if empty
                const totalQty = getTotalQuantity();
                const floatingCart = document.getElementById('floatingCart');
                if (floatingCart) {
                    if (totalQty > 0) {
                        floatingCart.classList.remove('hidden');
                    } else {
                        floatingCart.classList.add('hidden');
                    }
                }
                
                updateCart();
                updateProgressIndicator();
                
                // Log cart state for debugging
                console.log('Cart after initialization:', cart);
                console.log('Total quantity:', getTotalQuantity());
            } catch (e) {
                console.error('Error in delayed initialization:', e);
            }
        }, 100);
    } catch (e) {
        console.error('Error during page initialization:', e);
        console.error('Error details:', e.message, e.stack);
        // Try to at least show the page even if some features fail
        // Don't show alert - just log to console for debugging
    }
    
    // Reload cart from localStorage when window regains focus (in case items were added from quiz)
    // Only add this listener if window.addEventListener is available
    if (typeof window !== 'undefined' && window.addEventListener) {
        window.addEventListener('focus', () => {
            try {
                const oldCart = JSON.stringify(cart);
                loadCartFromStorage();
                const newCart = JSON.stringify(cart);
                if (oldCart !== newCart) {
                    console.log('Cart changed, updating UI');
                    updateCart();
                    // Update product card displays
                    Object.keys(cart).forEach(productName => {
                        const productCard = document.querySelector(`[data-name="${productName}"]`);
                        if (productCard) {
                            const qtyDisplay = productCard.querySelector('.product-qty');
                            if (qtyDisplay) {
                                const currentQty = cart[productName] || 0;
                                qtyDisplay.textContent = currentQty;
                                qtyDisplay.setAttribute('data-qty', currentQty);
                                if (currentQty > 0) {
                                    productCard.classList.add('selected');
                                }
                            }
                        }
                    });
                }
            } catch (e) {
                console.error('Error in focus event handler:', e);
            }
        });
    }
    
    // Check if user came from quiz and scroll to matched product
    const matchedStyle = sessionStorage.getItem('matchedStyle');
    const fromQuiz = sessionStorage.getItem('fromQuiz');
    if (matchedStyle && fromQuiz === 'true') {
        // Reload cart from localStorage to ensure we have the latest (including quiz selection)
        setTimeout(() => {
            loadCartFromStorage();
            
            // Update all product card displays to reflect current cart
            Object.keys(cart).forEach(productName => {
                const productCard = document.querySelector(`[data-name="${productName}"]`);
                if (productCard) {
                    const qtyDisplay = productCard.querySelector('.product-qty');
                    if (qtyDisplay) {
                        const currentQty = cart[productName] || 0;
                        qtyDisplay.textContent = currentQty;
                        qtyDisplay.setAttribute('data-qty', currentQty);
                        
                        // Update card selected state
                        if (currentQty > 0) {
                            productCard.classList.add('selected');
                        } else {
                            productCard.classList.remove('selected');
                        }
                        
                        // Update button states
                        const decreaseBtn = productCard.querySelector('[data-action="decrease"]');
                        if (decreaseBtn) {
                            decreaseBtn.disabled = currentQty === 0;
                        }
                    }
                }
            });
            
            // Update cart UI
            updateCart();
            
            scrollToMatchedProductFromQuiz(matchedStyle);
            sessionStorage.removeItem('matchedStyle');
            sessionStorage.removeItem('fromQuiz');
        }, 500);
    }
    
    // Update checkout progress when form fields change
    const formInputs = document.querySelectorAll('#customerName, #deliveryAddress');
    formInputs.forEach(input => {
        input.addEventListener('input', updateCheckoutProgress);
    });
});

function scrollToMatchedProductFromQuiz(styleName) {
    // Find the product card with matching name
    const productCard = document.querySelector(`[data-name="${styleName}"]`);
    if (productCard) {
        // Scroll to products section first
        const productsSection = document.getElementById('products');
        if (productsSection) {
            const offsetTop = productsSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            // Then highlight the matched product
            setTimeout(() => {
                productCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                productCard.style.animation = 'pulseHighlight 2s ease-out';
                productCard.style.border = '3px solid var(--primary-light)';
                productCard.style.boxShadow = '0 0 30px rgba(99, 102, 241, 0.6)';
                
                // Show notification
                showNotification(`Your matched style: ${styleName}!`, 'success');
                
                // Remove highlight after animation
                setTimeout(() => {
                    productCard.style.border = '';
                    productCard.style.boxShadow = '';
                }, 2000);
            }, 500);
        }
    }
}
