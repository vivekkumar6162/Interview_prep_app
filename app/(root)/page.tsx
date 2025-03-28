import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import InterviewCard from "@/components/InterviewCard";
import { getCurrentUser } from "@/lib/actions/auth.action";
import {
  getInterviewsByUserId,
  getLatestInterviews,
} from "@/lib/actions/general.action";

// Define TypeScript interfaces for type safety
interface User {
  id: string;
}

// Align Interview interface with API return type (createdAt as string)
interface Interview {
  id: string;
  role: string;
  type: string;
  techstack: string[];
  createdAt: string; // Changed from Date to string to match API
}

async function Home() {
  let user: User | null = null;
  let userInterviews: Interview[] | null = null; // Allow null
  let allInterviews: Interview[] | null = null; // Allow null

  try {
    user = await getCurrentUser();

    // Fetch interviews only if user exists
    if (user) {
      [userInterviews, allInterviews] = await Promise.all([
        getInterviewsByUserId(user.id), // Returns Interview[] | null
        getLatestInterviews({ userId: user.id }), // Returns Interview[] | null
      ]);
    }
  } catch (error) {
    console.error("Failed to load interviews:", error);
    return (
      <section className="card-cta">
        <h2>Something went wrong</h2>
        <p>Please try again later.</p>
      </section>
    );
  }

  // Explicitly handle null/undefined cases for length checks
  const hasPastInterviews = userInterviews !== null && userInterviews.length > 0;
  const hasUpcomingInterviews = allInterviews !== null && allInterviews.length > 0;

  return (
    <>
      <section className="card-cta">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2>Get Interview-Ready with AI-Powered Practice & Feedback</h2>
          <p className="text-lg">
            Practice real interview questions & get instant feedback
          </p>

          <Button asChild className="btn-primary max-sm:w-full">
            <Link href="/interview">Start an Interview</Link>
          </Button>
        </div>

        <Image
          src="/robot.png"
          alt="robo-dude"
          width={400}
          height={400}
          className="max-sm:hidden"
        />
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2>Your Interviews</h2>

        <div className="interviews-section">
          {hasPastInterviews ? (
            userInterviews!.map((interview) => (
              <InterviewCard
                key={interview.id}
                userId={user?.id ?? ""}
                interviewId={interview.id}
                role={interview.role}
                type={interview.type}
                techstack={interview.techstack}
                createdAt={interview.createdAt} // Already a string
              />
            ))
          ) : (
            <p>You haven't taken any interviews yet</p>
          )}
        </div>
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2>Take Interviews</h2>

        <div className="interviews-section">
          {hasUpcomingInterviews ? (
            allInterviews!.map((interview) => (
              <InterviewCard
                key={interview.id}
                userId={user?.id ?? ""}
                interviewId={interview.id}
                role={interview.role}
                type={interview.type}
                techstack={interview.techstack}
                createdAt={interview.createdAt} // Already a string
              />
            ))
          ) : (
            <p>There are no interviews available</p>
          )}
        </div>
      </section>
    </>
  );
}

export default Home;