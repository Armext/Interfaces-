export type TabId = 'inicio' | 'campo' | 'ganado' | 'galpones' | 'ajustes';

export interface WeatherData {
  temp: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  windDirection: string;
  rainLastWeek: number;
  rainForecast: number;
  soilMoisture: number;
  evapotranspiration: number;
  locationName: string;
}

export interface Lote {
  id: string;
  name: string;
  hectares: number;
  crop: 'Soja' | 'Maíz' | 'Trigo' | 'Girasol' | 'Pastura' | 'Barbecho';
  variety: string;
  phenologyStage: string;
  sowingDate: string;
  estimatedHarvest: string;
  targetYieldQq: number;
  currentHealthScore: number;
  status: 'Optimo' | 'Atención' | 'Riesgo' | 'En Cosecha';
  lastActivity: string;
  soilType: string;
  coordinates: { x: number; y: number; width: number; height: number };
}

export interface Machinery {
  id: string;
  name: string;
  model: string;
  type: 'Tractor' | 'Cosechadora' | 'Pulverizadora' | 'Sembradora' | 'Tolva';
  year: number;
  engineHours: number;
  fuelPercent: number;
  status: 'Operativo' | 'En Campo' | 'En Mantenimiento' | 'Inactivo';
  currentOperator: string;
  nextServiceHours: number;
  lastLocation: string;
}

export interface CattleAnimal {
  id: string;
  caravana: string;
  category: 'Vaca de Cría' | 'Ternero' | 'Vaquillona' | 'Novillo' | 'Toro';
  breed: 'Angus Negro' | 'Angus Colorado' | 'Hereford' | 'Braford' | 'Holando';
  sex: 'Hembra' | 'Macho';
  weightKg: number;
  lastWeighDate: string;
  dailyWeightGainKg: number;
  reproductiveStatus: 'Preñada' | 'Vacía' | 'En Servicio' | 'Lactando' | 'Engorde';
  potrero: string;
  healthStatus: 'Al día' | 'Requiere vacuna' | 'En tratamiento';
  birthDate: string;
}

export interface BarnFacility {
  id: string;
  name: string;
  type: 'Galpón de Maquinaria' | 'Galpón de Insumos' | 'Silo Chapa' | 'Silo Bolsa' | 'Hangar de Fardos';
  capacityMax: number;
  capacityUsed: number;
  unit: string;
  temperatureC: number;
  humidityPercent: number;
  status: 'Normal' | 'Alerta Clima' | 'Capacidad Límite';
  itemsCount: number;
  location: string;
}

export interface InventoryItem {
  id: string;
  facilityId: string;
  name: string;
  category: 'Semillas' | 'Fertilizantes' | 'Fitosanitarios' | 'Alimento & Rollos' | 'Repuestos';
  quantity: number;
  unit: string;
  batch: string;
  expirationDate: string;
  reorderLevel: number;
}

export interface FarmTask {
  id: string;
  title: string;
  type: 'Campo' | 'Ganado' | 'Galpón' | 'Maquinaria';
  assignee: string;
  date: string;
  completed: boolean;
  priority: 'Alta' | 'Media' | 'Baja';
  location: string;
}

export interface FarmAlert {
  id: string;
  type: 'warning' | 'info' | 'critical' | 'success';
  title: string;
  description: string;
  tabTarget?: TabId;
  timestamp: string;
}

export type NewCattleAnimal = Omit<CattleAnimal, 'id'>;
export type NewInventoryItem = Omit<InventoryItem, 'id'>;
export type NewFarmTask = Omit<FarmTask, 'id' | 'completed'>;
