import React, { useState, useEffect, useLayoutEffect, useMemo } from "react";
import {
  View,
  StyleSheet,
  Image,
  Dimensions, Text, TextInput, TouchableOpacity,
} from "react-native";
import { useSingQuery } from "./queries/useSingleQuery";
import UploadComponent from "./Upload";

export function Photo({ route }) {

  const buttonEl = React.useRef(null);

  const { id } = route.params;
  const singQuery = useSingQuery({}, { id });







  return (
    <View>
      {
        singQuery.data ? (
          <TouchableOpacity  ref={buttonEl}>
            <Image source={{ uri: singQuery.data["urls"]["full"] }} style={styles.image} />
          </TouchableOpacity>
        ) : null
      }

      <TextInput         style={styles.input}/>
      <UploadComponent/>
    </View>
  );
}

const IMAGE_HEIGHT = Dimensions.get("screen").height * 0.8;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  loader: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  image: {
    width: "98%",
    borderRadius: 5,
    height: IMAGE_HEIGHT - 150,
    alignSelf: "center",
  },
  fav: {
    position: "absolute",
    top: 10,
    right: 8,
    width: 50,
    height: 50,
  },
});
