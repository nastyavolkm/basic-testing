import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');

jest.mock('axios', () => {
  const originalModule = jest.requireActual<typeof import('axios')>('axios');
  return {
    ...originalModule,
    create: () => ({
      get: () => {
        return Promise.resolve({ data: 'hello' });
      },
    }),
  };
});

describe('throttledGetDataFromApi', () => {
  const relativePath = 'relativePath';
  const baseURL = { baseURL: 'https://jsonplaceholder.typicode.com' };

  beforeAll(() => {
    jest.useFakeTimers();
  });
  afterAll(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  test('should create instance with provided base url', async () => {
    const createSpy = jest.spyOn(axios, 'create');
    await throttledGetDataFromApi(relativePath);
    jest.runAllTimers();
    expect(createSpy).toHaveBeenCalledWith(baseURL);
  });

  test('should perform request to correct provided url', async () => {
    const getMock = jest.fn(() => {
      return Promise.resolve({ data: 'hello' });
    });
    jest.spyOn(axios, 'create').mockReturnValue({ get: getMock } as never);
    await throttledGetDataFromApi(relativePath);
    jest.runOnlyPendingTimers();
    expect(getMock).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const result = await throttledGetDataFromApi(relativePath);
    jest.runOnlyPendingTimers();
    expect(result).toBe('hello');
  });
});
