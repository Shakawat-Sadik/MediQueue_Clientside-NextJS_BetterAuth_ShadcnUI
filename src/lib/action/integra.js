async function getAuthHeaders() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return { "Content-Type": "application/json" };
  }

  // Day 3: Generate JWT instead of passing email
  const token = await new SignJWT({ email: session.user.email, name: session.user.name })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,  // ✅ Express verifyToken middleware reads this
  };
}