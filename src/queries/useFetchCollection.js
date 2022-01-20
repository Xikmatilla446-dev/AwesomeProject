import { useQuery } from "react-query";

import { requestApi } from "../utils/requestApi";

export function useListQuery(query, options) {
  return useQuery(
    ["list", query],
    () =>
      requestApi
        .get("", { query })
        .then(({ data }) => data),
    options,
  );
}
