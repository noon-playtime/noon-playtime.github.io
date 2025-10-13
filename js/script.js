document.addEventListener('DOMContentLoaded', () => {
    const bookObject = document.getElementById('book-object');
    const openBtn = document.getElementById('open-book-btn');
    const pages = document.querySelectorAll('.page'); // All pages
    
    let isOpened = false;
    let currentPageIndex = 1; // Current visible page (starts on the cover)

    // --- 1. Initial State: Tilting the book for a realistic look ---
    gsap.set(bookObject, {
        rotationX: 8,   // Slightly tilted up
        rotationY: -15, // Tilted to the left (viewing the spine side)
        z: -150,        // Pushed back slightly
        scale: 0.9,     // Scaled down
        transformOrigin: "center center"
    });
    
    // --- Helper Function: Flips any page element ---
    function flipPage(pageElement, targetRotationY, duration = 1.8, zIndex = 50) {
        gsap.to(pageElement, {
            duration: duration, 
            rotationY: targetRotationY, 
            z: zIndex, 
            ease: "power4.inOut" // Smooth, professional easing
        });
    }

    // --- 2. Main Open/Flip Logic ---
    openBtn.addEventListener('click', () => {
        if (!isOpened) {
            // First time: Open the book from the tilted state
            const openTL = gsap.timeline({ onComplete: () => {
                isOpened = true;
                currentPageIndex = 2; // Now viewing pages 2 & 3
                openBtn.textContent = '>> หน้าถัดไป >>';
            }});
            
            // 1. Straighten and Zoom the book object
            openTL.to(bookObject, {
                duration: 1.5,
                rotationX: 0,
                rotationY: 0,
                z: 0,
                scale: 1,
                ease: "expo.out" 
            });
            
            // 2. Flip the cover (Page 1) over
            openTL.to(pages[0], { // pages[0] is #page-1 (cover)
                duration: 1.5,
                rotationY: -180, 
                z: 5, // Ensures it flips clearly over the spine
                ease: "power4.inOut",
            }, 0.5); // Start the flip animation after the book starts to straighten
            
        } else {
            // Subsequent Clicks: Flip to the next page spread
            const pageToFlip = document.getElementById(`page-${currentPageIndex + 1}`);
            
            if (pageToFlip) {
                // Determine if it's a left or right page flip
                const isRightPage = pageToFlip.classList.contains('right-page');
                const targetRotation = isRightPage ? -180 : 180;
                
                flipPage(pageToFlip, targetRotation, 1.2, 50 + currentPageIndex); // Flip it!
                
                currentPageIndex += 2; // Advance by 2 pages (the spread)
                
                // Example: Toggle button text for demonstration
                if (currentPageIndex >= pages.length) {
                    openBtn.textContent = '...จบตำนาน...';
                    openBtn.disabled = true;
                }
            } else {
                openBtn.textContent = 'จบตำนานแล้ว';
                openBtn.disabled = true;
            }
        }
    });
});
