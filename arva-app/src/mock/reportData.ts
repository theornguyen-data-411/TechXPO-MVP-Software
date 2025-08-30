import { ChartData } from '../types';

// Hàm chuyển đổi từ Wh sang mAh (giả định điện áp 5V)
const whToMah = (wh: number): number => Math.round(wh * 1000 / 5);
// Hàm chuyển đổi từ W sang mA (giả định điện áp 5V)
const wToMa = (w: number): number => Math.round(w * 1000 / 5);

export const reportData: ChartData = {
  monthlyReport: {
    averagePower: [
      { label: "T1", value: wToMa(5.2) },
      { label: "T2", value: wToMa(5.2) },
      { label: "T3", value: wToMa(5.3) },
      { label: "T4", value: wToMa(5.0) },
      { label: "T5", value: wToMa(5.2) },
      { label: "T6", value: wToMa(5.1) }
    ],
    totalEnergy: [
      { label: "T1", value: whToMah(1200000) },
      { label: "T2", value: whToMah(1320000) },
      { label: "T3", value: whToMah(1260000) },
      { label: "T4", value: whToMah(1500000) },
      { label: "T5", value: whToMah(1440000) },
      { label: "T6", value: whToMah(1560000) }
    ]
  },
  dailyEnergy: [
    { date: "2025-08-01", energy: whToMah(8200) },
    { date: "2025-08-02", energy: whToMah(10100) },
    { date: "2025-08-03", energy: whToMah(6500) },
    { date: "2025-08-04", energy: whToMah(9300) },
    { date: "2025-08-05", energy: whToMah(12000) },
    { date: "2025-08-06", energy: whToMah(7800) },
    { date: "2025-08-07", energy: whToMah(11200) }
  ],
  powerTime: [
    { time: 0, power: wToMa(6.8) },
    { time: 5, power: wToMa(6.5) },
    { time: 10, power: wToMa(6.0) },
    { time: 15, power: wToMa(5.5) },
    { time: 20, power: wToMa(4.5) },
    { time: 25, power: wToMa(4.0) },
    { time: 30, power: wToMa(3.5) },
    { time: 35, power: wToMa(3.2) },
    { time: 40, power: wToMa(3.0) },
    { time: 45, power: wToMa(2.8) },
    { time: 50, power: wToMa(2.8) },
    { time: 55, power: wToMa(2.8) },
    { time: 60, power: wToMa(2.8) }
  ]
};

export interface ReportSummary {
  totalEnergy: number;
  avgPower: number;
  totalSessions: number;
  efficiency: number;
  cost: number;
  savings: number;
  peakUsage: number;
  offPeakUsage: number;
}

export const reportSummary: ReportSummary = {
  totalEnergy: whToMah(1580000),
  avgPower: wToMa(5.2),
  totalSessions: 45,
  efficiency: 92.5,
  cost: 1250000,
  savings: 180000,
  peakUsage: whToMah(850000),
  offPeakUsage: whToMah(730000)
};

export interface WeeklyData {
  week: string;
  energy: number;
  sessions: number;
  avgDuration: number;
  efficiency: number;
}

export const weeklyData: WeeklyData[] = [
  { week: "Tuần 1", energy: whToMah(380000), sessions: 12, avgDuration: 45, efficiency: 91.2 },
  { week: "Tuần 2", energy: whToMah(420000), sessions: 14, avgDuration: 48, efficiency: 93.1 },
  { week: "Tuần 3", energy: whToMah(395000), sessions: 13, avgDuration: 46, efficiency: 92.8 },
  { week: "Tuần 4", energy: whToMah(385000), sessions: 11, avgDuration: 44, efficiency: 91.9 }
];

export interface DeviceData {
  device: string;
  energy: number;
  sessions: number;
  avgPower: number;
  efficiency: number;
}

export const deviceData: DeviceData[] = [
  { device: "Power Bank 20K", energy: whToMah(20000), sessions: 25, avgPower: wToMa(6.2), efficiency: 94.5 },
  { device: "Power Bank 10K", energy: whToMah(10000), sessions: 15, avgPower: wToMa(5.8), efficiency: 92.1 },
  { device: "Power Bank 5K", energy: whToMah(5000), sessions: 5, avgPower: wToMa(7.1), efficiency: 96.2 }
];

export interface CostAnalysis {
  month: string;
  totalCost: number;
  savings: number;
  peakCost: number;
  offPeakCost: number;
}

export const costAnalysis: CostAnalysis[] = [
  { month: "T1", totalCost: 1200000, savings: 150000, peakCost: 680000, offPeakCost: 520000 },
  { month: "T2", totalCost: 1320000, savings: 180000, peakCost: 720000, offPeakCost: 600000 },
  { month: "T3", totalCost: 1260000, savings: 160000, peakCost: 690000, offPeakCost: 570000 },
  { month: "T4", totalCost: 1500000, savings: 200000, peakCost: 800000, offPeakCost: 700000 },
  { month: "T5", totalCost: 1440000, savings: 190000, peakCost: 770000, offPeakCost: 670000 },
  { month: "T6", totalCost: 1560000, savings: 210000, peakCost: 830000, offPeakCost: 730000 }
];

export interface ChargingSession {
  date: string;
  sessions: number;
  totalEnergy: number;
  avgPower: number;
  avgDuration: number;
  efficiency: number;
}

export const chargingSessions: ChargingSession[] = [
  { date: "2025-08-01", sessions: 3, totalEnergy: whToMah(8200), avgPower: wToMa(6.1), avgDuration: 45, efficiency: 92.5 },
  { date: "2025-08-02", sessions: 4, totalEnergy: whToMah(10100), avgPower: wToMa(6.3), avgDuration: 48, efficiency: 93.1 },
  { date: "2025-08-03", sessions: 3, totalEnergy: whToMah(6500), avgPower: wToMa(5.8), avgDuration: 42, efficiency: 91.8 },
  { date: "2025-08-04", sessions: 3, totalEnergy: whToMah(9300), avgPower: wToMa(6.0), avgDuration: 46, efficiency: 92.9 },
  { date: "2025-08-05", sessions: 5, totalEnergy: whToMah(12000), avgPower: wToMa(6.5), avgDuration: 50, efficiency: 94.2 },
  { date: "2025-08-06", sessions: 3, totalEnergy: whToMah(7800), avgPower: wToMa(5.9), avgDuration: 44, efficiency: 91.5 },
  { date: "2025-08-07", sessions: 4, totalEnergy: whToMah(11200), avgPower: wToMa(6.2), avgDuration: 47, efficiency: 93.4 },
  { date: "2025-08-08", sessions: 3, totalEnergy: whToMah(9800), avgPower: wToMa(6.1), avgDuration: 45, efficiency: 92.7 },
  { date: "2025-08-09", sessions: 4, totalEnergy: whToMah(10500), avgPower: wToMa(6.4), avgDuration: 49, efficiency: 93.8 },
  { date: "2025-08-10", sessions: 3, totalEnergy: whToMah(7200), avgPower: wToMa(5.7), avgDuration: 41, efficiency: 91.2 },
  { date: "2025-08-11", sessions: 3, totalEnergy: whToMah(8900), avgPower: wToMa(6.0), avgDuration: 46, efficiency: 92.3 }
];

// Dữ liệu theo tuần
export const weeklyChargingData = [
  { week: "Tuần 1", sessions: 12, totalEnergy: whToMah(38200), avgPower: wToMa(6.1), avgDuration: 45, efficiency: 92.5 },
  { week: "Tuần 2", sessions: 14, totalEnergy: whToMah(42100), avgPower: wToMa(6.3), avgDuration: 48, efficiency: 93.1 },
  { week: "Tuần 3", sessions: 13, totalEnergy: whToMah(39500), avgPower: wToMa(6.0), avgDuration: 46, efficiency: 92.8 },
  { week: "Tuần 4", sessions: 11, totalEnergy: whToMah(38500), avgPower: wToMa(5.9), avgDuration: 44, efficiency: 91.9 }
];

// Dữ liệu theo tháng
export const monthlyChargingData = [
  { month: "T1", sessions: 45, totalEnergy: whToMah(158200), avgPower: wToMa(6.1), avgDuration: 45, efficiency: 92.5 },
  { month: "T2", sessions: 52, totalEnergy: whToMah(172100), avgPower: wToMa(6.3), avgDuration: 48, efficiency: 93.1 },
  { month: "T3", sessions: 48, totalEnergy: whToMah(165500), avgPower: wToMa(6.0), avgDuration: 46, efficiency: 92.8 },
  { month: "T4", sessions: 55, totalEnergy: whToMah(182500), avgPower: wToMa(6.2), avgDuration: 47, efficiency: 93.4 },
  { month: "T5", sessions: 51, totalEnergy: whToMah(175800), avgPower: wToMa(6.1), avgDuration: 46, efficiency: 92.9 },
  { month: "T6", sessions: 58, totalEnergy: whToMah(190200), avgPower: wToMa(6.4), avgDuration: 49, efficiency: 93.8 }
];
