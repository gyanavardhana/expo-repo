import { useState } from 'react';
import { View, Button } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ReceiptTower from '@/components/example-components/ReceiptTower';
import { FinanceTracker } from '@/components/example-components/FinancialTracker';
import { FinancialGoalsComponent } from '@/components/example-components/FinancialGoalsComponent';

export default function RootLayout() {
  const [componentIndex, setComponentIndex] = useState(0);

  const components = [
    <FinanceTracker />,
    <ReceiptTower selectedYearIndex={0} />,
    <FinancialGoalsComponent />,
    
  ];

  const handleNext = () => {
    setComponentIndex((prevIndex) => (prevIndex + 1) % components.length);
  };

  return (
    <LinearGradient
      colors={['#6E38BF', '#9239AE', '#863FAF']}
      locations={[0.1743, 0.4617, 0.8885]}
      style={{ flex: 1 }}
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button title="Next" onPress={handleNext} />
        {components[componentIndex]}
      </View>
    </LinearGradient>
  );
}
