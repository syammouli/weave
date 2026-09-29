import axios, { type InternalAxiosRequestConfig } from 'axios'
import { useAuthStore } from '@/store/auth'

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8003/api/v1'
const CANVAS_URL = import.meta.env.VITE_CANVAS_BASE_URL || 'http://localhost:8069/api'

// TODO: remove this once the real API is ready
const WEAVE_MOCK_URL = import.meta.env.VITE_API_MOCK || 'https://weave-agent-dev.rtdomain.in/api'


export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

export const canvasClient = axios.create({
  baseURL: CANVAS_URL,
  headers: { 'Content-Type': 'application/json' },
})

export const weaveMockClient = axios.create({
  baseURL: WEAVE_MOCK_URL,
  headers: { 'Content-Type': 'application/json' },
})


// Request interceptor: attach token from Zustand store
const attachToken = (config: InternalAxiosRequestConfig) => {
  const token = useAuthStore.getState().token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}

apiClient.interceptors.request.use(attachToken)
canvasClient.interceptors.request.use(attachToken)

// Response interceptor: handle 401
const handleUnauthorized = (error: unknown) => {
  if (axios.isAxiosError(error) && error.response?.status === 401) {
    useAuthStore.getState().clearAuth()
    // this will change the route path with out refresh, so that toaster component will be visible whenever called
    window.history.pushState({}, "", "/");
  }
  return Promise.reject(error)
}

apiClient.interceptors.response.use((r) => r, handleUnauthorized)
canvasClient.interceptors.response.use((r) => r, handleUnauthorized)