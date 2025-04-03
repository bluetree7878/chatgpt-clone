"use server";
import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

interface SessionPayload extends Record<string, unknown> {
  id: string;
  name: string;
}

export const encrypt = async (payload: SessionPayload) => {
  return new SignJWT(payload as Record<string, unknown>)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1d")
    .sign(encodedKey);
};

export const verify = async (session: string | undefined) => {
  try {
    if (!session) {
      throw new Error("세션이 정의되지 않았거나 잘못되었습니다.");
    }
    const { payload } = await jwtVerify<SessionPayload>(session, encodedKey, {
      algorithms: ["HS256"],
    });

    return payload;
  } catch (error) {
    console.error("세션 검증 오류:", error);
  }
};

export const createSession = async (payload: SessionPayload) => {
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24);
  const session = await encrypt(payload);

  (await cookies()).set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
};

export const deleteSession = async () => {
  (await cookies()).delete("session");
};

export const verifySession = async () => {
  const cookie = (await cookies()).get("session")?.value;
  const session = await verify(cookie);

  if (!session?.id) {
    redirect("/login");
  }

  return session;
};
