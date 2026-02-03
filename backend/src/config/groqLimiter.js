import Bottleneck from "bottleneck";

/*
  - max 1 request at a time
  - minimum 1200 ms gap between calls
    (At most ~50 requests per minute)
*/
export const groqLimiter = new Bottleneck({
    maxConcurrent: 1,
    minTime: 1200
});
