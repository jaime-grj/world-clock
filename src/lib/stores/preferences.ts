import { writable } from 'svelte/store';

// Types
export type Theme = 'light' | 'dark';

export type FavoriteZone = {
	country: string;
	timezone: string;
	flagName?: string;
};

type PreferencesStore = {
	theme: Theme;
	favorites: FavoriteZone[];
};

const THEME_KEY = 'world-clock-theme';
const FAVORITES_KEY = 'world-clock-favorites';

function createPreferencesStore() {
	// Helper to get initial value from localStorage safely
	const getInitialTheme = (): Theme => {
		if (typeof window === 'undefined') return 'light';
		const savedTheme = window.localStorage.getItem(THEME_KEY);
		return savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : 'light';
	};

	const getInitialFavorites = (): FavoriteZone[] => {
		if (typeof window === 'undefined') return [];
		const savedFavorites = window.localStorage.getItem(FAVORITES_KEY);
		if (savedFavorites) {
			try {
				return JSON.parse(savedFavorites);
			} catch (e) {
				/* fallthrough */
			}
		}
		return [];
	};

	const { subscribe, update } = writable<PreferencesStore>({
		theme: getInitialTheme(),
		favorites: getInitialFavorites()
	});

	subscribe((value) => {
		if (typeof window !== 'undefined') {
			window.localStorage.setItem(THEME_KEY, value.theme);
			window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(value.favorites));
		}
	});

	return {
		subscribe,
		toggleTheme: () => update((prefs) => ({ ...prefs, theme: prefs.theme === 'light' ? 'dark' : 'light' })),
		addFavorite: (favorite: FavoriteZone) =>
			update((prefs) =>
				prefs.favorites.some((fav) => fav.timezone === favorite.timezone && fav.country === favorite.country)
					? prefs
					: { ...prefs, favorites: [...prefs.favorites, favorite] }
			),
		removeFavorite: (favToRemove: FavoriteZone) =>
			update((prefs) => ({
				...prefs,
				favorites: prefs.favorites.filter(
					(fav) => !(fav.timezone === favToRemove.timezone && fav.country === favToRemove.country)
				)
			}))
	};
}

export const preferences = createPreferencesStore();