import '../globals.css';
import Header from '../components/header';
import Footer from '../components/footer';

export const metadata = {
  title: 'Admin Dashboard',
  description: 'Admin panel for Eyob Wendmagegn Portfolio',
};

export default function AdminLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900 min-h-screen flex flex-col">
        {/* Fixed Header with higher z-index */}
        <Header title="Admin Dashboard" />
        {/* Fixed Navbar */}
        <nav className="bg-gray-800 text-white p-4 fixed top-16 left-0 w-full z-40 shadow-md">
          <ul className="flex space-x-4 container mx-auto">
            <li><a href="/admin/home" className="hover:underline">Home</a></li>
            <li><a href="/admin/about" className="hover:underline">About Me</a></li>
            <li><a href="/admin/projects" className="hover:underline">Projects</a></li>
            <li><a href="/admin/experience" className="hover:underline">Experience</a></li>
            <li><a href="/admin/contact" className="hover:underline">Contact Me</a></li>
            <li><a href="/admin/upload" className="hover:underline">Upload</a></li>
          </ul>
        </nav>
        {/* Main content with adjusted padding and margin */}
        <main className="p-6 pt-24 flex-1" style={{ marginTop: '128px' }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}