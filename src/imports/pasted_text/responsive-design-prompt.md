Responsive Web Design Implementation Prompt
Objective
Ensure the web application provides an optimal viewing experience across all device types (mobile phones, tablets, and laptops/desktops) with seamless responsive behavior.

Technical Requirements
1. Viewport Configuration
html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes">
Ensure proper viewport meta tag implementation

Allow user scaling for accessibility (minimum 1.0 to maximum 5.0)

2. Breakpoint Implementation
Implement responsive breakpoints for:

Mobile: 320px - 480px

Large Mobile: 481px - 767px

Tablet: 768px - 1024px

Desktop: 1025px - 1440px

Large Desktop: 1441px and above

3. CSS Framework Guidelines
Use CSS Grid and Flexbox for fluid layouts

Implement mobile-first approach (start with mobile styles, then enhance)

Use relative units (rem, em, %, vh, vw) instead of fixed pixels

Avoid fixed heights; let content determine height

4. Layout Requirements
Mobile View (<768px):

Single column layout

Hamburger menu for navigation

Stack elements vertically

Full-width containers

Touch-friendly tap targets (minimum 44x44px)

Font size minimum 16px for readability

Tablet View (768px - 1024px):

2-column layout where appropriate

Visible navigation or hamburger based on space

Optimized touch targets

Maintain readability without zoom

Desktop View (>1024px):

Multi-column layout

Full horizontal navigation

Utilize available screen real estate

Hover states for interactive elements

5. Interactive Elements
Ensure all clickable elements have adequate spacing on touch devices

Implement touch-friendly dropdowns and modals

Test hover-dependent features (provide alternatives for touch)

Smooth transitions between breakpoints

6. Media & Assets
Implement responsive images using srcset and sizes

Use SVG for icons and logos where possible

Optimize images for different screen sizes

Lazy load images below the fold

Serve appropriate image formats (WebP with fallbacks)

7. Typography
css
:root {
  --font-scale-mobile: 1rem;
  --font-scale-tablet: 1.125rem;
  --font-scale-desktop: 1.25rem;
}
Fluid typography using clamp() function

Adjust line-height for readability (1.5 for body text)

Ensure sufficient color contrast (WCAG AA minimum)

8. Testing Checklist
Cross-Browser Testing:

Chrome (latest)

Safari (latest)

Firefox (latest)

Edge (latest)

Mobile Chrome (iOS/Android)

Mobile Safari (iOS)

Device Testing:

iPhone SE (375px)

iPhone 12/13/14 (390px)

iPad (768px)

iPad Pro (1024px)

Small laptop (1366px)

Desktop (1920px)

Test Cases:

Text remains readable without zooming

No horizontal scroll on any device

Forms are usable on touch devices

Navigation works on all screen sizes

Images scale properly

Touch targets are adequately spaced

Content reflows appropriately at all breakpoints

No overlapping elements

Consistent functionality across devices

9. Performance Requirements
Core Web Vitals optimization

Largest Contentful Paint (LCP) < 2.5s

First Input Delay (FID) < 100ms

Cumulative Layout Shift (CLS) < 0.1

Minimize render-blocking resources

10. Accessibility Considerations
Maintain keyboard navigation on desktop

Ensure touch targets are accessible

Preserve focus states

Test with screen readers

Maintain readable font sizes

11. Implementation Example
css
/* Mobile First Approach */
.container {
  width: 100%;
  padding: 1rem;
}

/* Tablet */
@media (min-width: 768px) {
  .container {
    max-width: 750px;
    margin: 0 auto;
    padding: 1.5rem;
  }
  
  .grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .container {
    max-width: 1000px;
  }
  
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
12. Validation & Sign-off
Test on physical devices (not just emulators)

Verify all user flows on each device type

Check analytics for most-used device sizes

Get stakeholder approval on all breakpoints

Deliverables
Fully responsive web application

Documentation of breakpoint behavior

Test results across specified devices

Any device-specific optimizations implemented

This prompt ensures comprehensive responsive design coverage and can be adapted based on your specific application needs.