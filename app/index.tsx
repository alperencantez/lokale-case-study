import mockData from '@/src/data/mock_data.json';
import { Ionicons } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useRouter } from 'expo-router';
import React, { useMemo, useReducer, useRef } from 'react';
import { FlatList, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import DoctorListCard from '@/src/components/doctor-list-card';
import FilterChips from '@/src/components/filter-badge';
import SearchBar from '@/src/components/search-bar';
import DoctorListCardSkeleton from '@/src/components/skeletons/doctor-list-card-skeleton';
import ThemedButton from '@/src/components/themed/themed-button';
import ThemedSafeAreaView from '@/src/components/themed/themed-safearea-view';
import { useThemeColors } from '@/src/hooks/useThemeColors';
import { SearchFilterAction, SearchFilterState } from '@/src/types/search-filter';
import { useQuery } from '@tanstack/react-query';

const DEFAULT_COUNTRY = 'Türkiye';

type ActiveFilterType = { key: string; label: string; onRemove: () => void };

const initialState: SearchFilterState = {
  searchQuery: '',
  selectedCountry: null,
  selectedCities: [],
  selectedSpecialty: null,
};

function filterReducer(state: SearchFilterState, action: SearchFilterAction): SearchFilterState {
  switch (action.type) {
    case 'set_search_query':
      return { ...state, searchQuery: action.payload };
    case 'set_selected_country':
      return { ...state, selectedCountry: action.payload };
    case 'toggle_city':
      return {
        ...state,
        selectedCities: state.selectedCities.includes(action.payload)
          ? state.selectedCities.filter(city => city !== action.payload)
          : [...state.selectedCities, action.payload],
      };
    case 'clear_cities':
      return { ...state, selectedCities: [] };
    case 'set_selected_specialty':
      return { ...state, selectedSpecialty: action.payload };
    case 'clear_filters':
      return {
        ...state,
        selectedCountry: null,
        selectedCities: [],
        selectedSpecialty: null,
      };
    default:
      return state;
  }
}

export default function Index() {
  const colors = useThemeColors();
  const router = useRouter();
  const filterSheetRef = useRef<BottomSheetModal>(null);
  const [state, dispatch] = useReducer(filterReducer, initialState);
  const { searchQuery, selectedCountry, selectedCities, selectedSpecialty } = state;

  const doctors = useQuery({
    queryKey: ['doctors'],
    queryFn: async () => {
      // kasten delay
      // reject({message: "sunucu hatası"}) şeklinde error case test edilebilir
      await new Promise((resolve, reject) => setTimeout(resolve, 3000));
      return mockData;
    },
  });

  const doctorList = useMemo(() => doctors.data ?? [], [doctors.data]);

  const countryOptions = useMemo(
    () =>
      Array.from(new Set(doctorList.map(dr => dr.address.country ?? DEFAULT_COUNTRY))).sort(
        (firstCountry, secondCountry) => firstCountry.localeCompare(secondCountry, 'tr'),
      ),
    [doctorList],
  );

  const cityOptions = useMemo(
    () =>
      Array.from(new Set(doctorList.map(dr => dr.address.city))).sort((firstCity, secondCity) =>
        firstCity.localeCompare(secondCity, 'tr'),
      ),
    [doctorList],
  );

  const specialtyOptions = useMemo(
    () =>
      Array.from(new Set(doctorList.map(dr => dr.specialty))).sort((firstSpecialty, secondSpecialty) =>
        firstSpecialty.localeCompare(secondSpecialty, 'tr'),
      ),
    [doctorList],
  );

  const activeFilters = useMemo(
    () =>
      [
        selectedCountry
          ? {
              key: `country-${selectedCountry}`,
              label: `Ülke: ${selectedCountry}`,
              onRemove: () => dispatch({ type: 'set_selected_country', payload: null }),
            }
          : null,
        ...selectedCities.map(city => ({
          key: `city-${city}`,
          label: `Şehir: ${city}`,
          onRemove: () => dispatch({ type: 'toggle_city', payload: city }),
        })),
        selectedSpecialty
          ? {
              key: `specialty-${selectedSpecialty}`,
              label: `Branş: ${selectedSpecialty}`,
              onRemove: () => dispatch({ type: 'set_selected_specialty', payload: null }),
            }
          : null,
      ].filter(Boolean) as ActiveFilterType[],
    [selectedCountry, selectedCities, selectedSpecialty],
  );

  // Fuzzy search ile de yapılabilirdi ama bu yöntem tüm kontrolün bizde olduğu ve daha imperative bir yaklaşım
  const filteredProviders = useMemo(() => {
    return doctorList.filter(doctor => {
      const normalizedSearch = searchQuery.toLowerCase();
      const matchesSearch =
        searchQuery.length === 0 ||
        doctor.name.toLowerCase().includes(normalizedSearch) ||
        doctor.specialty.toLowerCase().includes(normalizedSearch) ||
        doctor.address.city.toLowerCase().includes(normalizedSearch);

      const doctorCountry = doctor.address.country ?? DEFAULT_COUNTRY;
      const matchesCountry = !selectedCountry || doctorCountry === selectedCountry;
      const matchesCity = selectedCities.length === 0 || selectedCities.includes(doctor.address.city);
      const matchesSpecialty = !selectedSpecialty || doctor.specialty === selectedSpecialty;

      return matchesSearch && matchesCountry && matchesCity && matchesSpecialty;
    });
  }, [doctorList, searchQuery, selectedCountry, selectedCities, selectedSpecialty]);

  // helper component
  const renderOptionButton = (
    label: string,
    value: string | null,
    selectedValue: string | null,
    onSelect: (nextValue: string | null) => void,
  ) => {
    const isActive = selectedValue === value;

    return (
      <ThemedButton
        key={label}
        onPress={() => onSelect(isActive ? null : value)}
        variant={isActive ? 'primary' : 'ghost'}
        content={label}
        style={({ pressed }) => ({
          paddingHorizontal: 14,
          paddingVertical: 10,
          borderRadius: 14,
          backgroundColor: isActive ? colors.chipActiveBackground : colors.chipBackground,
          borderWidth: isActive ? 0 : 1,
          borderColor: isActive ? 'transparent' : colors.border,
          opacity: pressed ? 0.75 : 1,
          borderCurve: 'continuous',
        })}
      />
    );
  };

  // helper component
  const renderMultiSelectButton = (label: string, value: string) => {
    const isActive = selectedCities.includes(value);
    return (
      <ThemedButton
        key={value}
        content={label}
        variant={isActive ? 'primary' : 'ghost'}
        onPress={() => dispatch({ type: 'toggle_city', payload: value })}
      />
    );
  };

  if (doctors.isLoading) {
    return (
      <ThemedSafeAreaView edges={['left', 'right']} style={{ flex: 1, backgroundColor: colors.background }}>
        <FlatList
          contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={{ paddingHorizontal: 16, gap: 14, paddingBottom: 40 }}
          keyboardDismissMode="on-drag"
          data={Array.from({ length: 4 })}
          keyExtractor={(_, index) => `doctor-skeleton-${index}`}
          renderItem={() => <DoctorListCardSkeleton />}
          ListHeaderComponent={
            <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
              <View style={{ flex: 1 }}>
                <View
                  style={{
                    height: 36,
                    borderRadius: 12,
                    backgroundColor: colors.searchBackground,
                    borderCurve: 'continuous',
                  }}
                />
              </View>
              <View
                style={{
                  width: 40,
                  height: 36,
                  borderRadius: 12,
                  backgroundColor: colors.searchBackground,
                  borderCurve: 'continuous',
                }}
              />
            </View>
          }
        />
      </ThemedSafeAreaView>
    );
  }

  const header = (
    <View style={{ paddingHorizontal: 16, gap: 14, marginBottom: 14 }}>
      <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
        <View style={{ flex: 1 }}>
          <SearchBar value={searchQuery} onChangeText={text => dispatch({ type: 'set_search_query', payload: text })} />
        </View>
        <ThemedButton
          variant="ghost"
          content={<Ionicons name="options-outline" size={20} color={colors.textSecondary} />}
          onPress={() => filterSheetRef.current?.present()}
          height={40}
          width={40}
        />
      </View>
      <FilterChips items={activeFilters} />
    </View>
  );

  return (
    <ThemedSafeAreaView edges={['left', 'right']} style={{ flex: 1, backgroundColor: colors.background }}>
      <BottomSheetModal
        ref={filterSheetRef}
        snapPoints={['72%']}
        index={0}
        enablePanDownToClose
        backdropComponent={backdropProps => (
          <BottomSheetBackdrop {...backdropProps} appearsOnIndex={0} disappearsOnIndex={-1} pressBehavior="close" />
        )}
        backgroundStyle={{ backgroundColor: colors.card }}
        handleIndicatorStyle={{ backgroundColor: colors.border }}
        onDismiss={() => undefined}
      >
        <BottomSheetScrollView
          contentContainerStyle={{ paddingHorizontal: 18, paddingTop: 4, paddingBottom: 24, gap: 18 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View>
              <Text style={{ fontSize: 24, fontWeight: '700', color: colors.text }}>Filtreler</Text>
              <Text style={{ fontSize: 13, color: colors.textSecondary, marginTop: 4 }}>
                Birden fazla şehir seçebilirsiniz.
              </Text>
            </View>
            <ThemedButton
              variant="ghost"
              content={<Ionicons name="close" size={16} color={colors.textSecondary} />}
              onPress={() => filterSheetRef?.current?.dismiss()}
              height={40}
              width={40}
            />
          </View>

          <View style={{ gap: 10 }}>
            <Text style={{ fontSize: 14, fontWeight: '700', color: colors.text }}>Ülke</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
              {renderOptionButton('Tümü', null, selectedCountry, value =>
                dispatch({ type: 'set_selected_country', payload: value }),
              )}
              {countryOptions.map(country =>
                renderOptionButton(country, country, selectedCountry, value =>
                  dispatch({ type: 'set_selected_country', payload: value }),
                ),
              )}
            </View>
          </View>

          <View style={{ gap: 10 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={{ fontSize: 14, fontWeight: '700', color: colors.text }}>Şehir</Text>
              {selectedCities.length > 0 ? (
                <ThemedButton content="Temizle" variant="link" onPress={() => dispatch({ type: 'clear_cities' })} />
              ) : null}
            </View>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
              {cityOptions.map(city => renderMultiSelectButton(city, city))}
            </View>
          </View>

          <View style={{ gap: 10 }}>
            <Text style={{ fontSize: 14, fontWeight: '700', color: colors.text }}>Branş</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
              {renderOptionButton('Tümü', null, selectedSpecialty, value =>
                dispatch({ type: 'set_selected_specialty', payload: value }),
              )}
              {specialtyOptions.map(specialty =>
                renderOptionButton(specialty, specialty, selectedSpecialty, value =>
                  dispatch({ type: 'set_selected_specialty', payload: value }),
                ),
              )}
            </View>
          </View>

          <View style={{ flexDirection: 'row', gap: 10, paddingTop: 4 }}>
            <ThemedButton content="Temizle" variant="ghost" onPress={() => dispatch({ type: 'clear_filters' })} />
            <ThemedButton content="Bitti" variant="primary" onPress={() => filterSheetRef.current?.dismiss()} />
          </View>
        </BottomSheetScrollView>
      </BottomSheetModal>

      {/**
       * Bu tarz listelerde flatlist tercih ettim performanslı olması açısından çok az olduğundan emin olunan caselerde direkt
       * map ile de dönülebilir veya daha optimize diğer virtualization kütüphaneleri tercih edilebilir
       */}
      <FlatList
        data={filteredProviders}
        keyExtractor={item => item.id}
        renderItem={({ item: dr, index }: { item: (typeof doctorList)[number]; index: number }) => (
          <Animated.View style={{ paddingHorizontal: 16 }} entering={FadeInDown.delay(index * 20).springify()}>
            <DoctorListCard doctor={dr} onPress={() => router.navigate(`/doctors/${dr.id}`)} />
          </Animated.View>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        ListHeaderComponent={header}
        ListHeaderComponentStyle={{ paddingBottom: 2 }}
        contentInsetAdjustmentBehavior="automatic"
        ListEmptyComponent={
          (doctors.data && filteredProviders?.length === 0) || doctors.error ? (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 40,
                paddingHorizontal: 20,
                gap: 8,
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: '700', color: colors.text, textAlign: 'center' }}>
                Sonuç bulunamadı
              </Text>
              <Text style={{ fontSize: 14, color: colors.textSecondary, textAlign: 'center', lineHeight: 20 }}>
                {doctors.error
                  ? doctors.error.message
                  : 'Seçtiğiniz filtrelere uygun bir kayıt yok. Filtreleri değiştirip tekrar deneyin.'}
              </Text>
            </View>
          ) : null
        }
        contentContainerStyle={{ paddingHorizontal: 0, paddingBottom: 0 }}
        keyboardDismissMode="on-drag"
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        initialNumToRender={8}
        windowSize={7}
        removeClippedSubviews
      />
    </ThemedSafeAreaView>
  );
}
