import { appRouter } from '@/server';
import { getFetchUrl } from '@/utils/helpers';
import { httpBatchLink } from '@trpc/client';

export const serverClient = appRouter.createCaller({
  links: [
    httpBatchLink({
      url: `${getFetchUrl('/api/trpc')}`,
    }),
  ],
});
