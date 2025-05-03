import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ImageBackground,
} from "react-native";
import Slider from "@react-native-community/slider";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");
const cartimage = require("../images/cart.png");
const sliderpick = require("../images/slider.png");

// Sample grocery data with current prices and projected future prices
const groceryData = [
  {
    item: "Eggs", quantity: "10ps", currentPrice: 50, priceProjection: {
      2025: 50, 2030: 60, 2035: 80, 2040: 95, 2045: 110, 2050: 130
    }
  },
  {
    item: "Bread", quantity: "2lb", currentPrice: 180, priceProjection: {
      2025: 180, 2030: 190, 2035: 200, 2040: 220, 2045: 240, 2050: 260
    }
  },
  {
    item: "Milk", quantity: "2L", currentPrice: 160, priceProjection: {
      2025: 160, 2030: 180, 2035: 220, 2040: 250, 2045: 280, 2050: 310
    }
  },
  {
    item: "Daal", quantity: "1Kg", currentPrice: 200, priceProjection: {
      2025: 200, 2030: 250, 2035: 400, 2040: 500, 2045: 580, 2050: 650
    }
  },
];

const yearData = [2025, 2030, 2035, 2040, 2045, 2050];

const ReceiptTower = () => {
  const [selectedYearIndex, setSelectedYearIndex] = useState(0);
  const selectedYear = yearData[selectedYearIndex];

  // Calculate totals
  const currentTotal = groceryData.reduce((sum, item) => sum + item.currentPrice, 0);
  const projectedTotal = groceryData.reduce(
    (sum, item) => sum + item.priceProjection[selectedYear],
    0
  );

  // Animated styles for the receipt tower
  const receiptStyle = useAnimatedStyle(() => ({
    transform: [{ scale: withTiming(1, { duration: 300 }) }],
    opacity: withTiming(1, { duration: 300 }),
  }));

  // Handle slider change
  const onSliderChange = (value) => {
    const index = Math.floor(value);
    setSelectedYearIndex(index);
  };

  // Calculate the thumb position for the custom thumb image
  const calculateThumbPosition = () => {
    // Track width is the slider width minus the thumb width
    const trackWidth = width - 60 - 40; // slider width minus padding minus thumb width
    const segmentWidth = trackWidth / 5; // 5 segments for 6 positions (0-5)
    return selectedYearIndex * segmentWidth;
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.receiptWrapper, receiptStyle]}>
        <ImageBackground
          source={require("../images/tornpaper.png")}
          style={styles.receiptContainer}
          imageStyle={styles.backgroundImage}
        >
          <View style={styles.innerContainer}>
            {/* Receipt header */}
            <View style={styles.receiptHeader}>
              <Text style={styles.receiptTitle}>Receipt</Text>
              <View style={styles.cartIconContainer}>
                <Image source={cartimage} style={styles.cartIcon} resizeMode="contain" />
              </View>
            </View>

            {/* Receipt header columns */}
            <View style={styles.columnHeaders}>
              <Text style={styles.columnHeader}>Qty</Text>
              <Text style={styles.columnHeader}>Item</Text>
              <Text style={styles.columnHeader}>Today</Text>
              <Text style={styles.columnHeaderRight}>{selectedYear}</Text>
            </View>

            {/* Receipt items */}
            {groceryData.map((item, index) => (
              <View key={index} style={styles.rowContainer}>
                <View style={styles.mainItemContainer}>
                  <Text style={styles.itemQuantity}>{item.quantity}</Text>
                  <Text style={styles.itemName}>{item.item}</Text>
                  <Text style={styles.itemPrice}>₹{item.currentPrice}</Text>
                </View>
                <View style={styles.futureItemContainer}>
                  <Text style={styles.itemFuturePrice}>₹{item.priceProjection[selectedYear]}</Text>
                </View>
              </View>
            ))}

            {/* Total line */}
            <View style={styles.totalRowContainer}>
              <View style={styles.totalMainContainer}>
                <Text style={styles.totalText}>Total Bill: ₹{currentTotal}</Text>
              </View>
              <View style={styles.totalFutureContainer}>
                <Text style={styles.totalFuturePrice}>₹{projectedTotal}</Text>
              </View>
            </View>
          </View>
        </ImageBackground>
      </Animated.View>

      {/* Year Slider */}
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
              value={selectedYearIndex}
              onValueChange={onSliderChange}
              minimumTrackTintColor="#59f"
              maximumTrackTintColor="#EAEAEA"
            />

            {/* Visual track elements */}
            <View style={styles.customTrack}>
              <View style={[styles.filledTrack, { width: `${(selectedYearIndex / 5) * 100}%` }]} />
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
              <View
                key={i}
                style={styles.indicatorTouchable}
              >
                <View
                  style={[
                    styles.yearIndicator,
                    selectedYearIndex === i && styles.yearIndicatorActive
                  ]}
                />
              </View>
            ))}
          </View>
        </View>

        <View style={styles.yearLabels}>
          {yearData.map((year, i) => (
            <Text
              key={i}
              style={[
                styles.yearText,
                selectedYearIndex === i && styles.yearTextSelected
              ]}
            >
              {year}
            </Text>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "100%",
    marginTop: 80
  },
  receiptWrapper: {
    width: width - 60,
    marginBottom: 20,
  },
  receiptContainer: {
    width: '100%',
    aspectRatio: 0.8, // Adjust based on your torn paper image aspect ratio
    justifyContent: 'center',
  },
  backgroundImage: {
    resizeMode: 'stretch',
    borderRadius: 12,
  },
  innerContainer: {
    padding: 16,
  },
  receiptHeader: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    position: "relative",
    borderBottomColor: "#e0e0e0",
    borderBottomWidth: 1,
    borderTopColor: "#e0e0e0",
    borderTopWidth: 1,
  },
  verticalLine: {
    width: "100%", // Full width line
    height: 1,
    backgroundColor: "#777",
    marginVertical: 5,
  },
  receiptTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 5,
  },
  cartIconContainer: {
    position: "absolute",
    right: 0,
    top: "50%",
    transform: [{ translateY: -20 }],
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  cartIcon: {
    width: 150,
    height: 150,
    right: 20,
    bottom: 5
  },
  columnHeaders: {
    flexDirection: "row",
    paddingBottom: 8,
  },
  columnHeader: {
    flex: 1,
    fontWeight: "bold",
    color: "#666",
    fontSize: 14,
    textAlign: "center",
  },
  columnHeaderRight: {
    width: 80,
    fontWeight: "bold",
    color: "#666",
    fontSize: 14,
    textAlign: "center",
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 4,
  },
  mainItemContainer: {
    flexDirection: "row",
    flex: 1,
    backgroundColor: "#A662BF",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginRight: 8,
  },
  futureItemContainer: {
    backgroundColor: "#710798",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
    width: 80,
    alignItems: "center",

  },
  itemQuantity: {
    flex: 1,
    color: "white",
    fontWeight: "500",
    marginLeft: 10
  },
  itemName: {
    flex: 1,
    color: "white",
    fontWeight: "500",
    marginLeft: 40
  },
  itemPrice: {
    flex: 1,
    color: "white",
    fontWeight: "500",
    marginLeft: 30
  },
  itemFuturePrice: {
    color: "white",
    fontWeight: "500",
    textAlign: "center",
  },
  totalRowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
    paddingBottom: 8,

    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  totalMainContainer: {
    flex: 1,
    backgroundColor: "#A662BF",
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginRight: 8,


  },
  totalFutureContainer: {
    backgroundColor: "#710798",
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 16,
    width: 80,
    alignItems: "center",

  },
  totalText: {
    fontWeight: "bold",
    color: "white",
    left: 100

  },
  totalFuturePrice: {
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  sliderWrapper: {
    width: "100%",
    alignItems: "center",
    position: "relative",
    marginTop: 20,
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
    padding: 8,
    marginTop: -8,
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
    color: "#000",
  },
});

export default ReceiptTower;