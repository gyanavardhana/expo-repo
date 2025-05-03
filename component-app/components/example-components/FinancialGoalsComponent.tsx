import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");

const emergencyIcon = require("../images/emergency.png");
const phoneIcon = require("../images/phone.png");
const vacationIcon = require("../images/vacation.png");
const retirementIcon = require("../images/retirement.png");
const wealthIcon = require("../images/wealthbuilding.png");
const homeIcon = require("../images/buildinghome.png");
const shortTermBox = require("../images/shorttermbox.png");
const longTermBox = require("../images/longtermbox.png");

export const FinancialGoalsComponent = () => {
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [shortTermItems, setShortTermItems] = useState([]);
  const [longTermItems, setLongTermItems] = useState([]);
  const [hiddenGoals, setHiddenGoals] = useState([]);

  const goals = [
    { id: "emergency", title: "Emergency Fund", icon: emergencyIcon, isShortTerm: true },
    { id: "phone", title: "Buying a Phone", icon: phoneIcon, isShortTerm: true },
    { id: "vacation", title: "Vacation", icon: vacationIcon, isShortTerm: true },
    { id: "retirement", title: "Retirement", icon: retirementIcon, isShortTerm: false },
    { id: "wealth", title: "Wealth Building", icon: wealthIcon, isShortTerm: false },
    { id: "home", title: "Buying a Home", icon: homeIcon, isShortTerm: false },
  ];

  const handleGoalPress = (goalId) => {
    const goal = goals.find((g) => g.id === goalId);
    if (!goal) return;

    if (goal.isShortTerm) {
      setShortTermItems(prev => [...prev, goalId]);
    } else {
      setLongTermItems(prev => [...prev, goalId]);
    }

    setHiddenGoals(prev => [...prev, goalId]);
    setSelectedGoal(null);
  };

  const resetAll = () => {
    setShortTermItems([]);
    setLongTermItems([]);
    setHiddenGoals([]);
    setSelectedGoal(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.goalsGrid}>
        {goals.map((goal) =>
          !hiddenGoals.includes(goal.id) && (
            <View key={goal.id} style={styles.goalCardWrapper}>
              <TouchableOpacity
                style={[
                  styles.goalCard,
                  selectedGoal === goal.id && styles.selectedGoalCard,
                ]}
                onPress={() => handleGoalPress(goal.id)}
              >
                <Image source={goal.icon} style={styles.icon} />
                <Text style={styles.goalText}>{goal.title}</Text>
              </TouchableOpacity>
            </View>
          )
        )}
      </View>

      <Text style={styles.tapDropText}>Tap to categorize your financial goals</Text>

      <View style={styles.boxesContainer}>
        <View style={styles.boxWrapper}>
          <View style={styles.box}>
            <Image source={shortTermBox} style={styles.boxImage} resizeMode="contain" />
            <View style={styles.itemsContainer}>
              {shortTermItems.map((id, index) => {
                const g = goals.find((goal) => goal.id === id);
                return g && (
                  <View key={index} style={styles.boxItemIconOnly}>
                    <Image source={g.icon} style={styles.boxItemIcon} />
                  </View>
                );
              })}
            </View>
          </View>
          <Text style={styles.boxText}>Saving for{"\n"}Short term needs</Text>
        </View>

        <View style={styles.boxWrapper}>
          <View style={styles.box}>
            <Image source={longTermBox} style={styles.boxImage} resizeMode="contain" />
            <View style={styles.itemsContainer}>
              {longTermItems.map((id, index) => {
                const g = goals.find((goal) => goal.id === id);
                return g && (
                  <View key={index} style={styles.boxItemIconOnly}>
                    <Image source={g.icon} style={styles.boxItemIcon} />
                  </View>
                );
              })}
            </View>
          </View>
          <Text style={styles.boxText}>Invest for{"\n"}Long term Plans</Text>
        </View>
      </View>

      {(shortTermItems.length > 0 || longTermItems.length > 0) && (
        <TouchableOpacity style={styles.resetButton} onPress={resetAll}>
          <Text style={styles.resetText}>Reset</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: "100%",
  },
  goalsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 40,
  },
  goalCardWrapper: {
    width: (width - 60) / 2,
    marginBottom: 15,
  },
  goalCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#6a5acd",
    borderRadius: 10,
    padding: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  selectedGoalCard: {
    backgroundColor: "#4a3abd",
    elevation: 5,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  goalText: {
    color: "white",
    fontWeight: "600",
    fontSize: 15,
  },
  tapDropText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 15,
  },
  boxesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  boxWrapper: {
    alignItems: "center",
    width: "48%",
  },
  box: {
    width: 210,
    height: 210,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    position: "relative",
    borderRadius: 10,
  },
  boxImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  itemsContainer: {
    position: "absolute",
    top: 45,
    left: 50,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
  },
  boxItemIconOnly: {
    backgroundColor: "rgba(255,255,255,0.8)",
    borderRadius: 20,
    padding: 6,
    marginBottom: 4,
  },
  boxItemIcon: {
    width: 20,
    height: 20,
  },
  boxText: {
    color: "white",
    textAlign: "center",
    fontSize: 14,
    fontWeight: "500",
  },
  resetButton: {
    backgroundColor: "#ff5252",
    padding: 10,
    borderRadius: 8,
    alignSelf: "center",
    marginTop: 30,
    paddingHorizontal: 20,
  },
  resetText: {
    color: "white",
    fontWeight: "bold",
  },
});
