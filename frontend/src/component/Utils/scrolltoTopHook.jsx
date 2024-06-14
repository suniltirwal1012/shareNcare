import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useScrollToTopOnButtonClickAndNavLink = () => {
  const location = useLocation();

  useEffect(() => {
    const handleScrollToTop = () => {
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 0);
    };

    const observer = new MutationObserver(() => {
      const buttons = document.querySelectorAll('button');
      const navLinks = document.querySelectorAll('footer a');

      buttons.forEach((button) => {
        button.removeEventListener('click', handleScrollToTop); // Ensure no duplicate listeners
        button.addEventListener('click', handleScrollToTop);
      });

      navLinks.forEach((link) => {
        link.removeEventListener('click', handleScrollToTop); // Ensure no duplicate listeners
        link.addEventListener('click', handleScrollToTop);
      });
    });

    // Start observing the document body for changes
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Initial setup
    const buttons = document.querySelectorAll('button');
    const navLinks = document.querySelectorAll('footer a');

    buttons.forEach((button) => {
      button.addEventListener('click', handleScrollToTop);
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', handleScrollToTop);
    });

    // Scroll to top on route change
    handleScrollToTop();

    // Cleanup
    return () => {
      observer.disconnect();
      buttons.forEach((button) => {
        button.removeEventListener('click', handleScrollToTop);
      });
      navLinks.forEach((link) => {
        link.removeEventListener('click', handleScrollToTop);
      });
    };
  }, [location.pathname]); // Re-run the effect when the location pathname changes
};

export default useScrollToTopOnButtonClickAndNavLink;
