import axios from 'axios';
import { HoursDTO, StandardHours, SpecialHours, SHResponse } from '../types';


const API_URL = 'https://shapiproject-production.up.railway.app/api/hours/';

//const API_URL = 'http://localhost:8080/api/hours/';

//  for today
export const getTodayHours = async (): Promise<SHResponse<HoursDTO>> => {
  const response = await axios.get<SHResponse<HoursDTO>>(`${API_URL}today`);
  return response.data;
};

//  for a specific date
export const getHoursForDate = async (date: string): Promise<SHResponse<HoursDTO>> => {
  const response = await axios.get<SHResponse<HoursDTO>>(`${API_URL}date?date=${date}`);
  return response.data;
};

// standard/regular hours
export const getStandardHours = async (): Promise<SHResponse<StandardHours[]>> => {
  const response = await axios.get<SHResponse<StandardHours[]>>(`${API_URL}standard`);
  return response.data;
};

// Adding special hours
export const addSpecialHours = async (specialHours: SpecialHours): Promise<SHResponse<SpecialHours>> => {
  const response = await axios.post<SHResponse<SpecialHours>>(`${API_URL}special`, specialHours);
  return response.data;
};

// Updating special hours/date by ID
export const updateSpecialHours = async (id: number, specialHours: SpecialHours): Promise<SHResponse<SpecialHours>> => {
  const response = await axios.put<SHResponse<SpecialHours>>(`${API_URL}special/${id}`, specialHours);
  return response.data;
};

// Delete special hours or Date by ID
export const deleteSpecialHours = async (id: number): Promise<SHResponse<string>> => {
  const response = await axios.delete<SHResponse<string>>(`${API_URL}special/${id}`);
  return response.data;
};

// upcoming special hours
export const getUpcomingSpecialHours = async (): Promise<SpecialHours[]> => {
  const response = await axios.get<SpecialHours[]>(`${API_URL}special/upcoming`);
  return response.data;
};

// standard hours--- not required for  noww
export const setStandardHours = async (hours: StandardHours[]): Promise<SHResponse<StandardHours[]>> => {
  const response = await axios.post<SHResponse<StandardHours[]>>(`${API_URL}standard`, hours);
  return response.data;
};
