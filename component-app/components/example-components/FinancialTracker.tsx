import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import Slider from "@react-native-community/slider";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

const container = require("../images/container.png");
const iphen = require("../images/iphen.png");
const sliderpick = require("../images/slider.png");

const { width } = Dimensions.get("window");

const yearData = [
  { year: 2025, savings: 45, investments: 2 },
  { year: 2030, savings: 60, investments: 3.5 },
  { year: 2035, savings: 75, investments: 5 },
  { year: 2040, savings: 90, investments: 6.5 },
  { year: 2045, savings: 105, investments: 8 },
  { year: 2050, savings: 120, investments: 10 },
];

export const FinanceTracker = () => {
  const [index, setIndex] = useState(0);
  const savingsLevel = useSharedValue(20);
  const investLevel = useSharedValue(20);

  const onSliderChange = (val) => {
    const i = Math.floor(val);
    setIndex(i);
    savingsLevel.value = withTiming((yearData[i].savings / 120) * 100, { duration: 500 });
    investLevel.value = withTiming((yearData[i].investments / 10) * 100, { duration: 500 });
  };

  const savingsStyle = useAnimatedStyle(() => ({
    height: `${Math.max(1, Math.min(95, savingsLevel.value))}%`,
    zIndex: 1,
  }));

  const investStyle = useAnimatedStyle(() => ({
    height: `${Math.max(1, Math.min(95, investLevel.value))}%`,
    zIndex: 1,
  }));

  // Render tick marks for beakers
  const renderTickMarks = () => {
    return [...Array(8)].map((_, i) => (
      <Image
        key={i}
        source={iphen}
        style={[styles.tick, { top: `${(i * 100) / 8}%` }]}
        resizeMode="contain"
      />
    ));
  };

  // Calculate the thumb position for the custom thumb image
  const calculateThumbPosition = () => {
    // Track width is the slider width minus the thumb width
    const trackWidth = width - 60 - 40; // slider width minus padding minus thumb width
    const segmentWidth = trackWidth / 5; // 5 segments for 6 positions (0-5)
    return index * segmentWidth;
  };

  return (
    <View style={styles.container}>
      <View style={styles.beakers}>
        {/* Savings */}
        <View style={[styles.beakerCard, { backgroundColor: "#444" }]}>
          <Text style={styles.amountText}>{yearData[index].savings} Lakhs</Text>
          <ImageBackground source={container} style={styles.beaker} resizeMode="stretch">
            {renderTickMarks()}
            <Animated.View style={[styles.liquidGreen, savingsStyle]} />
          </ImageBackground>
          <Text style={styles.label}>Savings</Text>
        </View>

        {/* Investments */}
        <View style={[styles.beakerCard, { backgroundColor: "#000" }]}>
          <Text style={styles.amountText}>{yearData[index].investments} Crores</Text>
          <ImageBackground source={container} style={styles.beaker} resizeMode="stretch">
            {renderTickMarks()}
            <Animated.View style={[styles.liquidOrange, investStyle]} />
          </ImageBackground>
          <Text style={styles.label}>Investments</Text>
        </View>
      </View>

      {/* Custom Slider */}
      <View style={styles.sliderWrapper}>
        <View style={styles.sliderPill}>
          {/* Custom slider implementation */}
          <View style={styles.sliderContainer}>
            {/* The actual slider (hidden but functional) */}
            <Slider
              style={[styles.slider, { opacity: 0 }]} // Make original slider invisible but functional
              minimumValue={0}
              maximumValue={5}
              step={1}
              value={index}
              onValueChange={onSliderChange}
              minimumTrackTintColor="#59f"
              maximumTrackTintColor="#EAEAEA"
            />
            
            {/* Visual track elements */}
            <View style={styles.customTrack}>
              <View style={[styles.filledTrack, { width: `${(index / 5) * 100}%` }]} />
            </View>
            
            {/* Custom thumb image */}
            <View 
              style={[
                styles.customThumb, 
                { left: calculateThumbPosition() }
              ]}
            >
              <Image source={sliderpick} style={styles.thumbImage} />
            </View>
          </View>
          
          {/* Year indicators below slider */}
          <View style={styles.yearIndicators}>
            {yearData.map((_, i) => (
              <TouchableOpacity 
                key={i} 
                style={styles.indicatorTouchable}
                onPress={() => onSliderChange(i)}
              >
                <View 
                  style={[
                    styles.yearIndicator,
                    index === i && styles.yearIndicatorActive
                  ]}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        <View style={styles.yearLabels}>
          {yearData.map((item, i) => (
            <Text 
              key={i} 
              style={[
                styles.yearText, 
                index === i && styles.yearTextSelected
              ]}
            >
              {item.year}
            </Text>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
    marginTop: 80,
  },
  beakers: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 30,
  },
  beakerCard: {
    alignItems: "center",
    padding: 10,
    borderRadius: 16,
    width: 140,
  },
  beaker: {
    width: 80,
    height: 150,
    borderRadius: 10,
    overflow: "hidden",
    justifyContent: "flex-end",
    position: "relative",
  },
  tick: {
    position: "absolute",
    width: "20%",
    height: 10,
    right: 10,
    opacity: 0.9,
    zIndex: 2,
  },
  liquidGreen: {
    width: 65,
    backgroundColor: "#26E511",
    position: "absolute",
    bottom: 2,
    left: "60%",
    transform: [{ translateX: -40 }],
    borderRadius: 10,
  },
  liquidOrange: {
    width: 65,
    backgroundColor: "#FFB600",
    position: "absolute",
    bottom: 2,
    left: "60%",
    transform: [{ translateX: -40 }],
    borderRadius: 10,
  },
  amountText: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
  label: {
    color: "white",
    fontSize: 14,
    marginTop: 4,
  },
  sliderWrapper: {
    width: "100%",
    alignItems: "center",
    position: "relative",
    marginTop: 30,
  },
  sliderPill: {
    backgroundColor: "#EAEAEA",
    borderRadius: 20,
    width: width - 60,
    height: 40,
    justifyContent: "center",
    position: "relative",
    paddingHorizontal: 8,
  },
  sliderContainer: {
    width: "100%",
    height: 40,
    justifyContent: "center",
    position: "relative",
  },
  slider: {
    width: "100%",
    height: 40,
    zIndex: 3,
  },
  customTrack: {
    position: "absolute",
    height: 4,
    width: "100%",
    backgroundColor: "#EAEAEA",
    borderRadius: 2,
    alignSelf: "center",
  },
  filledTrack: {
    height: "100%",
    backgroundColor: "#59f",
    borderRadius: 2,
  },
  customThumb: {
    position: "absolute",
    zIndex: 2,
    top: -2,
    marginLeft: -15, // Half the width of thumb for centering
  },
  thumbImage: {
    bottom: 2,
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  yearIndicators: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "95%",
    position: "absolute",
    bottom: 8,
    alignSelf: "center",
  },
  indicatorTouchable: {
    padding: 8, // Larger touch target
    marginTop: -8, // Adjust position
  },
  yearIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#AAAAAA",
  },
  yearIndicatorActive: {
    backgroundColor: "#59f",
  },
  yearLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginTop: 10,
  },
  yearText: {
    fontSize: 14,
    color: "#AAAAAA",
  },
  yearTextSelected: {
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});