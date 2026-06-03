# Lokalde Mobile Engineer Case Study
 
Lokalde için hazırlanmış bir case study olarak geliştirilen bu React Native / Expo uygulaması; doktor listeleme, filtreleme, arama ve detay görünümü özelliklerini barındırmaktadır.
 
## Genel Bakış
 
Bu proje, kullanıcıların doktorları şehir, ülke ve branşa göre listeleyip filtreleyebildiği bir mobil uygulamadır. Temiz state yönetimi, performanslı liste render'ı ve tam light/dark mod desteğiyle cilalanmış bir kullanıcı arayüzü ön planda tutulmuştur.
 
## Özellikler
 
- **Doktor listeleme** — TanStack React Query (`useQuery`) ile veri çekme ve yönetimi
- **Arama & filtreleme** — tek bir `useReducer` üzerinden yönetilen birleşik state; şehir, ülke ve branş seçenekleri için `@gorhom/bottom-sheet` tabanlı filtre paneli
- **Doktor detay ekranı** — şeffaf native stack header ile birlikte çalışan parallax görsel başlık
- **Skeleton yükleme durumları** — skeletonlar, kartlar ve detay ekranı arasında tutarlı tema kullanımı
- **Light / dark mod** — paylaşılan `useThemeColors` hook'u ile her ekranda tam çözüm
- **Optimize liste render'ı** — doktor listesi büyüdükçe gereksiz render'ları önlemek için `FlatList` tercihi
- **Haptic geri bildirim** — `expo-haptics` ile
## Teknoloji Yığını
 
| Katman | Teknoloji |
|---|---|
| Framework | [Expo](https://expo.dev) v54 (Yeni Mimari aktif) |
| Dil | TypeScript 5.9 |
| Navigasyon | `expo-router` (dosya tabanlı routing) + React Navigation Stack |
| Veri çekme | TanStack React Query v5 |
| State yönetimi | `useReducer` (yerel UI state), Zustand v5 (global) |
| Bottom sheet | `@gorhom/bottom-sheet` v5 |
| Animasyonlar | `react-native-reanimated` v4 + `react-native-worklets` |
| Gesture yönetimi | `react-native-gesture-handler` |
| Görseller | `expo-image` |
| İkonlar | `@expo/vector-icons` |
| Linting / Formatlama | ESLint (expo config) + Prettier |
 
## Proje Yapısı
 
```
lokale-case-study/
├── app/                    # expo-router ekranları (dosya tabanlı routing)
│   └── _layout.tsx         # Kök stack navigator tanımı
├── src/                    # Paylaşılan kaynak kod
│   └── components/         # Yeniden kullanılabilir UI bileşenleri
│       └── utils/          # Yardımcı fonksiyonlar
├── assets/
│   └── images/             # Uygulama ikonları, splash ekranı, favicon
├── scripts/                # Proje bakım scriptleri
├── .agents/skills/         # AI agent skill tanımlamaları
├── app.json                # Expo konfigürasyonu
├── package.json
└── tsconfig.json
```
 
## Mimari Notlar
 
**Routing** — Dosya tabanlı routing ile `expo-router`. Stack yapısı `app/_layout.tsx` içinde tanımlı; ekranlar doğrudan `app/` altında yer alıyor.
 
**Veri akışı** — Doktor listesi `useQuery` ile çekiliyor. Filtre ve arama durumu tek bir `useReducer` içinde yönetiliyor; bu sayede ekran mantığı tutarlı ve öngörülebilir kalıyor.
 
**Tema** — Ekranlar, kartlar ve skeletonların hepsi aynı `useThemeColors` hook'unu kullanarak light/dark farkını tutarlı biçimde çözüyor. `themed-button.tsx` bileşeni ise büyük projelerde daha iyi ölçeklenen alternatif themed-component yaklaşımının bir örneği.
 
**Detay ekranı** — Parallax görsel ile şeffaf native stack header birlikte kullanılıyor; böylece hero görsel navigasyon barının arkasına doğal biçimde uzanıyor.
 
**Filtre paneli** — `BottomSheetModal` ile şehir, ülke ve branş seçimleri ortak bir state üzerinden yönetiliyor.
 
## Başlarken
 
### Gereksinimler
 
- Node.js (tam sürüm için `.nvmrc` dosyasına bakın)
- Expo CLI (`npm install -g expo`)
- iOS Simulator ya da Android Emulator (veya Expo Go uygulaması kurulu fiziksel bir cihaz)
 
## Tasarım Kararları & Ödünleşimler
 
**Stillendirme** — Bu projede inline stiller tercih edildi. Alternatifler: daha performanslı `StyleSheet` API ya da utility-class tabanlı NativeWind. Her ikisi de doğrudan kullanılabilir.
 
**Liste render'ı** — `FlatList` mevcut gereksinimler için yeterli. Çok büyük veri setleri için `BigList` gibi daha olgun bir sanallaştırma kütüphanesi tercih edilebilir.
 
**Tema** — `useThemeColors` hook'u bu proje için yalın ve işlevsel. Büyüyecek bir kod tabanında, `themed-button.tsx`'te görülen themed bileşen kütüphanesi yaklaşımı stil mantığını ekranlardan soyutlaması açısından daha temiz bir çözüm sunar.
 
**Veri çekme** — React Query, önbelleğe alma ve geliştirici araçları için tercih edildi. Bu ölçekte `useEffect` içinde düz `fetch` de yeterli olurdu.
 
**Memoization / iş mantığı** — Bu case study'de mantık, kullanan bileşenlerin yakınında tutuluyor. Üretim ortamında karmaşık ya da tekrar kullanılabilir dönüşümlerin test edilebilirlik ve yeniden kullanılabilirlik açısından `components/utils` içine taşınması önerilir.
 
## Konfigürasyon
 
Uygulama hem iOS hem Android'de dikey yönlendirmeyi hedefliyor. Light/dark mod sistem tercihini izliyor (`userInterfaceStyle: "automatic"`). Yeni React Native mimarisi ve deneysel React Compiler `app.json` üzerinden aktif edilmiş durumda.
 
```json
"experiments": {
  "typedRoutes": true,
  "reactCompiler": true
}
```

## Ekran Kaydı

https://github.com/user-attachments/assets/3d697793-0deb-414e-94fc-32b499c0f610

