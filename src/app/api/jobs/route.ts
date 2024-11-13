// app/api/jobs/route.js
import connectToDatabase from "@/lib/mongoose";
import Job from "@/models/Jobs";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  await connectToDatabase();
  try {
    const jobs = await Job.find({});
    return new Response(JSON.stringify(jobs), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error?.message || "Failed to fetch jobs" }),
      {
        status: 500,
      }
    );
  }
}

export async function POST(req: Request) {
  await connectToDatabase();
  try {
    const data = await req.json();
    const job = new Job(data);
    const session = await getServerSession(authOptions);
    job.createdBy = session?.user?._id;
    await job.save();
    return new Response(JSON.stringify(job), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
    });
  }
}
