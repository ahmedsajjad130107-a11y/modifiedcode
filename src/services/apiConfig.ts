import { Platform } from 'react-native';

/**
 * Single source of truth for the backend API base URL.
 * All service files (api.ts, fareApi.ts, budgetApi.ts, feedbackApi.ts)
 * should import from here so you only update the ngrok URL in ONE place.
 */

// Production / device backend (Railway). Override at build time with EXPO_PUBLIC_API_URL in eas.json or EAS Secrets.
const DEFAULT_RELEASE_API_URL = 'https://modifiedcode-production.up.railway.app';

const getApiBaseUrl = () => {
    const envUrl = process.env.EXPO_PUBLIC_API_URL;

    if (__DEV__) {
        if (envUrl) return envUrl;

        // Platform.OS === 'web' is the correct check in React Native.
        if (Platform.OS === 'web') return 'http://localhost:8000';

        // Physical devices / emulators in dev → tunnel or explicit env
        return DEFAULT_RELEASE_API_URL;
    }

    // Release APK / store builds: must not use localhost
    return envUrl ?? DEFAULT_RELEASE_API_URL;
};

export const API_BASE_URL = getApiBaseUrl();

export const API_HEADERS = {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true',
};

console.log('[API] Base URL:', API_BASE_URL, '| Platform:', Platform.OS);
