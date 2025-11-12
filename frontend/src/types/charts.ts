export interface ApiResponse<T = any> {
  chart: string;
  data: T;
  timestamp: number;
}
