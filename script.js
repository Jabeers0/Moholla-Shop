// --- Category Switching Logic ---
function showProducts(categoryId) {
    // Hide all product grids
    document.querySelectorAll('.product-grid').forEach(grid => {
        grid.classList.remove('active-cat');
    });
    // Show the selected product grid
    document.getElementById(categoryId).classList.add('active-cat');

    // Update active button state
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    // Find the button that corresponds to the category and make it active
    document.querySelector(`.category-btn[onclick*="${categoryId}"]`).classList.add('active');
}

// Initialize: Show the first category by default
document.addEventListener('DOMContentLoaded', () => {
    showProducts('cat1');
});


// --- Buy Button, Modal, and Voice Logic ---
const modal = document.getElementById('buy-modal');
const closeBtn = document.querySelector('.close-btn');
const purchaseForm = document.getElementById('purchase-form');
const buyVoice = document.getElementById('buy-voice');

// 1. Open Modal when a BUY button is clicked
document.querySelectorAll('.buy-btn').forEach(button => {
    button.addEventListener('click', (event) => {
        const productName = event.target.getAttribute('data-product-name');
        document.getElementById('modal-product-name').textContent = productName;
        
        modal.style.display = 'block';

        // Voice Open
        buyVoice.play().catch(error => {
            console.log('Voice playback failed (may require user interaction first):', error);
        });
    });
});

// 2. Close Modal when (x) is clicked
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// 3. Close Modal when user clicks outside of it
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// 4. Handle Form Submission (Ticket Creation)
purchaseForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    // --- THIS IS THE KEY PART FOR YOUR BACKEND ---
    // In a real website, this is where you would:
    // 1. Send an AJAX request to your server (e.g., using fetch or axios).
    // 2. The server script (PHP, Node, etc.) would save the order details (name, quantity, address)
    //    into a database and generate a 'ticket ID' or 'order ID'.
    // 3. You (the shop owner) would log into your admin panel to see and reply to the ticket.

    alert('Order Placed! A support ticket has been created for your order. We will contact you soon!');
    
    modal.style.display = 'none';
    purchaseForm.reset();
});

// --- Footer Navigation Scroll ---
document.querySelectorAll('.bottom-nav a').forEach(link => {
    link.addEventListener('click', function(e) {
        // Only scroll for links that point to sections
        if (this.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
        }
    });
});
