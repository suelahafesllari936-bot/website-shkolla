
export interface SensorData {
  humidity: number;
  filterTemp: number;
  efficiency: number;
}

export interface ActivityLogEntry {
  id: string;
  message: string;
  timestamp: string;
  type: 'info' | 'warning' | 'critical' | 'success';
}

export enum DeviceStatus {
  ONLINE = 'Online',
  OFFLINE = 'Offline',
  MAINTENANCE = 'Në Mirëmbajtje'
}
