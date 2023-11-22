import { View, Text } from 'react-native'
import React, { useMemo, useState } from 'react'
import { Link, Stack } from 'expo-router'
import ExploreHeader from '@/components/ExploreHeader'
import Listings from '@/components/Listings'
import listingsData from '@/assets/data/airbnb-listings.json';
// import ListingsBottomSheet from '@/components/ListingsBottomSheet'
import listingsDataGeo from '@/assets/data/airbnb-listings.geo.json';
import ListingsMap from '@/components/ListingsMap'
import ListingsBottomSheet from '@/components/ListingsBottomSheet'


const Page = () => {
  const items = useMemo(() => listingsData as any, []);
  const getoItems = useMemo(() => listingsDataGeo, []);
  const [category, setCategory] = useState<string>('Tiny homes');

  const onDataChanged = (category: string) => {
    setCategory(category);
  };

  return (
    <View style={{ flex: 1, marginTop: 80 }}>
      {/* Define pour custom header */}
      <Stack.Screen
        options={{
          header: () => <ExploreHeader onCategoryChanged={onDataChanged} />,
        }}
      />
      {/* <Listings listings={items} category={category}/> */}
      <ListingsMap listings={getoItems} />
      <ListingsBottomSheet listings={items} category={category} />
    </View>
  )
}

export default Page