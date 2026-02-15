const STORAGE_KEY = "buildsafe_user_identity";
const TOKEN_KEY = "buildsafe_auth_token";

export type Identity = {
  ownerType: "anonymous" | "user";
  ownerId: string;
};

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function generateUUID(): string {
  if (!isBrowser()) return "server";
  return crypto.randomUUID();
}

export function getOrCreateAnonymousIdentity(): Identity {
  if (!isBrowser()) {
    return {
      ownerType: "anonymous",
      ownerId: "server",
    };
  }

  const stored = localStorage.getItem(STORAGE_KEY);

  if (stored) {
    return JSON.parse(stored);
  }

  const newIdentity: Identity = {
    ownerType: "anonymous",
    ownerId: generateUUID(),
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(newIdentity));

  return newIdentity;
}

export function getIdentity(): Identity {
  if (!isBrowser()) {
    return {
      ownerType: "anonymous",
      ownerId: "server",
    };
  }

  const stored = localStorage.getItem(STORAGE_KEY);

  if (!stored) {
    return getOrCreateAnonymousIdentity();
  }

  return JSON.parse(stored);
}

export function setAuthenticatedIdentity(
  userId: string,
  token: string
): void {
  if (!isBrowser()) return;

  const identity: Identity = {
    ownerType: "user",
    ownerId: userId,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(identity));
  localStorage.setItem(TOKEN_KEY, token);
}

export function getToken(): string | null {
  if (!isBrowser()) return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function isAuthenticated(): boolean {
  if (!isBrowser()) return false;

  const identity = getIdentity();
  const token = getToken();

  return identity.ownerType === "user" && !!token;
}

export function clearIdentity(): void {
  if (!isBrowser()) return;

  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(TOKEN_KEY);
}

export function resetToAnonymous(): Identity {
  clearIdentity();
  return getOrCreateAnonymousIdentity();
}
