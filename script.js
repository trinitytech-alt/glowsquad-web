// Toggle rooms field based on service selection
function toggleRoomsField(value) {
    const residentialWrapper = document.getElementById('residential-fields-wrapper');
    if (value === 'Residential Cleaning') {
        residentialWrapper.style.display = 'block';
        residentialWrapper.style.opacity = '1';
    } else {
        residentialWrapper.style.display = 'none';
        residentialWrapper.style.opacity = '0';
    }
}

// Navbar Pill Hover Effect
document.addEventListener('DOMContentLoaded', () => {
    // 1. Navigation Pill Effect
    const navItems = document.querySelectorAll('.nav-links li');
    const hoverPill = document.querySelector('.nav-hover-pill');
    const navLinksWrapper = document.querySelector('.nav-links-wrapper');

    if (navItems.length > 0 && hoverPill) {
        // Initialize pill position to active element or hidden
        const activeItem = document.querySelector('.nav-links li.active');

        function movePill(target) {
            const wrapperRect = navLinksWrapper.getBoundingClientRect();
            const targetRect = target.getBoundingClientRect();

            hoverPill.style.opacity = '1';
            hoverPill.style.width = `${targetRect.width}px`;
            hoverPill.style.transform = `translateX(${targetRect.left - wrapperRect.left - 8}px)`; // 8 is padding adjustment
        }

        // Setup hover events
        navItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                movePill(item);
            });
        });

        navLinksWrapper.addEventListener('mouseleave', () => {
            if (activeItem) {
                movePill(activeItem);
            } else {
                hoverPill.style.opacity = '0';
            }
        });

        // Initial setup
        if (activeItem) {
            setTimeout(() => movePill(activeItem), 100);
        }
    }

    // 2. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Interactive Cards global 3D effect applied to services
    const interactiveCards = document.querySelectorAll('.interactive-card');

    interactiveCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            // Apply exact 3D rotation based on mouse coordinates over the specific service card
            const rotateX = -y * 0.15; // Increased depth sensitivity for 3D wow factor
            const rotateY = x * 0.15;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;

            // Highlight effect using CSS custom property mapping (optional but nice touch)
            card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
            card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
        });

        card.addEventListener('mouseleave', () => {
            // Smoothly reset 3D transform
            card.style.transition = 'transform 0.5s ease';
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';

            setTimeout(() => {
                card.style.transition = 'transform 0.1s';
            }, 500);
        });

        card.addEventListener('mouseenter', () => {
            card.style.transition = 'transform 0.1s';
        });
    });

    // Booking Form Handler
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('booking-name').value.trim();
            const email = document.getElementById('booking-email').value.trim();
            const service = document.getElementById('booking-service').value;
            const message = document.getElementById('booking-message').value.trim();

            // Residential-specific fields
            const rooms = document.getElementById('booking-rooms')?.value;
            const location = document.getElementById('booking-location')?.value.trim();
            const frequency = document.getElementById('booking-frequency')?.value;
            const baths = document.getElementById('booking-baths')?.value;
            const date = document.getElementById('booking-date')?.value;
            const time = document.getElementById('booking-time')?.value;

            const subject = `Service Booking Request: ${service}`;
            const body =
                `Hello Glow Squad,

I would like to book the following service:

Name: ${name}
Email: ${email}
Service: ${service}${rooms ? `\nNumber of Rooms: ${rooms}` : ''}${location ? `\nLocation: ${location}` : ''}${frequency ? `\nFrequency: ${frequency}` : ''}${baths ? `\nNumber of Bathrooms: ${baths}` : ''}${date ? `\nDate of Service: ${date}` : ''}${time ? `\nTime of Service: ${time}` : ''}

Additional Requirements:
${message || 'None'}

Looking forward to hearing from you!`;

            const contactEmail = 'glowsquad.pty@outlook.com';

            const gmailUrl = `https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(contactEmail)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            const mailtoUrl = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

            // Remove existing panel
            const existing = document.getElementById('email-choice-panel');
            if (existing) existing.remove();

            // Build premium styled panel
            const panel = document.createElement('div');
            panel.id = 'email-choice-panel';
            panel.style.cssText = `
                margin-top: 1.2rem;
                padding: 1.6rem;
                background: linear-gradient(135deg, #FCFAF5 0%, #F4EFE6 100%);
                border: 1px solid rgba(212,175,55,0.25);
                border-radius: 20px;
                text-align: center;
                box-shadow: 0 8px 30px rgba(0,0,0,0.07);
                opacity: 0;
                transform: translateY(8px);
                transition: opacity 0.35s ease, transform 0.35s ease;
            `;
            panel.innerHTML = `
                <i class="fa-solid fa-paper-plane" style="font-size:1.8rem; color:#D4AF37; margin-bottom:0.6rem; display:block;"></i>
                <p style="font-weight:700; font-size:1.05rem; margin-bottom:0.25rem; color:#2C3329; font-family:'Outfit',sans-serif;">How would you like to send?</p>
                <p style="font-size:0.85rem; color:#888; margin-bottom:1.2rem; font-family:'Outfit',sans-serif;">Choose your preferred email method</p>
                <div style="display:flex; gap:0.8rem; justify-content:center; flex-wrap:wrap; margin-bottom:1rem;">
                    <a href="${gmailUrl}" target="_blank" rel="noopener noreferrer" style="
                        display:inline-flex; align-items:center; gap:0.5rem;
                        padding:0.7rem 1.5rem;
                        background:#D4AF37;
                        color:#fff;
                        border-radius:50px;
                        text-decoration:none;
                        font-weight:600;
                        font-size:0.95rem;
                        font-family:'Outfit',sans-serif;
                        box-shadow: 0 4px 12px rgba(212,175,55,0.35);
                        transition: transform 0.2s, box-shadow 0.2s;
                    " onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 6px 18px rgba(212,175,55,0.45)'"
                       onmouseout="this.style.transform='';this.style.boxShadow='0 4px 12px rgba(212,175,55,0.35)'">
                        <i class="fa-brands fa-google"></i> Open Gmail
                    </a>
                    <a href="${mailtoUrl}" style="
                        display:inline-flex; align-items:center; gap:0.5rem;
                        padding:0.7rem 1.5rem;
                        background:#fff;
                        color:#2C3329;
                        border:1.5px solid rgba(0,0,0,0.1);
                        border-radius:50px;
                        text-decoration:none;
                        font-weight:600;
                        font-size:0.95rem;
                        font-family:'Outfit',sans-serif;
                        box-shadow: 0 4px 12px rgba(0,0,0,0.06);
                        transition: transform 0.2s, box-shadow 0.2s;
                    " onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 6px 18px rgba(0,0,0,0.1)'"
                       onmouseout="this.style.transform='';this.style.boxShadow='0 4px 12px rgba(0,0,0,0.06)'">
                        <i class="fa-solid fa-envelope"></i> Email App
                    </a>
                </div>
                <p style="font-size:0.78rem; color:#aaa; font-family:'Outfit',sans-serif;">
                    Or contact us at <a href="mailto:${contactEmail}" style="color:#D4AF37; text-decoration:none; font-weight:600;">${contactEmail}</a>
                </p>
            `;
            bookingForm.after(panel);

            // Animate in
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    panel.style.opacity = '1';
                    panel.style.transform = 'translateY(0)';
                });
            });
        });
    }

    // Rating System Handler
    const ratingInputs = document.querySelectorAll('.star-rating input');
    const ratingMessage = document.getElementById('rating-message');

    if (ratingInputs.length > 0 && ratingMessage) {
        ratingInputs.forEach(input => {
            input.addEventListener('change', (e) => {
                const rating = e.target.value;
                ratingMessage.textContent = `Thank you for your ${rating}-star rating!`;
                ratingMessage.classList.add('success');

                // Optional: Disable inputs after rating to prevent multiple submissions
                ratingInputs.forEach(inp => inp.disabled = true);
            });
        });
    }
});
