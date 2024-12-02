import SignInButton from "@/components/SignInButton";
import { getAuthSession } from "@/lib/auth";

const Home = async () => {
  const session = await getAuthSession();
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-4xl font-bold">AI Course Generator</h1>
      <p className="text-lg text-gray-600">with OpenAI</p>

      {session ? (
        <>
          <h1 className="mt-8 mb-2 text-xl">
            Hello{" "}
            <span className="text-3xl font-bold">{session.user.name}!</span>
          </h1>
          <p>
            Click here{" "}
            <a
              href="/create"
              className="inline-block px-2 py-1 text-lg font-semibold text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              Create Course
            </a>{" "}
            to get started
          </p>
          <p>
            Or, you can watch the created courses by moving to the{" "}
            <a
              href="/gallery"
              className="inline-block px-2 py-1 text-lg font-semibold text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              Gallery
            </a>
          </p>
        </>
      ) : (
        <div className="mt-8 rounded-md bg-slate-700">
          <SignInButton />
        </div>
      )}
    </div>
  );
};

export default Home;
