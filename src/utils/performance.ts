// Performance monitoring utilities
export const measurePerformance = () => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    // Core Web Vitals
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'navigation') {
          const navEntry = entry as PerformanceNavigationTiming;
          console.log('Page Load Time:', navEntry.loadEventEnd - navEntry.fetchStart);
        }
        
        if (entry.entryType === 'paint') {
          console.log(`${entry.name}:`, entry.startTime);
        }
      }
    });

    observer.observe({ entryTypes: ['navigation', 'paint'] });
  }
};

// Preload critical resources
export const preloadCriticalResources = () => {
  if (typeof window !== 'undefined') {
    // Preload Supabase connection
    const link = document.createElement('link');
    link.rel = 'dns-prefetch';
    link.href = import.meta.env.VITE_SUPABASE_URL || '';
    document.head.appendChild(link);
  }
};

// Debounce utility for form inputs
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};