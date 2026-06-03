export type SearchFilterState = {
  searchQuery: string;
  selectedCountry: string | null;
  selectedCities: string[];
  selectedSpecialty: string | null;
};

export type SearchFilterAction =
  | { type: 'set_search_query'; payload: string }
  | { type: 'set_selected_country'; payload: string | null }
  | { type: 'toggle_city'; payload: string }
  | { type: 'clear_cities' }
  | { type: 'set_selected_specialty'; payload: string | null }
  | { type: 'clear_filters' };
