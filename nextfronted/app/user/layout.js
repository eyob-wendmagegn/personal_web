import '../globals.css';
import Header from '../components/header';
import Footer from '../components/footer';

export const metadata = {
  title: 'User Dashboard',
  description: 'Portfolio of Eyob Wendmagegn',
};

export default function UserLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900 min-h-screen flex flex-col">
        <Header title="Eyob Wendmagegn Portfolio" />
        <nav className="bg-gray-800 text-white p-4 fixed top-16 left-0 w-full z-40 shadow-md">
          <ul className="flex space-x-4 container mx-auto">
            <li><a href="/user/home" className="hover:underline">Home</a></li>
            <li><a href="/user/about" className="hover:underline">About Me</a></li>
            <li><a href="/user/projects" className="hover:underline">Projects</a></li>
            <li><a href="/user/experience" className="hover:underline">Experience</a></li>
            <li><a href="/user/contact" className="hover:underline">Contact Me</a></li>
          </ul>
        </nav>
        <main className="p-6 pt-24 flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}