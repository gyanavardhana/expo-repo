import { View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ReceiptTower from '@/components/example-components/ReceiptTower';
import { FinanceTracker } from '@/components/example-components/FinancialTracker';
import { FinancialGoalsComponent } from '@/components/example-components/FinancialGoalsComponent';
export default function RootLayout() {
  return (
    <LinearGradient
      colors={['#6E38BF', '#9239AE', '#863FAF']}
      locations={[0.1743, 0.4617, 0.8885]}
      style={{ flex: 1 }}
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
       { /* <ReceiptTower selectedYearIndex={0} /> */}
       { /*   <FinanceTracker /> */}
       <FinancialGoalsComponent />
      </View>
    </LinearGradient>
  );
}
