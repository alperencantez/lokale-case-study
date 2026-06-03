# Lokalde Mobile Engineer Case Study

## Kısa notlar

- Uygulama `expo-router` ile file-based routing kullanıyor. `app/_layout.tsx` içinde stack yapısı tanımlı, ekranlar da doğrudan `app/` altında duruyor.
- Ekran tarafında veri akışı basit tutuldu: doktor listesi `useQuery` ile okunuyor, filtre ve arama durumu tek bir `useReducer` içinde yönetiliyor.
- Listeleme için `FlatList` tercih edildi. Özellikle doktor kartları arttığında gereksiz render yükünü azaltıyor.
- Kartlar, skeletonlar ve detay ekranı aynı tema hook’unu kullanıyor. Light/dark farkı ayrı ayrı çözümlenmiş durumda.
- Detay ekranında parallax görsel ve native stack header birlikte kullanılıyor. Header şeffaf bırakıldı, böylece görselin üstünde doğal duruyor.
- Filtre paneli için `BottomSheetModal` kullanılıyor. Şehir, ülke ve branş seçimleri aynı state üzerinden yönetiliyor.

## Alternatif yaklaşımlar

- Styling bu projede inline tercih ettim elbette StyleSheet api ile de yapılması mümkün ya da Nativewind ile de.
- Flatlist yerine BigList gibi daha oturmuş sanallaştırma kütüphaneleri kullanılabilir
- useThemeColors hook'u ile stylingi yonetmektense projenin büyüyeceğini bildiğimiz bir senaryoda baz componentler için bir themed-component oluşturulabilirdi themed-buttton.tsx bu projede o yaklaşımın bir örneği.
- Production ortamında react-query ile veri kontrolü yaptım lakin fetch ile de yapılabilirdi
- Memoization veya ekstra business logic gerektiren işlem fonksiyonları da components/utils içerisinde soyutlanabilirdi kod temizliği ve yeniden kullanılabilirlik açısından.

## Ekran Kaydı

https://github.com/user-attachments/assets/3d697793-0deb-414e-94fc-32b499c0f610

