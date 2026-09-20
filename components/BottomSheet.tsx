import { useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  Animated,
  PanResponder,
  Dimensions,
  Pressable
} from "react-native";

type BottomSheetProps = {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  snapPoint?: number;
};

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function BottomSheet({
  visible,
  onClose,
  children,
  snapPoint = 0.5
}: BottomSheetProps) {
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const snapHeight = SCREEN_HEIGHT * snapPoint;

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: visible? snapHeight : SCREEN_HEIGHT,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, g) => Math.abs(g.dy) > 5,
      onPanResponderMove: (_, gesture) => {
        if (gesture.dy > 0) {
          translateY.setValue(snapHeight + gesture.dy);
        }
      },
      onPanResponderRelease: (_, gesture) => {
        const shouldClose = gesture.dy > 120;
        Animated.timing(translateY, {
          toValue: shouldClose? SCREEN_HEIGHT : snapHeight,
          duration: 250,
          useNativeDriver: true,
        }).start(() => {
          if (shouldClose) onClose();
        });
      },
    })
  ).current;

  if (!visible) return null;

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
      <Pressable style={styles.backdrop} onPress={onClose} />
      <Animated.View
        {...panResponder.panHandlers}
        style={[styles.sheet, { transform: [{ translateY }] }]}
      >
        <View style={styles.handle} />
        {children}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)" },
  sheet: {
    position: "absolute",
    left: 0, right: 0, bottom: 0,
    height: SCREEN_HEIGHT,
    backgroundColor: "white",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20, paddingTop: 12,
  },
  handle: {
    width: 40, height: 5, backgroundColor: "#D1D5DB",
    borderRadius: 3, alignSelf: "center", marginBottom: 16
  },
});
