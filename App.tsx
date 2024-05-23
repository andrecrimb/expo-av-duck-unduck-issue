import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from "expo-av";
import { useEffect, useRef } from "react";

/**
 * add examples with Android and iOS
 * tell about frame drop fix
 * tell what custom ducking doesn't cause frame drops
 */
export default function App() {
  const audio = useRef<Audio.SoundObject | null>(null);

  useEffect(() => {
    Audio.setAudioModeAsync({
      interruptionModeAndroid: InterruptionModeAndroid.DuckOthers,
      interruptionModeIOS: InterruptionModeIOS.DuckOthers,
      staysActiveInBackground: true,
      playsInSilentModeIOS: true,
    });
  }, []);

  const onPlaySound = async () => {
    if (!audio.current) {
      audio.current = await Audio.Sound.createAsync(
        require("./assets/ping.mp3"),
        {
          shouldPlay: true,
        }
      );
      return;
    }

    audio.current.sound.replayAsync();
  };

  const onUnloadSound = async () => {
    if (audio.current) {
      await audio.current.sound.unloadAsync();
      audio.current = null;
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Play Sound" onPress={onPlaySound} />
      <View style={{ height: 50 }} />
      <Button title="Unload Sound" onPress={onUnloadSound} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
