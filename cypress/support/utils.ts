export interface NewUser {
  name: string;
  email: string;
  password: string;
}

/**
 * automationexercise.com rejects sign-ups that reuse an email, so every
 * run needs a fresh one. Timestamp + a short random suffix keeps it unique
 * across parallel CI runs without needing a shared counter.
 */
export function generateUser(): NewUser {
  const unique = `${Date.now()}${Math.floor(Math.random() * 1000)}`;
  return {
    name: `QA Tester ${unique}`,
    email: `qa.tester.${unique}@example.com`,
    password: "P@ssword123!",
  };
}
