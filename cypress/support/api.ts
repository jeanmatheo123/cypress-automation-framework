interface ApiRequestOptions {
  method: "GET" | "POST" | "DELETE" | "PUT";
  url: string;
  body?: Record<string, string>;
  failOnStatusCode?: boolean;
}

/**
 * automationexercise.com's API always responds with a JSON *string*, but
 * mislabels it as `Content-Type: text/html` — so Cypress never auto-parses
 * it and `response.body` comes back as a raw string. This wraps cy.request
 * so every API spec gets a real object back regardless of that quirk, and
 * always posts as form-urlencoded, which is what this API actually expects
 * (a plain JSON body gets silently treated as "no parameters sent").
 */
export function apiRequest({ method, url, body, failOnStatusCode = true }: ApiRequestOptions) {
  return cy
    .request({
      method,
      url,
      form: true,
      body,
      failOnStatusCode,
    })
    .then((response) => {
      const parsedBody = typeof response.body === "string" ? JSON.parse(response.body) : response.body;
      return { ...response, body: parsedBody };
    });
}
