import { Link } from 'react-router-dom';

const Intro = () => {
  return (
    <div className='-full py-12 md:py-24 lg:py-32 xl:py-48 flex items-center justify-center'>
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Reach Your Fitness Goals
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-x1">
              Streamline your exercise schedule with our user-oriented workout manager. Create workout routines, use community-curated workouts, or share your own!
            </p>
          </div>
          <div className="space-x-4">
            <Link
              className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-6 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
              to="/login"
            >
              Log In
            </Link>
            <Link
              className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-6 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
              to="/register"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
    
  );
}

export default Intro;
