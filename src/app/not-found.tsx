export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-gray-500">Page not found</p>
        <a href="/" className="mt-6 inline-block text-sm text-indigo-400 hover:underline">
          Go home
        </a>
      </div>
    </div>
  );
}
