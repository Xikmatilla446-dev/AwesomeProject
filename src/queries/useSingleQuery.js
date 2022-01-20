import { useQuery } from "react-query";

import { requestApi, requestHelper } from "../utils/requestApi";
const KEY = '&client_id=wi1reg9DSyIP93cgaWj3YV3ifinz51z8rXQU1fdrKcE';

export function useSingQuery(query,{id}, options) {
  return useQuery(
    [`list-${id}`],
    () =>
      requestHelper
        .get(`/${id}?${KEY}`, { query })
        .then(({ data }) => data),
    options,
  );
}
