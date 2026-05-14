import crypto from "node:crypto";

const SESSION_COOKIE = "admin_session";

function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD ?? "change-me-admin-password";
}

export function getSessionCookieName() {
  return SESSION_COOKIE;
}

export function createSessionToken(): string {
  const secret = process.env.ADMIN_SESSION_SECRET ?? "local-admin-session-secret";
  return crypto.createHmac("sha256", secret).update(getAdminPassword()).digest("hex");
}

export function verifyAdminPassword(input: string): boolean {
  const expected = Buffer.from(getAdminPassword());
  const received = Buffer.from(input ?? "");

  if (expected.length !== received.length) {
    return false;
  }

  return crypto.timingSafeEqual(expected, received);
}

export function verifySessionToken(token: string | undefined): boolean {
  if (!token) {
    return false;
  }

  const expected = Buffer.from(createSessionToken());
  const received = Buffer.from(token);

  if (expected.length !== received.length) {
    return false;
  }

  return crypto.timingSafeEqual(expected, received);
}
