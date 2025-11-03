import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.NEON_DATABASE_URL!);

export async function POST(req: Request) {
  try {
    const { name, email, clerkId } = await req.json();

    if (!name || !email || !clerkId) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Use parameterized query to prevent SQL injection & type issues
    const res = await sql.query(
      "INSERT INTO users (name, email, clerk_id) VALUES ($1, $2, $3) RETURNING *",
      [name, email, clerkId]
    );

    return new Response(JSON.stringify({ success: true, data: res }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify({ success: false, message: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
