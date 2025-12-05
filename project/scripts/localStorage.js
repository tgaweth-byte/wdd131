// localStorage Management Utilities
class LocalStorageManager {
    constructor() {
        this.storageKeys = {
            CONTACT_SUBMISSIONS: 'contactSubmissions',
            USER_PREFERENCES: 'userPreferences',
            NEWS_ARTICLES: 'haitiNews',
            LAST_VISIT: 'lastVisit',
            TEMPERATURE_CONVERSIONS: 'temperatureConversions'
        };
    }
    
    // Generic save method
    saveData(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
            return true;
        } catch (error) {
            console.error('Error saving to localStorage:', error);
            return false;
        }
    }
    
    // Generic load method
    loadData(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Error loading from localStorage:', error);
            return null;
        }
    }
    
    // Clear specific key
    clearData(key) {
        localStorage.removeItem(key);
    }
    
    // Clear all application data
    clearAll() {
        Object.values(this.storageKeys).forEach(key => {
            localStorage.removeItem(key);
        });
    }
    
    // Get storage usage
    getStorageUsage() {
        let total = 0;
        for (let key in localStorage) {
            if (localStorage.hasOwnProperty(key)) {
                total += localStorage[key].length * 2; // UTF-16 characters
            }
        }
        return total; // in bytes
    }
    
    // Save user preferences
    saveUserPreferences(preferences) {
        const currentPrefs = this.loadData(this.storageKeys.USER_PREFERENCES) || {};
        const updatedPrefs = { ...currentPrefs, ...preferences };
        return this.saveData(this.storageKeys.USER_PREFERENCES, updatedPrefs);
    }
    
    // Get user preference
    getUserPreference(key) {
        const prefs = this.loadData(this.storageKeys.USER_PREFERENCES);
        return prefs ? prefs[key] : null;
    }
    
    // Track user visits
    trackVisit() {
        const now = new Date().toISOString();
        const visits = this.loadData(this.storageKeys.LAST_VISIT) || [];
        visits.push(now);
        
        // Keep only last 10 visits
        if (visits.length > 10) {
            visits.shift();
        }
        
        this.saveData(this.storageKeys.LAST_VISIT, visits);
        return visits.length;
    }
    
    // Get visit statistics
    getVisitStats() {
        const visits = this.loadData(this.storageKeys.LAST_VISIT) || [];
        return {
            totalVisits: visits.length,
            lastVisit: visits[visits.length - 1],
            firstVisit: visits[0]
        };
    }
}

// Initialize localStorage manager
const storageManager = new LocalStorageManager();

// Track current visit
storageManager.trackVisit();

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { LocalStorageManager, storageManager };
}

// Initialize with default data if empty
function initializeStorage() {
    // Initialize news if empty
    if (!storageManager.loadData(storageManager.storageKeys.NEWS_ARTICLES)) {
        const defaultNews = [
            {
                id: 1,
                title: 'Bienvenue sur Découverte Haïti',
                content: 'Explorez la richesse culturelle et historique d\'Haïti.',
                date: new Date().toISOString().split('T')[0]
            }
        ];
        storageManager.saveData(storageManager.storageKeys.NEWS_ARTICLES, defaultNews);
    }
    
    // Initialize user preferences if empty
    if (!storageManager.loadData(storageManager.storageKeys.USER_PREFERENCES)) {
        const defaultPrefs = {
            theme: 'light',
            language: 'fr',
            newsletter: false
        };
        storageManager.saveData(storageManager.storageKeys.USER_PREFERENCES, defaultPrefs);
    }
}

// Run initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeStorage);