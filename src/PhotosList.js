import React, { useEffect, useMemo } from "react";
import axios from "axios"

import {
  View,
  StyleSheet,
  Image,
  Dimensions, Text, ScrollView, TouchableOpacity, FlatList, AppState,
} from "react-native";
import { useQuery } from "react-query";

const KEY = '&client_id=wi1reg9DSyIP93cgaWj3YV3ifinz51z8rXQU1fdrKcE';
const URL = 'https://api.unsplash.com/search/photos?query=uzbekistan';



const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;
const IMAGE_WIDTH = WIDTH * 0.4;
const IMAGE_HEIGHT = HEIGHT * 0.3;

 const requestApi = axios.create({
  baseURL: `${URL}${KEY}&per_page=8&page`,
  headers: {
    common: {
      Authorization: "Bearer "
    }
  }
});
export function useListQuery(query, options) {
  return useQuery(
    ["list", query],
    () =>
      requestApi
        .get("", { query })
        .then(({ data }) => data),
    options,
  );
}

const PhotosList = ({navigation}) => {

  const listQuery = useListQuery({});

  const listMemo = useMemo(()=> listQuery.data?.results  || [], [listQuery.data])



  useEffect(() => {
    const subscription = AppState.addEventListener("focus", nextAppState => {
      console.log("AppState", );
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const _renderCollectionItem = ({ item }: any) => (
    <View style={{ marginVertical: 10 }} key={item.id}>
      <ScrollView
        horizontal
        contentContainerStyle={styles.wrapper}
        style={styles.wrapper}
        key={item.id}
      >
        {listMemo.length > 0 &&
          listMemo?.map((photo) => (
            <TouchableOpacity
              key={photo.id}
              onPress={()=> navigation.navigate('Photo', {
                id: photo.id
              })}
              style={styles.margin4}
            >
              <Image source={{ uri: photo["urls"]["full"] }} style={styles.image} />
              <Text style={{ position: 'absolute', top: 10, right: 10 }}>
                {true ? '❤️' : '🤍'}
              </Text>
            </TouchableOpacity>
          ))}

      </ScrollView>
    </View>
  );
  return (
    <View>
      <FlatList
        contentContainerStyle={styles.wrapper}
        data={listMemo}
        renderItem={_renderCollectionItem}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View />}
      />
    </View>
  );
};



const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 10,
    backgroundColor: '#FFFFF8',
  },
  image: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    borderRadius: 10,
  },
  txt: {
    fontSize: 21,
    textTransform: 'capitalize',
    paddingLeft: 10,
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    fontStyle: 'normal',
    fontWeight: '300',
    paddingLeft: 10,
  },
  margin4: {
    margin: 4,
  },
  shimmering: {
    height: IMAGE_HEIGHT,
    width: IMAGE_WIDTH,
    borderRadius: 10,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  seperator: {
    backgroundColor: '#E8ECF3',
    height: 1,
    width: '96%',
    alignSelf: 'center',
  },
});
export default PhotosList;
