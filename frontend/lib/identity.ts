const STORAGE_KEY = "buildsafe_user_identity";

type Identity = {
  ownerType: "anonymous" | "user";
  ownerId: string;
};

function generateUUID(): string {
  return crypto.randomUUID();
}

export function getOrCreateAnonymousIdentity(): Identity {
  if (typeof window === "undefined") {
    return {
      ownerType: "anonymous",
      ownerId: "server"
    };
  }

  const stored = localStorage.getItem(STORAGE_KEY);

  if (stored) {
    return JSON.parse(stored);
  }

  const newIdentity: Identity = {
    ownerType: "anonymous",
    ownerId: generateUUID()
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(newIdentity));

  return newIdentity;
}

export function getIdentity(): Identity {
  if (typeof window === "undefined") {
    return {
      ownerType: "anonymous",
      ownerId: "server"
    };
  }

  const stored = localStorage.getItem(STORAGE_KEY);

  if (!stored) {
    return getOrCreateAnonymousIdentity();
  }

  return JSON.parse(stored);
}

export function setAuthenticatedIdentity(userId: string): void {
  const identity: Identity = {
    ownerType: "user",
    ownerId: userId
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(identity));
}

export function clearIdentity(): void {
  localStorage.removeItem(STORAGE_KEY);
}
