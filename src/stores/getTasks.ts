import useSWR from 'swr';

import { apiClient } from '@/api-client';

export const useGetTasks = () => {
  return useSWR(
    '/tasks',
    (endpoint) => apiClient.apiGet(endpoint).then((result) => result.json()),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );
};