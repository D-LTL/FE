import axios from 'axios';
import type { LoginPayload } from '../types/type';

// Mock 데이터
const mockLogin = (credentials: LoginPayload) => {
  console.log('[Mock] Login request:', credentials);

  if (credentials.id === 'ddorang' && credentials.password === '1234') {
    console.log('[Mock] Login successful');
    return {
      access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkZG9yYW5nIn0',
      token_type: 'Bearer'
    };
  }

  console.log('[Mock] Login failed');
  throw new Error('Invalid credentials');
};

// axios 인터셉터 설정
export const setupAxiosInterceptor = () => {
  axios.interceptors.request.use((config) => {
    console.log('[Mock] Intercepting request:', config.url);

    // 로그인 API 요청 가로채기
    if (config.url === '/api/auth/login' && config.method === 'post') {
      console.log('[Mock] Login API intercepted');

      // Promise를 반환하여 요청을 가로챔
      return Promise.reject({
        config,
        response: {
          data: mockLogin(config.data as LoginPayload),
          status: 200,
          statusText: 'OK',
          headers: {},
          config
        }
      });
    }

    return config;
  }, (error) => {
    return Promise.reject(error);
  });

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      // 인터셉터에서 가로챈 응답 처리
      if (error.response && error.config.url === '/api/auth/login') {
        console.log('[Mock] Returning mocked response');
        return Promise.resolve(error.response);
      }

      return Promise.reject(error);
    }
  );

  console.log('[Mock] Axios interceptor configured');
};
