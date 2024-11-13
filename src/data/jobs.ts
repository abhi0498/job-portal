import Jobs from "@/models/Jobs";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const getPostedJobs = async () => {
  const session = await getServerSession(authOptions);
  console.log(session?.user);
  const jobs = await Jobs.find({
    createdBy: session?.user?._id,
  });
  return jobs;
};
