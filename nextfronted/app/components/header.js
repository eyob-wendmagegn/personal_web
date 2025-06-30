export default function Header({ title }) {
  return (
    <header className="bg-blue-600 text-white p-4 fixed top-0 left-0 w-full z-50 shadow-md" style={{ height: '64px' }}>
      <h1 className="text-2xl font-bold text-center">{title}</h1>
    </header>
  );
}